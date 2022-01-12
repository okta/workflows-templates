const fs = require("fs");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flowPackContent = JSON.parse(data.toString());
    const jsonContent = JSON.parse(
      fs.readFileSync(`${workflowsDir}/${workflowName}/workflow.json`).toString()
    );

    // CHECK IF THE 4 "details" FIELDS EXIST
    if (
      !jsonContent.details.hasOwnProperty("flowCount") ||
      !jsonContent.details.hasOwnProperty("mainFlowsCount") ||
      !jsonContent.details.hasOwnProperty("helperFlowsCount") ||
      !jsonContent.details.hasOwnProperty("stashCount")
    ) {
      throw new Error(
        `The "details" field on ${workflowName}/workflow.json is missing essential keys.`
      );
    }

    // VALIDATE THE TABLES COUNT
    if (Object.keys(flowPackContent.data.tables).length !== jsonContent.details.stashCount) {
      throw new Error(`Number of tables (stashes) is not correct at ${workflowName}/workflow.json`);
    }

    // VALIDATE THE "details" OBJECT
    const countsInJSON = jsonContent.details;
    const countsInFlopack = {
      flowCount: Object.keys(flowPackContent.data.flos).length,
      mainFlowsCount: 0,
      helperFlowsCount: 0,
      stashCount: Object.keys(flowPackContent.data.tables).length
    };

    Object.values(flowPackContent.data.flos).forEach((flo) => {
      if (flo.data.display.isCallable && !flo.data.scheduled) {
        countsInFlopack.helperFlowsCount++;
      } else {
        countsInFlopack.mainFlowsCount++;
      }
    });

    Object.keys(countsInFlopack).forEach((key) => {
      if (countsInFlopack[key] !== countsInJSON[key]) {
        throw new Error(
          `The "details" object at ${workflowName}/workflow.json contains incorrect numbers`
        );
      }
    });
  });
});
