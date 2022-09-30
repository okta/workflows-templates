const Ajv = require('ajv').default;
const addFormats = require('ajv-formats');
const shell = require('shelljs')

// Fetch the JSON content for schema
let baseDir = process.cwd();
let branchName;
let prWorkFlowJSONFiles;
const workflowSchema = require('./workflow-schema.json');

// Process PR files with only filter workflows/*/*.json
function processPRFiles() {
  console.log (`PR files to validate ${prWorkFlowJSONFiles} for basedir ${baseDir} on ref ${branchName}`);
  const fileArr = prWorkFlowJSONFiles.split(" ").filter(item => item);
  const ajv = new Ajv({allErrors: true, strict: false});
  addFormats(ajv, ["uri"]);
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
    console.log('Using ref from command line argument');
    branchName = process.argv.slice(2);
    console.log(`Testing for git branch  ${branchName}`);
  } else if (process.env.CIRCLECI) {
    console.log('Running in CircleCI config');
    branchName = process.env.CIRCLE_SHA1;
  } else {
    console.log('Using HEAD as base');
    branchName = "HEAD"
  }

  prWorkFlowJSONFiles = shell.exec(`git diff --name-only ${branchName}..master -- \'workflows/*/*.json\'`).replace(/\n/g, ' ');
}

processArgsAndInitializeVals();
processPRFiles();
