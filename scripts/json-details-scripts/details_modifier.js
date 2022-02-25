const fs = require("fs");
const { getDetailsFromFlopack } = require("./utils");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  if (!fs.lstatSync(`${workflowsDir}/${workflowName}`).isDirectory()) return;

  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackContent = JSON.parse(data.toString());
    const details = getDetailsFromFlopack(flopackContent);
    writeToJSONFile(workflowName, details);
  });
});

function writeToJSONFile(workflowName, details) {
  const jsonFilePath = `${workflowsDir}/${workflowName}/workflow.json`;
  fs.readFile(jsonFilePath, (_, data) => {
    const content = JSON.parse(data.toString());
    content.details = details;
    fs.writeFileSync(jsonFilePath, JSON.stringify(content, null, 2) + "\n");
  });
}
