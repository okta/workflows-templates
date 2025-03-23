/* Run in this order:  testfile.js ----> testImageUpdate.js ----> deleteDirec.js 
Please refer to readme.md under scripts folder to understand function of each file.
*/

const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const sharp = require("sharp"); //

const testWorkflowDir = path.join(process.cwd(), "workflows");
const testWorkflowName = "test_workflow";
const testWorkflowPath = path.join(testWorkflowDir, testWorkflowName);
const resourcesPath = path.join(testWorkflowPath, "resources");

const imagePathsNew = {
  red: path.join(resourcesPath, "red_image.png"),
};

//create a new red_image to update
async function createNewImageForUpdate() {
  console.log("Creating one unique dummy image for update image...");

  const colors = {
    red: { r: 255, g: 255, b: 0, alpha: 1 },
  };

 
  for (const [colorName, filePath] of Object.entries(imagePathsNew)) {


    const imageBuffer = await sharp({
      create: {
        width: 150,
        height: 100,
        channels: 4,
        background: {
          r: colors[colorName].r,
          g: colors[colorName].g,
          b: colors[colorName].b,
          alpha: 1,
        },
      },
    })
      .png()
      .toBuffer();

    await fs.writeFile(filePath, imageBuffer);
    console.log(`${colorName.toUpperCase()} image created at ${filePath}`);

    
  }
}

async function runImageHasherNewImageUpdate() {
  await createNewImageForUpdate();
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

runImageHasherNewImageUpdate();
