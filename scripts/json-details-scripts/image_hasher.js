#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const fs = require("fs");
const path = require('path');
const { imageHash }= require('image-hash');
const { exit } = require('process');

const generateHashedFile = (source, dest, overwrite=true, ignoreErrors=false, deleteOnCreate=false) => {
  imageHash(source, 12, true, (error, data) => {
    if (error) throw error;

    const destination = `${dest}/${data}${path.extname(source)}`;
    
    fs.copyFile(source, destination, overwrite ? null : fs.constants.COPYFILE_EXCL, (err) => {
      if (err) {
        ignoreErrors ? console.warn(err) : console.error(err);
        !ignoreErrors && exit(1);
      }

      if (deleteOnCreate && destination !== source) {
        fs.unlink(source, (err) => {
          if (err) {
            console.warn(`Encountered error deleting source file ${source}. You may need to manually delete it.`);
            return;
          }
          console.log(`Deleted source file ${source}`);
        })
      }
    });
    console.log(`Created ${destination} from ${source}`);
  });
};

const workflowsDir = `${process.cwd()}/workflows`;
console.log(argv)
let templateName = argv.template,
    overwrite = argv.overwrite ?? true,
    ignoreErrors = argv['ignore-errors'] ?? false,
    deleteOnCreate = argv.delete ?? true
    ;

let workflows = [];
if (templateName) {
  workflows.push(templateName);
} else {
  workflows = fs.readdirSync(workflowsDir);
}

workflows.forEach((workflowName) => {
  const workflowDir = `${workflowsDir}/${workflowName}`;
  if (!fs.lstatSync(workflowDir).isDirectory()) {
    return;
  }
  const images = fs.readdirSync(`${workflowDir}/resources`);
  images.forEach((image) => generateHashedFile(`${workflowDir}/resources/${image}`, `${workflowDir}/resources`, overwrite, ignoreErrors, deleteOnCreate));
});
