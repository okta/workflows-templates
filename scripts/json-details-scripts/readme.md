## TEST FILE FOR IMAGE HASHING AND ADDING SCREENSHOT URL/IMAGE UPDATE

## First Run testfile.js ----> testImageUpdate.js ----> deleteDirec.js


1. testfile.js : This test file creates a dummy workflow "test_workflow" with an exact folder structure as that of any regular template. The resources folder are populated wurh dummy images which are mapped to each of the flos inside the workflow.json using the screenshot automation script. 

2. testImageUpdate.js: This test file adds a new image to be updated to the "test_workflow" template. This ensures the old image is replaced by the newly added image and is mapped correctly to the respective flo. This also deletes the old image from the resources folder. 

3. deleteDirec.js : This script deletes the "test_workflow" template folder. 