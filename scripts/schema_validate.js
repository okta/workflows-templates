const Ajv = require('ajv');
const shell = require('shelljs')

// Fetch the JSON content for schema
const workflowSchema = require('./workflow-schema.json');
const baseDir = shell.exec('echo ${TRAVIS_BUILD_DIR}').replace(/\n/g, '');
const branchName = shell.exec('echo ${TRAVIS_BRANCH}');
const prWorkFlowJSONFiles = shell.exec('git diff --name-only ${TRAVIS_BRANCH}..HEAD -- \'workflows/*/*.json\'').replace(/\n/g, ' ');

// Process PR files with only filter workflows/*/*.json
function processPRFiles() {
  console.log (`PR files to validate ${prWorkFlowJSONFiles} for basedir ${baseDir} on branch ${branchName}`);
  const fileArr = prWorkFlowJSONFiles.split(" ").filter(item => item);
  const ajv = Ajv({allErrors: true});
  const validate = ajv.compile(workflowSchema);
  fileArr.forEach(file => {
    console.log (`processing file ${file}`);
    const filePath = require(baseDir+"/"+file);
    const valid = validate(filePath);
    if (!valid)  {
      console.log(validate.errors);
      process.exit(1);
    } else {
      console.log ('Success');
      process.exit(0);
    }
   });
}

processPRFiles();