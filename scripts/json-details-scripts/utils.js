const fs = require("fs");

const modifierScriptMsg = `You can run the "details_modifier" script to fill in valid data for ALL the workflow json files in the repo.`;
const validFloField = ["id", "name", "type"];

function getDetailsFromFlopack(flopackContent) {
  const { flos, tables } = flopackContent.data;
  const details = {};

  if (flos && Object.keys(flos).length) {
    details.flos = [];
    details.flowCount = Object.keys(flos).length;
    Object.values(flos).forEach((flo) => {
      const isHelperFlow = flo.data.display.isCallable && !flo.data.scheduled;
      details.flos.push({
        id: flo.id,
        name: flo.name,
        type: isHelperFlow ? "HELPER" : "MAIN"
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

function validateCounts(workflowName, generatedDetails, detailsInJSON) {
  const countFields = ["flowCount", "mainFlowsCount", "helperFlowsCount", "stashCount"];
  countFields.forEach((field) => {
    if (detailsInJSON[field] === 0) {
      throw new Error(
        `The "${field}" field at "${workflowName}/workflow.json" can't be a zero. Zero-value fields should be deleted. ${modifierScriptMsg}`
      );
    }

    if (generatedDetails[field] > 0 && !detailsInJSON[field]) {
      throw new Error(
        `The "details" field at "${workflowName}/workflow.json" is missing the "${field}" field. ${modifierScriptMsg}`
      );
    }

    if (field in detailsInJSON && !(field in generatedDetails)) {
      throw new Error(
        `The "${field}" at "${workflowName}/workflow.json}" should not exist, it's not matching what's in the ".flopack" file. ${modifierScriptMsg}`
      );
    }

    if (generatedDetails[field] !== detailsInJSON[field]) {
      throw new Error(
        `The "details.${field}" field at ${workflowName}/workflow.json is incorrect. ${modifierScriptMsg}`
      );
    }
  });
};

function validateFlos(workflowName, generatedDetails, detailsInJSON) {
  if ((!generatedDetails.flos || generatedDetails.flos.length === 0) && !detailsInJSON.flos) {
    return;
  }

  if (generatedDetails.flos) {
    if (!Array.isArray(detailsInJSON.flos)) {
      throw new Error(
        `A "details.flos" field (of type array) should exist at "${workflowName}/workflow.json". ${modifierScriptMsg}`
      );
    }

    if (detailsInJSON.flos.length === 0) {
      throw new Error(
        `The "details.flos" field at ${workflowName}/workflow.json can't be an empty array. ${modifierScriptMsg}`
      );
    }

    if (JSON.stringify(generatedDetails.flos) !== JSON.stringify(detailsInJSON.flos)) {
      throw new Error(
        `The flos defined at the "${workflowName}/workflow.json -> details.flos" field don't match what's inside the ".flopack" file of that template. ${modifierScriptMsg}`
      );
    }

    detailsInJSON.flos.forEach((flo) => {
      if (!validFloField.every((field) => field in flo)) {
        throw new Error(
          `The flos defined at the "${workflowName}/workflow.json -> details.flos" field contains invalid properties. Allowed fields are: "${validFloField.join(
            ", "
          )}". ${modifierScriptMsg}`
        );
      }
    });
  }
};

function validateScreenshots(generatedDetails, jsonContent) {
  const flosFromFlopack = generatedDetails.flos;
  const flosInJSON = jsonContent.details.flos;
  const workflowName = jsonContent.name;

  if (generatedDetails.flos.length === 0) return;

  try {
    const screenshots = fs.readdirSync(`${process.cwd()}/workflows/${workflowName}/resources`);

    if (screenshots.length !== flosFromFlopack.length) {
      throw new Error(`The "${workflowName}/resources" directory should contain a screenshot for every flow in this template. Currently it has ${screenshots.length} screenshots, but there should be ${flosFromFlopack.length} screenshots.`);
    }

    if (screenshots.length !== flosInJSON.length) {
      throw new Error(`${screenshots.length} screenshots exists for the "${workflowName}" workflow, but ${flosInJSON.length} are documented in the "${workflowName}/workflow.json" file. They should match.`);
    }

    flosInJSON.forEach(flo => {
      if (!flo.screenshotURL.includes(`https://d78vv2h34ll3s.cloudfront.net/static/catalog/workflows/${workflowName}/resources/`)) {
        throw new Error(`"${workflowName}/workflow.json": The screenshotURL for the "${flo.name}" flow is not valid. It should follow the pattern "https://d78vv2h34ll3s.cloudfront.net/static/catalog/workflows/${workflowName}/resources/{IMAGE_HASH}.png". Check the README of the repo for more info.`);
      }
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      // resources directory not found
      throw new Error(
        `The "${workflowName}" workflow directory should have a "resources" directory that contains screenshots for every flow in the template. Check the README of the repo for more info.`
      );
    } else {
      throw new Error(error);
    }
  }
};

function validateUseCases(workflowName, floUseCases) {
  if (!floUseCases) return;

  if (!Array.isArray(floUseCases)) {
    throw new Error(
      `The useCases field in "${workflowName}/workflow.json" has the wrong type. It should be an array of strings.`
    );
  }

  if (floUseCases.length === 0) {
    throw new Error(
      `The useCases field in "${workflowName}/workflow.json" can't be an empty array. It should be an array of strings. If not needed, you can delete it`
    );
  }

  if (!floUseCases.every((s) => typeof s === "string")) {
    throw new Error(
      `The useCases field in "${workflowName}/workflow.json" contains wrong value for its elements. "useCases" should be an array of strings. Valid use cases exist in the "useCases.json" root file.`
    );
  }

  const useCases = JSON.parse(
    fs.readFileSync(`${process.cwd()}/useCases.json`).toString()
  ).useCases.map((s) => s.name);

  if (!floUseCases.every((s) => useCases.includes(s))) {
    throw new Error(
      `The use cases assigned to "${workflowName}/workflow.json" are not valid. Make sure the use cases are mentioned in the "useCases.json" file.`
    );
  }
};

module.exports = {
  getDetailsFromFlopack,
  validateCounts,
  validateFlos,
  validateScreenshots,
  validateUseCases
};
