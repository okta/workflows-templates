const fs = require("fs");

const workflowsDir = `${process.cwd()}/workflows`;
const workflows = fs.readdirSync(workflowsDir);

workflows.forEach((workflowName) => {
  fs.readFile(`${workflowsDir}/${workflowName}/workflow.flopack`, (_, data) => {
    const flopackFileContent = JSON.parse(data.toString());
    const counts = {
      flowCount: 0,
      mainFlowsCount: 0,
      helperFlowsCount: 0,
      stashCount: 0
    };

    counts.stashCount = Object.keys(flopackFileContent.data.tables).length;
    counts.flowCount = Object.keys(flopackFileContent.data.flos).length;
    [counts.mainFlowsCount, counts.helperFlowsCount] = getCounts(flopackFileContent.data.flos);
    writeToJSONFile(workflowName, counts);
  });
});

/**
 * Calculates the count of Main and Helpers FLOs.
 * 
 * @param FLOs(object) - an object representation of the FLOs inside the flopack:
    {
      "ea86fa36-f764-4d25-9423-549bae004279": {
        "data": {
          "scheduled": false,
          "display": {
            "isCallable": true
          }
        }
      }
    }
 * 
 * @returns [mainFlowsCount: number, helperFlowsCount: number]
*/
function getCounts(FLOs) {
  let mainFlowsCount = 0;
  let helperFlowsCount = 0;

  Object.values(FLOs).forEach((flo) => {
    if (flo.data.display.isCallable && !flo.data.scheduled) {
      helperFlowsCount++;
    } else {
      mainFlowsCount++;
    }
  });
  return [mainFlowsCount, helperFlowsCount];
}

/**
 * Writes the calculated counts to the JSON file representing the flopack
 *
 * @param workflowName(string): the workflow folder name
 * @param newCountsVal(object): {
 *   flowCount: number,
 *   mainFlowsCount: number,
 *   helperFlowsCount: number,
 *   stashCount: number
 * }
 *
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
