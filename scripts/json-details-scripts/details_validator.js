const fs = require("fs");
const { getCountsFromFlopack } = require("./shared");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackContent = JSON.parse(data.toString());
    const jsonContent = JSON.parse(
      fs.readFileSync(`${workflowsDir}/${workflowName}/workflow.json`).toString()
    );

    // CHECK IF THE 4 "details" FIELDS EXIST
    if (
      !jsonContent.details.hasOwnProperty("flowCount") ||
      !jsonContent.details.hasOwnProperty("mainFlowsCount") ||
      !jsonContent.details.hasOwnProperty("helperFlowsCount")
    ) {
      throw new Error(
        `The "details" field on "${workflowName}/workflow.json" is missing mandatory fields.`
      );
    }

    // VALIDATE THE "details" OBJECT having correct counts
    const countsInJSON = jsonContent.details;
    const countsInFlopack = getCountsFromFlopack(flopackContent);
    Object.keys(countsInFlopack).forEach((key) => {
      if (countsInFlopack[key] > 0 && !countsInJSON[key]) {
        throw new Error(
          `The "details" field on "${workflowName}/workflow.json" is missing the "${key}" field.`
        );
      }

      if (countsInFlopack[key] !== countsInJSON[key]) {
        throw new Error(
          `The "details" object at ${workflowName}/workflow.json contains incorrect numbers`
        );
      }
    });
  });
});
