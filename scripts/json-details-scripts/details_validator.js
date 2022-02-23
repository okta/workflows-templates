const fs = require("fs");
const { getDetailsFromFlopack } = require("./shared");

const modifierScriptMsg = `You can run the "details_modifier" script to fill in valid data for ALL the workflow json files in the repo.`;

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  if (workflowName === ".DS_Store") return;

  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackContent = JSON.parse(data.toString());
    const jsonContent = JSON.parse(
      fs.readFileSync(`${workflowsDir}/${workflowName}/workflow.json`).toString()
    );
    const detailsInJSON = jsonContent.details;
    const detailsFromFlopack = getDetailsFromFlopack(flopackContent);

    validateCounts(workflowName, detailsFromFlopack, detailsInJSON);
    validateFlows(workflowName, detailsFromFlopack, detailsInJSON);
    validateUseCases(jsonContent.details.useCases, workflowName);
  });
});

function validateCounts(workflowName, detailsFromFlopack, detailsInJSON) {
  const countFields = ["flowCount", "mainFlowsCount", "helperFlowsCount", "stashCount"];
  countFields.forEach((field) => {
    if (detailsInJSON[field] === 0) {
      throw new Error(
        `The "${field}" field at "${workflowName}/workflow.json" can't be a zero. Zero-value fields should be deleted. ${modifierScriptMsg}`
      );
    }

    if (detailsFromFlopack[field] > 0 && !detailsInJSON[field]) {
      throw new Error(
        `The "details" field at "${workflowName}/workflow.json" is missing the "${field}" field. ${modifierScriptMsg}`
      );
    }

    if (detailsFromFlopack[field] !== detailsInJSON[field]) {
      console.log(workflowName, detailsFromFlopack[field], detailsInJSON[field]);
      throw new Error(
        `The "details.${field}" field at ${workflowName}/workflow.json is incorrect. ${modifierScriptMsg}`
      );
    }
  });
}

function validateFlows(workflowName, detailsFromFlopack, detailsInJSON) {
  if (!detailsFromFlopack.flows && !detailsInJSON.flows) return;

  if (detailsFromFlopack.flows) {
    if (!Array.isArray(detailsInJSON.flows)) {
      throw new Error(
        `A "details.flows" field (of type array) should exist at "${workflowName}/workflow.json". ${modifierScriptMsg}`
      );
    }

    if (detailsInJSON.flows.length === 0) {
      throw new Error(
        `The "details.flows" field at ${workflowName}/workflow.json can't be an empty array. ${modifierScriptMsg}`
      );
    }

    if (JSON.stringify(detailsFromFlopack.flows) !== JSON.stringify(detailsInJSON.flows)) {
      throw new Error(
        `The flows defined at the "${workflowName}/workflow.json -> details.flows" field don't match what's inside the ".flopack" file of that template. ${modifierScriptMsg}`
      );
    }
  }
}

function validateUseCases(floUseCases, workflowName) {
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
}
