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

        if (jsonContent.details.useCases) {
          validateUseCases(jsonContent.details.useCases, workflowName);
        }
      });
    }
  });
});

function validateUseCases(floUseCases, workflowName) {
  const useCases = JSON.parse(
    fs.readFileSync(`${process.cwd()}/useCases.json`).toString()
  ).useCases.map((s) => s.name);

  if (!Array.isArray(floUseCases)) {
    throw new Error(
      `The useCases field in "${workflowName}/workflow.json" has the wrong type. It should be an array of valid use cases strings.`
    );
  }

  if (!floUseCases.every((s) => useCases.includes(s))) {
    throw new Error(
      `The use cases assigned to "${workflowName}/workflow.json" are not valid. Make sure the use cases you used are mentioned in the "useCases.json" file.`
    );
  }
}
