/**
 * Fetch all flos screenshots from "./workflows" and save them all in a flat structure in the "flos-screenshots" directory
 * The new "flos-screenshots" directory will be used by Travis CI to upload all the flos screenshots to S3
 */

const glob = require("glob-fs")();
const fs = require("fs");
const path = require("path");

(function () {
  const files = glob.readdirSync('./workflows/**/flo-screenshot-*.*');

  if (!files || files.length === 0) {
    console.log(`${path.basename(__filename)}: No FLO screenshots were found`);
    return;
  };

  const destination = "./all-flos-screenshots";

  if (fs.existsSync(path.resolve(destination))) {
    fs.rmSync(destination, { force: true, recursive: true });
  }
  fs.mkdirSync(path.resolve(destination));

  files.forEach(file => {
    const fileName = file.split("/").slice(-1)[0];
    fs.copyFileSync(
      path.resolve(file),
      path.resolve(`${path.resolve(destination)}/${fileName}`),
      fs.constants.COPYFILE_FICLONE
    );
  });
})();


