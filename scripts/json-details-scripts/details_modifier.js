const fs = require("fs");
const { getCountsFromFlopack } = require("./shared");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackContent = JSON.parse(data.toString());
    const counts = getCountsFromFlopack(flopackContent);
    writeToJSONFile(workflowName, counts);
  });
});

/**
 * Writes the calculated counts to the JSON file representing the flopack
 * @param workflowName(string): the workflow folder name
 * @param newCountsVal(object): an object containing counts for each field
 * @returns null
 */
function writeToJSONFile(workflowName, newCountsVal) {
  const jsonFilePath = `${workflowsDir}/${workflowName}/workflow.json`;
  fs.readFile(jsonFilePath, (_, data) => {
    const content = JSON.parse(data.toString());
    content.details = newCountsVal;
    fs.writeFileSync(jsonFilePath, JSON.stringify(content, null, 2));
  });
}
