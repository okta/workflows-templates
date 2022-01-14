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

    if (Object.keys(jsonContent.details).length > 0) {
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
            `The "details.${key}" field at ${workflowName}/workflow.json is incorrect.`
          );
        }
      });
    }
  });
});
