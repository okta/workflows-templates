const fs = require("fs");
const {
  getDetailsFromFlopack,
  validateCounts,
  validateFlows,
  validateUseCases
} = require("./utils.js");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  if (workflowName === ".DS_Store") return;

  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackContent = JSON.parse(data.toString());
    const jsonContent = JSON.parse(
      fs.readFileSync(`${workflowsDir}/${workflowName}/workflow.json`).toString()
    );
    const detailsInJSON = jsonContent.details;
    const detailsFromFlopack = getDetailsFromFlopack(flopackContent);

    validateCounts(workflowName, detailsFromFlopack, detailsInJSON);
    validateFlows(workflowName, detailsFromFlopack, detailsInJSON);
    validateUseCases(jsonContent.details.useCases, workflowName);
  });
});
