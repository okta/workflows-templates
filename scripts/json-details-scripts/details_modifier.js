/**
 * details-modifier.js
 *
 Flow focusses on: 
 *   1) Reading "workflow.flopack" files.
 *   2) Extracting details with getDetailsFromFlopack.
 *   3) Merging those details into "workflow.json".
 *

 * Key note:
 *   - The writeToJSONFileWithImages() function is used by image_hasher.js AFTER all images
 *     have been hashed to do a final single JSON update. So concurrency issues are avoided.
 */

const fs = require("fs").promises; // Using the Promise-based version of fs for async/await
const path = require("path");
const { getDetailsFromFlopack } = require("./utils");
const { merge } = require("lodash");

const workflowsDir = path.join(process.cwd(), "workflows");

/**
 * Main function that:
 *  - Reads all workflow directories
 *  - For each directory, tries to parse the ".flopack" file
 *  - Merges extracted details into the matching "workflow.json" file
 */
async function main() {
  let workflowNames;
  try {
    workflowNames = await fs.readdir(workflowsDir);
  } catch (err) {
    console.error("Could not read workflows directory:", err);
    process.exit(1);
  }

  //Using for-of as operator provides access to the values of those keys
  for (const workflowName of workflowNames) {
    const workflowPath = path.join(workflowsDir, workflowName);

    // Check if directory
    try {
      const stats = await fs.lstat(workflowPath);
      if (!stats.isDirectory()) continue;
    } catch (err) {
      console.warn(
        `Error in reading '${workflowName}' directory stats:`,
        err
      );
      continue;
    }

    // Attempt to read ".flopack"
    const flopackPath = path.join(workflowPath, "workflow.flopack");
    let flopackData;
    try {
      flopackData = await fs.readFile(flopackPath, "utf8");
    } catch (err) {
      console.warn(
        `Error in reading '${workflowName}', could not read "${flopackPath}":`,
        err
      );
      continue;
    }

    // Parse flopackContent
    let flopackContent;
    try {
      flopackContent = JSON.parse(flopackData);
    } catch (err) {
      console.warn(
        `Error in reading '${workflowName}', invalid JSON in "${flopackPath}":`,
        err
      );
      continue;
    }

    let generatedDetails;
    try {
      generatedDetails = getDetailsFromFlopack(flopackContent);
    } catch (err) {
      console.warn(
        `Error in reading '${workflowName}', error extracting flopack details:`,
        err
      );
      continue;
    }

    // Merge into "workflow.json"
    try {
      await writeToJSONFile(workflowName, generatedDetails);
    } catch (err) {
      console.warn(
        `Could not update "workflow.json" in '${workflowName}':`,
        err
      );
    }
  }
}

/**
 * Writes merged details to "workflow.json" for a given workflow.
 *
 * workflowName - The name of the workflow directory
 * generatedDetails - The details extracted from .flopack
 */
async function writeToJSONFile(workflowName, generatedDetails) {
  const jsonFilePath = path.join(workflowsDir, workflowName, "workflow.json");

  let fileData;
  try {
    fileData = await fs.readFile(jsonFilePath, "utf8");
  } catch (err) {
    throw new Error(`Failed reading "${jsonFilePath}": ${err.message}`);
  }

  let jsonContent;
  try {
    jsonContent = JSON.parse(fileData);
  } catch (err) {
    throw new Error(`Invalid JSON in "${jsonFilePath}": ${err.message}`);
  }

  if (!jsonContent.details) {
    jsonContent.details = {};
  }
  jsonContent.details = merge(jsonContent.details, generatedDetails);

  try {
    const finalJson = JSON.stringify(jsonContent, null, 2) + "\n";
    await fs.writeFile(jsonFilePath, finalJson, "utf8");
  } catch (err) {
    throw new Error(`Failed writing "${jsonFilePath}": ${err.message}`);
  }
}

/**
 This function for copying image hashed files to workflow.json
 */
async function writeToJSONFileWithImages(workflowName, generatedDetails) {
  const jsonFilePath = path.join(workflowsDir, workflowName, "workflow.json");

  let fileData;
  try {
    fileData = await fs.readFile(jsonFilePath, "utf8");
  } catch (err) {
    console.error(`Could not read "${jsonFilePath}":`, err);
    return;
  }

  try {
    const jsonContent = JSON.parse(fileData);
    if (!jsonContent.details) {
      jsonContent.details = {};
    }

    jsonContent.details = merge(jsonContent.details, generatedDetails);

    console.log("Entered here (single final merge for images).");

    const finalJson = JSON.stringify(jsonContent, null, 2) + "\n";
    await fs.writeFile(jsonFilePath, finalJson, "utf8");

    console.log("Entered here again (done writing images).");
  } catch (err) {
    console.error("Error parsing or writing updated JSON:", err);
  }
}


if (require.main === module) {
  main().catch((err) => {
    console.error("An unexpected error occurred in main():", err);
    process.exit(1);
  });
}

module.exports = {
  writeToJSONFileWithImages,
};