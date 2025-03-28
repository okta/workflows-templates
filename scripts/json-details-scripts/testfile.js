/* Run in this order:  testfile.js ----> testImageUpdate.js ----> deleteDirec.js 
Please refer to readme.md under scripts folder to understand function of each file.
*/


const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const assert = require("assert");
const { writeToJSONFile } = require("./details_modifier");
const sharp = require("sharp"); //

const testWorkflowDir = path.join(process.cwd(), "workflows");
const testWorkflowName = "test_workflow";
const testWorkflowPath = path.join(testWorkflowDir, testWorkflowName);
const resourcesPath = path.join(testWorkflowPath, "resources");

// Paths for the 3 images
const imagePaths = {
  red: path.join(resourcesPath, "red_image.png"),
  green: path.join(resourcesPath, "green_image.png"),
  blue: path.join(resourcesPath, "blue_image.png"),
};

// Sample test data
const testWorkflowJson = {
  name: testWorkflowName,
  title: "Test Workflow",
  description: "A test workflow to validate script functionalities.",
  connectors: ["test_connector"],
  details: {
    stashCount: 0, // Should be removed after script runs
    flowCount: 5,
    flos: [
      {
        id: "12345678-abcd-4321-bcda-87654321abcd",
        name: "red_image",
        type: "HELPER",
      },
      {
        id: "12345678-abcd-4321-bcda-87654321efgh",
        name: "green_image",
        type: "HELPER",
      },
      {
        id: "12345678-abcd-4321-bcda-87654321ijkl",
        name: "blue_image",
        type: "HELPER",
      },
    ],
    helperFlowsCount: 3,
    mainFlowsCount: 2,
  },
};

const testWorkflowFlopack = {
  workflowId: testWorkflowName,
  details: {
    stashCount: 0,
    flowCount: 5,
    helperFlowsCount: 3,
    mainFlowsCount: 2,
  },
};

// Function to set up test environment
async function setupTestEnv() {
  // Create directories
  await fs.mkdir(testWorkflowPath);
  await fs.mkdir(resourcesPath);

  // Write test workflow.json
  await fs.writeFile(
    path.join(testWorkflowPath, "workflow.json"),
    JSON.stringify(testWorkflowJson, null, 2)
  );

   // Write test workflow.flopack
   await fs.writeFile(
    path.join(testWorkflowPath, "workflow.flopack"),
    JSON.stringify(testWorkflowFlopack, null, 2)
  );

  // Create 3 different dummy images with unique patterns
  await createUniqueDummyImages();

  console.log("Test environment set up.");
}

// Function to create 3 unique dummy images
async function createUniqueDummyImages() {
  console.log("Creating three unique dummy images for hashing test...");

  const colors = {
    red: { r: 255, g: 0, b: 0, alpha: 1 },
    green: { r: 0, g: 255, b: 0, alpha: 1 },
    blue: { r: 0, g: 0, b: 255, alpha: 1 },
  };

  let index = 1;
  for (const [colorName, filePath] of Object.entries(imagePaths)) {
    // Generate a slightly different pattern for each image
    const timestamp = Date.now();
    const noiseValue = (index * 10) % 255; // A small difference in pixel values

    const imageBuffer = await sharp({
      create: {
        width: 100,
        height: 100,
        channels: 4,
        background: {
          r: colors[colorName].r + noiseValue,
          g: colors[colorName].g + noiseValue,
          b: colors[colorName].b + noiseValue,
          alpha: 1,
        },
      },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="100" height="100">
               <text x="10" y="50" font-size="20" fill="white">${timestamp}</text>
             </svg>`
          ),
          top: 10,
          left: 10,
        },
      ])
      .png()
      .toBuffer();

    await fs.writeFile(filePath, imageBuffer);
    console.log(`${colorName.toUpperCase()} image created at ${filePath}`);

    index++;
  }
}

// Function to validate workflow.json
async function validateWorkflowJson() {
  console.log("Validating workflow.json...");

  const jsonPath = path.join(testWorkflowPath, "workflow.json");
  const jsonData = await fs.readFile(jsonPath, "utf8");
  const parsedData = JSON.parse(jsonData);

  // Ensure "stashCount" is removed
  assert.strictEqual(
    parsedData.details.hasOwnProperty("stashCount"),
    false,
    "stashCount was not removed!"
  );

  console.log("Validation passed! 'stashCount' was successfully removed.");
}

// Function to run the details modifier script
async function runDetailsModifier() {
  console.log("Running details_modifier.js...");

  await writeToJSONFile(testWorkflowName, testWorkflowJson.details);

  console.log("details_modifier.js executed successfully.");
}

// Function to test image hashing
async function runImageHasher() {
  console.log("Running image_hasher.js...");

  return new Promise((resolve, reject) => {
    exec(
      `node ./scripts/json-details-scripts/image_hasher.js --template ${testWorkflowName}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("Image hasher failed:", error);
          reject(error);
        } else {
          console.log(stdout);
          console.log("image_hasher.js executed successfully.");
          resolve();
        }
      }
    );
  });
}


// Main test runner
async function runTests() {
  try {
    await setupTestEnv();
    await runDetailsModifier();
    await validateWorkflowJson();

    await runImageHasher();


    console.log("\nALL TESTS PASSED SUCCESSFULLY!");
  } catch (error) {
    console.error("\nTEST FAILED:", error);
  }
}

// Execute tests
runTests();
