/**
 * utils.js
 *
 * This flow names from the .flopack or workflow.json are
 * handled consistently with the changes in image_hasher.js.
 *
 * - Adding a matching "standardizeName" helper to ensure how we look up
 *   flow names in imageMap.
 */

const fs = require("fs");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const modifierScriptMsg = `You can run the "details_modifier" script to fill in valid data for ALL the workflow json files in the repo.`;
const validFloField = ["id", "name", "type"];

// Base URL for screenshots
const imageString =
  "https://d78vv2h34ll3s.cloudfront.net/static/catalog/workflows/";


// Helper for standardizing flow names
// so they match how image_hasher sets them

function standardizeName(nameStr) {
  return nameStr
    .replace(/\s*-\s*Okta$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getDetailsFromFlopack(flopackContent) {
  const { flos, tables } = flopackContent.data || {};
  const details = {};

  if (flos && Object.keys(flos).length) {
    details.flos = [];
    details.flowCount = Object.keys(flos).length;
    Object.values(flos).forEach((flo) => {
      const isHelperFlow =
        flo.data?.display?.isCallable && !flo.data?.scheduled;
      details.flos.push({
        id: flo.id,
        name: flo.name,
        type: isHelperFlow ? "HELPER" : "MAIN",
      });
      if (isHelperFlow) {
        details.helperFlowsCount
          ? details.helperFlowsCount++
          : (details.helperFlowsCount = 1);
      } else {
        details.mainFlowsCount
          ? details.mainFlowsCount++
          : (details.mainFlowsCount = 1);
      }
    });
  }

  if (tables && Object.keys(tables).length) {
    details.stashCount = Object.keys(tables).length;
  }

  return details;
}


// This function updates screenshot URLs in a workflow JSON
// based on a map of {flowName -> hashed filename}.
function populateScreenshotUrl(imageMap) {
 

  let detailsImage = {};
  const workflowsDir = path.join(process.cwd(), "workflows");
  let templateName = argv.template;

  let workflowsnew = [];
  if (templateName) {
    workflowsnew.push(templateName);
  } else {
    workflowsnew = fs.readdirSync(workflowsDir);
  }

  // We loop over each workflow, parse its workflow.json,
  // then fill in screenshotURL for each flow that matches
  // an entry in imageMap.
  workflowsnew.forEach((workflowName) => {
    const workflowPath = path.join(workflowsDir, workflowName);
    if (!fs.lstatSync(workflowPath).isDirectory()) return;

    const jsonPath = path.join(workflowPath, "workflow.json");
    let jsonContent;
    try {
      jsonContent = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    } catch (err) {
      console.error(`Could not read/parse ${jsonPath}`, err);
      return;
    }

    detailsImage = jsonContent.details || {};
    if (!detailsImage.flos || !Array.isArray(detailsImage.flos)) {
      throw new Error(
        `The "details.flos" field at ${workflowName}/workflow.json can't be an empty array. ${modifierScriptMsg}`
      );
    }


    // The partial path to resources for building the final screenshot URL
    let urlParam = `${workflowName}/resources/`;

    // For each flow, standardize the name and see if it exists in imageMap
    detailsImage.flos.forEach((flo) => {
      // Standardize the name the same way we do in image_hasher.js
      const standardized = standardizeName(flo.name);

      if (imageMap.has(standardized)) {
        // Build up the final screenshot URL from the hashed filename
        const hashedFile = imageMap.get(standardized);
        const finalUrl = `${imageString}${urlParam}${hashedFile}.png`;
        console.log("imageUrl:", finalUrl);

        flo.screenshotURL = finalUrl;
      }
    });

  });

  return detailsImage;
}


function validateCounts(workflowName, generatedDetails, detailsInJSON) {
  const countFields = [
    "flowCount",
    "mainFlowsCount",
    "helperFlowsCount",
    "stashCount",
  ];
  countFields.forEach((field) => {
    if (detailsInJSON[field] === 0) {
      throw new Error(
        `The "${field}" field at "${workflowName}/workflow.json" can't be zero. ${modifierScriptMsg}`
      );
    }

    if (generatedDetails[field] > 0 && !detailsInJSON[field]) {
      throw new Error(
        `The "details" field at "${workflowName}/workflow.json" is missing the "${field}" field. ${modifierScriptMsg}`
      );
    }

    if (field in detailsInJSON && !(field in generatedDetails)) {
      throw new Error(
        `The "${field}" at "${workflowName}/workflow.json}" should not exist, it doesn't match the ".flopack". ${modifierScriptMsg}`
      );
    }

    if (generatedDetails[field] !== detailsInJSON[field]) {
      throw new Error(
        `The "details.${field}" at ${workflowName}/workflow.json is incorrect. ${modifierScriptMsg}`
      );
    }
  });
}

function validateFlos(workflowName, generatedDetails, detailsInJSON) {
  const flopackFlows = generatedDetails.flos;
  const jsonFlows = detailsInJSON.flos;

  if ((!flopackFlows || flopackFlows.length === 0) && !jsonFlows) {
    return;
  }

  if (flopackFlows) {
    if (!Array.isArray(jsonFlows)) {
      throw new Error(
        `A "details.flos" field (array) is missing at "${workflowName}/workflow.json". ${modifierScriptMsg}`
      );
    }

    if (jsonFlows.length === 0) {
      throw new Error(
        `The "details.flos" field at ${workflowName}/workflow.json can't be empty if .flopack has flows. ${modifierScriptMsg}`
      );
    }

    if (JSON.stringify(flopackFlows) !== JSON.stringify(jsonFlows)) {
      throw new Error(
        `Flow mismatch at "${workflowName}/workflow.json -> details.flos" vs. .flopack file. ${modifierScriptMsg}`
      );
    }

    jsonFlows.forEach((flo) => {
      if (!validFloField.every((field) => field in flo)) {
        throw new Error(
          `Flow in "${workflowName}/workflow.json -> details.flos" has invalid properties. ${modifierScriptMsg}`
        );
      }
    });
  }
}

async function validateScreenshots(generatedDetails, jsonContent) {
  // Potentially update to async if needed
}

function validateUseCases(workflowName, floUseCases) {
  // ...
}

module.exports = {
  getDetailsFromFlopack,
  validateCounts,
  validateFlos,
  validateScreenshots,
  validateUseCases,
  populateScreenshotUrl,
};