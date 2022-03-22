const fs = require("fs");
const {
  getDetailsFromFlopack,
  validateCounts,
  validateFlos,
  validateUseCases,
  validateScreenshots
} = require("./utils.js");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  if (!fs.lstatSync(`${workflowsDir}/${workflowName}`).isDirectory()) return;

  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackContent = JSON.parse(data.toString());
    const jsonContent = JSON.parse(
      fs.readFileSync(`${workflowsDir}/${workflowName}/workflow.json`).toString()
    );
    const detailsInJSON = jsonContent.details;
    const detailsFromFlopack = getDetailsFromFlopack(flopackContent);

    validateCounts(workflowName, detailsFromFlopack, detailsInJSON);
    validateFlos(workflowName, detailsFromFlopack, detailsInJSON);
    validateScreenshots(detailsFromFlopack, jsonContent);
    validateUseCases(workflowName, jsonContent.details.useCases);
  });
});
