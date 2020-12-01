const Ajv = require('ajv');
const shell = require('shelljs')

// Fetch the JSON content for schema
let baseDir;
let branchName;
let prWorkFlowJSONFiles;
const workflowSchema = require('./workflow-schema.json');

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

function processArgsAndInitializeVals() {
  if (process.argv.length > 2) {
    console.log('Running locally');
    branchName = process.argv.slice(2);
    console.log(`Testing for git branch  ${branchName}`);
    baseDir = process.cwd();
    prWorkFlowJSONFiles = shell.exec(`git diff --name-only ${branchName}..master -- \'workflows/*/*.json\'`).replace(/\n/g, ' ');
  } else {
    console.log('Running in Travis-CI config');
    baseDir = shell.exec('echo ${TRAVIS_BUILD_DIR}').replace(/\n/g, '');
    branchName = shell.exec('echo ${TRAVIS_BRANCH}');
    prWorkFlowJSONFiles = shell.exec('git diff --name-only ${TRAVIS_BRANCH}..HEAD -- \'workflows/*/*.json\'').replace(/\n/g, ' ');
  }
}

processArgsAndInitializeVals();
processPRFiles();