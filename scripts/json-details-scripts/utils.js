const fs = require("fs");

module.exports.modifierScriptMsg = `You can run the "details_modifier" script to fill in valid data for ALL the workflow json files in the repo.`;

module.exports.getDetailsFromFlopack = function (flopackContent) {
  const { flos, tables } = flopackContent.data;
  const details = {};

  if (flos && Object.keys(flos).length) {
    details.flows = [];
    details.flowCount = Object.keys(flos).length;
    Object.values(flos).forEach((flo) => {
      const isHelperFlow = flo.data.display.isCallable && !flo.data.scheduled;
      details.flows.push({
        id: flo.id,
        name: flo.name,
        type: isHelperFlow ? "HELPER" : "MAIN",
        screenshotURL: "https://via.placeholder.com/1000x500" // TODO: replace with the actual S3 URL
      });
      if (isHelperFlow) {
        details.helperFlowsCount ? details.helperFlowsCount++ : (details.helperFlowsCount = 1);
      } else {
        details.mainFlowsCount ? details.mainFlowsCount++ : (details.mainFlowsCount = 1);
      }
    });
  }

  if (tables && Object.keys(tables).length) {
    details.stashCount = Object.keys(tables).length;
  }

  return details;
};

module.exports.validateCounts = function (workflowName, detailsFromFlopack, detailsInJSON) {
  const countFields = ["flowCount", "mainFlowsCount", "helperFlowsCount", "stashCount"];
  countFields.forEach((field) => {
    if (detailsInJSON[field] === 0) {
      throw new Error(
        `The "${field}" field at "${workflowName}/workflow.json" can't be a zero. Zero-value fields should be deleted. ${module.exports.modifierScriptMsg}`
      );
    }

    if (detailsFromFlopack[field] > 0 && !detailsInJSON[field]) {
      throw new Error(
        `The "details" field at "${workflowName}/workflow.json" is missing the "${field}" field. ${module.exports.modifierScriptMsg}`
      );
    }

    if (field in detailsInJSON && !(field in detailsFromFlopack)) {
      throw new Error(
        `The "${field}" at "${workflowName}/workflow.json}" should not exist, it's not matching what's in the ".flopack" file. ${module.exports.modifierScriptMsg}`
      );
    }

    if (detailsFromFlopack[field] !== detailsInJSON[field]) {
      throw new Error(
        `The "details.${field}" field at ${workflowName}/workflow.json is incorrect. ${module.exports.modifierScriptMsg}`
      );
    }
  });
};

module.exports.validateFlows = function (workflowName, detailsFromFlopack, detailsInJSON) {
  if (!detailsFromFlopack.flows && !detailsInJSON.flows) return;

  if (detailsFromFlopack.flows) {
    if (!Array.isArray(detailsInJSON.flows)) {
      throw new Error(
        `A "details.flows" field (of type array) should exist at "${workflowName}/workflow.json". ${module.exports.modifierScriptMsg}`
      );
    }

    if (detailsInJSON.flows.length === 0) {
      throw new Error(
        `The "details.flows" field at ${workflowName}/workflow.json can't be an empty array. ${module.exports.modifierScriptMsg}`
      );
    }

    if (JSON.stringify(detailsFromFlopack.flows) !== JSON.stringify(detailsInJSON.flows)) {
      throw new Error(
        `The flows defined at the "${workflowName}/workflow.json -> details.flows" field don't match what's inside the ".flopack" file of that template. ${module.exports.modifierScriptMsg}`
      );
    }
  }
};

module.exports.validateUseCases = function (floUseCases, workflowName) {
  if (!floUseCases) return;

  const useCases = JSON.parse(
    fs.readFileSync(`${process.cwd()}/useCases.json`).toString()
  ).useCases.map((s) => s.name);

  if (!Array.isArray(floUseCases)) {
    throw new Error(
      `The useCases field in "${workflowName}/workflow.json" has the wrong type. It should be an array of strings.`
    );
  }

  if (!floUseCases.every((s) => useCases.includes(s))) {
    throw new Error(
      `The use cases assigned to "${workflowName}/workflow.json" are not valid. Make sure the use cases are mentioned in the "useCases.json" file.`
    );
  }
};
