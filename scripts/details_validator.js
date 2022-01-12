const fs = require("fs");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flowpackContent = JSON.parse(data.toString());
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
        `The "details" field on ${workflowName}/workflow.json is missing essential keys. Go to <link_here> for documentation.`
      );
    }

    // VALIDATE THE "details" OBJECT having correct counts
    const countsInJSON = jsonContent.details;
    const countsInFlopack = getCountsFromFlowpack(flowpackContent);
    Object.keys(countsInFlopack).forEach((key) => {
      if (countsInFlopack[key] !== countsInJSON[key]) {
        throw new Error(
          `The "details" object at ${workflowName}/workflow.json contains incorrect numbers`
        );
      }
    });
  });
});

/**
 * Get the 4 counts we need from the .flopack file
 * @param {object} flowpackContent: the content of the .flopack file
 * @returns {flowCount: number, mainFlowsCount: number, helperFlowsCount: number, stashCount: number}
 */
function getCountsFromFlowpack(flowpackContent) {
  const countsInFlopack = {
    flowCount: Object.keys(flowpackContent.data.flos).length,
    mainFlowsCount: 0,
    helperFlowsCount: 0,
    stashCount: Object.keys(flowpackContent.data.tables).length
  };

  Object.values(flowpackContent.data.flos).forEach((flo) => {
    if (flo.data.display.isCallable && !flo.data.scheduled) {
      countsInFlopack.helperFlowsCount++;
    } else {
      countsInFlopack.mainFlowsCount++;
    }
  });

  return countsInFlopack;
}
