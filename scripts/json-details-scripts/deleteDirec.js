/* Run in this order:  testfile.js ----> testImageUpdate.js ----> deleteDirec.js 
Please refer to readme.md under scripts folder to understand function of each file.
*/

const fs = require("fs").promises;
const path = require("path");

const testWorkflowDir = path.join(process.cwd(), "workflows");
const testWorkflowName = "test_workflow";
const testWorkflowPath = path.join(testWorkflowDir, testWorkflowName);

//await fs.rm(testWorkflowPath, { recursive: true });
fs.rm(testWorkflowPath, { recursive: true }, err => {
    if (err) {
      throw err
    }
  
    console.log(`${testWorkflowPath} is deleted!`)
  })