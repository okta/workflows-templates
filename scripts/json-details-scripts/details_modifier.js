const fs = require("fs");
const { getDetailsFromFlopack } = require("./utils");
const { merge } = require("lodash");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  if (!fs.lstatSync(`${workflowsDir}/${workflowName}`).isDirectory()) return;

  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackContent = JSON.parse(data.toString());
    const generatedDetails = getDetailsFromFlopack(flopackContent);
    writeToJSONFile(workflowName, generatedDetails);
  });
});

function writeToJSONFile(workflowName, generatedDetails) {
  const jsonFilePath = `${workflowsDir}/${workflowName}/workflow.json`;
  fs.readFile(jsonFilePath, (_, data) => {
    const jsonContent = JSON.parse(data.toString());
    jsonContent.details = merge(jsonContent.details, generatedDetails);
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonContent, null, 2) + "\n");
  });
}
