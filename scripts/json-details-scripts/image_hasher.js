#!/usr/bin/env node
/**
 * image_hasher.js
 *
 * This script:
 *   1) Reads the "resources" directory in a specified workflow (or all workflows).
 *   2) Skips any file that is not a recognized image type (prevents "Mime type not found" errors).
 *   3) Hashes image files (e.g., .png, .jpg), copies them under a new hashed filename,
 *      and optionally deletes the source file.
 *   4) Collects hashed names in memory (imageMap) for each workflow, then does a single JSON update
 *      using populateScreenshotUrl() and writeToJSONFileWithImages() at the end. This avoids partial/truncated writes and "Unexpected end of JSON input" errors.
 *
 * Usage:
 *   node scripts/json-details-scripts/image_hasher.js --template <workflowName>
 */

const fs = require("fs");
const path = require("path");
const { imageHash } = require("image-hash");
const { exit } = require("process");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// Importing functions for screenshot updating
const { populateScreenshotUrl } = require("./utils");
const { writeToJSONFileWithImages } = require("./details_modifier");

const argv = yargs(hideBin(process.argv)).argv;

// Utility to strip trailing " - Okta" and normalize spaces
function standardizeName(nameStr) {
  return nameStr
    .replace(/\s*-\s*Okta$/i, "") // remove trailing " - Okta", ignoring case
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();
}

/**
 * Filters out non-image files by extension.
 * Add or remove extensions as needed.
 */
const validExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".webp",
  ".tiff",
];

//  MAIN WORKER FUNCTIONS 

/**
 * Hash a single image, copy it to hashed filename, optionally delete the original.
 * Returns a Promise that resolves to { flowName, hashedFilename } if successful.
 */
function hashImageFile(
  source,
  dest,
  overwrite = true,
  ignoreErrors = false,
  deleteOnCreate = false
) {
  return new Promise((resolve, reject) => {
    // 1) Check file size to warn about large images
    let fileSizeMB = 0;
    try {
      const stat = fs.statSync(source);
      fileSizeMB = stat.size / (1024 * 1024);
      if (fileSizeMB > 1) {
        console.warn(
          `[Large Image Warning] "${source}" is ~${fileSizeMB.toFixed(
            2
          )}MB. The "image-hash" library may fail or be slow on large files.`
        );
      }
    } catch (statErr) {
      console.warn(`Unable to get size for "${source}".`, statErr);
    }

    // 2) Hashing operation
    imageHash(source, 12, true, (error, hashValue) => {
      if (error) {
        console.error(`Error hashing "${source}":`, error.message || error);
        if (fileSizeMB > 1) {
          console.error(
            `Note: "${source}" was over 1MB. This may be the cause of the failure.`
          );
        }
        if (ignoreErrors) {
          console.warn(`Ignoring error and continuing for "${source}".`);
          // the calling function can skip this image
          return resolve(null);
        }
        return reject(error);
      }

      const hashedFilename = `${hashValue}${path.extname(source)}`;
      const destination = path.join(dest, hashedFilename);

      // 3) Copy the file
      const copyMode = overwrite ? 0 : fs.constants.COPYFILE_EXCL;
      fs.copyFile(source, destination, copyMode, (copyErr) => {
       
        if (copyErr) {
          if (ignoreErrors) {
            console.warn(
              `File copy error for "${source}" -> "${destination}":`,
              copyErr
            );
            // Return null, skip
            return resolve(null);
          } else {
            console.error(
              `File copy error for "${source}" -> "${destination}":`,
              copyErr
            );
            return reject(copyErr);
          }

          
        }

        console.log(`Created ${destination} from ${source}`);
        // 4) delete the original file
        if (deleteOnCreate && destination !== source) {
          fs.unlink(source, (delErr) => {
            if (delErr) {
              console.warn(
                `Error deleting source file "${source}". You may need to remove it manually.`,
                delErr
              );
            } else {
              console.log(`Deleted source file "${source}"`);
            }
          });
        }
      });

      // 5) Derive flow name from the original file name
      let floName = path.parse(source).name;
      floName = standardizeName(floName);
      console.log(`Hashed flow name: "${floName}" => "${hashedFilename}"`);

      resolve({
        flowName: floName,
        hashedFilename: path.parse(destination).name,
      });
    });
  });
}

/**
 * Deletes images in 'resources' that no longer match updated flow details.
 * This means there's a screenshot file that isn't referenced in the updated flows.
 */
function deleteChangedScreenshots(imageMap, generatedDetails, workflowName) {
  console.log(`Checking for outdated screenshots in "${workflowName}"...`);
  const workflowsDir = path.join(process.cwd(), "workflows");
  const resFolder = path.join(workflowsDir, workflowName, "resources");

  // We'll track valid hashed filenames in updatedImageMap
  const updatedImageMap = new Map();
  for (const flo of generatedDetails.flos || []) {
    if (flo.screenshotURL) {
      // e.g. ".../resources/<hashedName>.png"
      const hashedBase = path.parse(flo.screenshotURL).name;
      updatedImageMap.set(hashedBase, hashedBase);
    }
  }

  // If a file in imageMap isn't in updatedImageMap, it is outdated
  for (const [flowName, hashedFile] of imageMap.entries()) {
    if (!updatedImageMap.has(hashedFile)) {
      console.log("Outdated screenshot:", hashedFile);
      const toRemove = path.join(resFolder, `${hashedFile}.png`);
      try {
        fs.unlinkSync(toRemove);
        console.log(`Removed outdated file "${toRemove}"`);
      } catch (err) {
        console.warn(
          `Could not remove "${toRemove}". Might need manual cleanup.`,
          err
        );
      }
    }
  }
}




(async function main() {

  const workflowsDir = path.join(process.cwd(), "workflows");

  const templateName = argv.template;
  const overwrite = argv.overwrite ?? true;
  const ignoreErrors = argv["ignore-errors"] ?? false;
  const deleteOnCreate = argv.delete ?? true;

  // Collect relevant workflows
  let workflows = [];
  if (templateName) {
    workflows.push(templateName);
  } else {
    try {
      workflows = fs.readdirSync(workflowsDir);
    } catch (err) {
      console.error("Failed to read workflows directory:", err);
      process.exit(1);
    }
  }

  for (const workflowName of workflows) {
    const workflowPath = path.join(workflowsDir, workflowName);

    // Check if directory
    let stats;
    try {
      stats = fs.lstatSync(workflowPath);
      if (!stats.isDirectory()) {
        continue;
      }
    } catch (err) {
      console.warn(`Skipping "${workflowName}" due to lstat error:`, err);
      continue;
    }

    // Attempt to read the resources folder
    const resourcesPath = path.join(workflowPath, "resources");
    let imageFiles = [];
    try {
      imageFiles = fs.readdirSync(resourcesPath);
    } catch (err) {
      console.warn(
        `Workflow "${workflowName}" missing or unreadable "resources" directory. Skipping.`,
        err
      );
      continue;
    }

    // We'll store all { flowName, hashedFilename } pairs in a local map
    const localImageMap = new Map();

    // 1) Hash each image, gather results
    for (const image of imageFiles) {
      const ext = path.extname(image).toLowerCase();
      if (!validExtensions.includes(ext)) {
        console.warn(`Skipping non-image file: ${image}`);
        continue;
      }

      const source = path.join(resourcesPath, image);
      try {
        const result = await hashImageFile(
          source,
          resourcesPath,
          overwrite,
          ignoreErrors,
          deleteOnCreate
        );
        // result = { flowName, hashedFilename } or null
        if (result) {
          localImageMap.set(result.flowName, result.hashedFilename);
        }
      } catch (err) {
        // If we don't ignore errors, this might be a genuine throw
        console.error(
          `Failed to process "${image}" in "${workflowName}":`,
          err
        );
      }
    }

    // 2) Now that all images are hashed, do a single call to update the JSON
    if (localImageMap.size > 0) {
      // Build final screenshot URLs
      const generatedDetails =
        populateScreenshotUrl(localImageMap);

      // Now we do a single JSON write
      try {
        await writeToJSONFileWithImages(
          workflowName,
          generatedDetails
        );
      } catch (err) {
        console.warn(
          `Failed to update workflow.json for "${workflowName}":`,
          err
        );
        // continue but don't delete steps because the update wasn't fully successful
        continue;
      }

      // 3) Clean out outdated screenshots
      if (localImageMap.size > (generatedDetails.flos?.length || 0)) {
        deleteChangedScreenshots(localImageMap, generatedDetails, workflowName);
      }
    }
  }
})();