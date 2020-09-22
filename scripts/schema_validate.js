const Ajv = require('ajv');
const shell = require('shelljs')

// Fetch the JSON content for schema
const userSchema = require('./workflow-schema.json');
const baseDir = shell.exec('echo ${TRAVIS_BUILD_DIR}').replace(/\n/g, '');
const branchName = shell.exec('echo ${TRAVIS_BRANCH}');
const prJSONFiles = shell.exec('git diff --name-only ${TRAVIS_BRANCH}..HEAD -- \'workflows/*/*.json\'').replace(/\n/g, ' ');

// Helper for validating
function validate (schema, data) {
  return ajv.validate(schema, data)
    ? true : ajv.errors;
}

// Process PR files with only filter workflows/*/*.json
function processPRFiles() {
  console.log (`PR files to validate ${prJSONFiles} for basedir ${baseDir} on branch ${branchName}`);
  let fileArr = prJSONFiles.split(" ").filter(item => item);
  let ajv = Ajv({allErrors: true});
  fileArr.forEach(file => {
    console.log (`processing file ${file}`);
    let filePath = require(baseDir+"/"+file);
    let validate = ajv.compile(userSchema);
    let valid = validate(filePath);
    if (!valid)  {
      console.log(validate.errors);
    } else {
      console.log ('Success');
    }
   });
}

processPRFiles();