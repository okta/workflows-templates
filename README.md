# Overview

Welcome to Templates for Workflows!

Templates are pre-built collections of automated business processes that can be imported in Okta Workflows. New workflow templates submitted to this repo can be published to the Okta Workflows console.

# Getting Started

Designing a template is a straightfoward process that begins in the Okta Workflows console, where you design the intended business process. This can be distributed across one or more workflows and tables but *all* related workflows and tables should be kept in the same folder.

Once the collections of workflows and/or tables are complete, you can export the enclosing folder containing the business process by clicking the gear icon on the folder and selecting "Export".

This will download a _flopack_ file to your local filesystem and it is this file that serves as the basis for the Workflows template.

# Submitting a Workflows Template

Each template submission will have three files:
* the template (`.flopack` file) itself
* `readme.md` - contains usage instructions and details about the flows contained in the template
* `workflow.json` - contains metadata about the template

arranged in a directory structure shown below:
```
workflows-templates/workflows/
  my_shared_workflow/
    workflow.json
    workflow.flopack
    readme.md
```
You can find an example of the structure [here](https://github.com/okta/workflows-templates/tree/master/workflows/suspend_inactive_users).

The following guidelines must be followed when creating the template files and enclosing folder:

* Folder name needs to be lower case and separated with underscore (regex: `^[a-z0-9_]{2,50}$` e.g `create_report_google_sheets`).
* Each published file (mentioned below) in the folder also needs to be in lower case.
  * `readme.md`
  * `workflow.flopack`
  * `workflow.json`
* Files such as `workflow.flopack` and `workflow.json` need to have valid JSON structure.
* The `name` value in the `workflow.json` file has a limit of 50 characters and **must** exactly match the name of the enclosing folder.
* The connector names in the `workflow.json` file must only contain valid connector names referenced in the `connectors.json` file.
* Verify if video and documentation links in `workflow.json` file refers to same folder structure

## Step 1: Rename the flopack file

Locate the file that was created from the aforementioned Export process and rename it to `workflow.flopack`

## Step 2: Create the metadata

Create a new file named `workflow.json`. This file must contain the following fields:

* `name [string]` - The name of your template. This should be a string that contains only lowercase letters and underscores (e.g.: `suspend_inactive_users`) and it *must be unique among the folders in this repository*
* `title [string]` - The descriptive, human-friendly title of the template that will appear in the product
* `description [string]` - More information describing what the template does and its potential uses
* `connectors [string[]]` - A comprehensive ist of all connectors used by this template. Connector names are the third-party applications that power the Workflows product. Connector names should be in all lower case. You can find a list of valid connector names [here](https://github.com/okta/workflows-templates/blob/master/connectors.json).  
* `links [object[]]` - Links to documentation or videos for this template 

### Metadata structure and validation rules

In addition to the fields detailed above, the file should also contain a `details` object that contains specific pre-defined elements with correct type for each element. There are validation rules that run on CI to make sure that the data in the `details` object correspond with what's inside the `workflow.flopack` file. Your pull request CI checks will fail if the validation rules are not met.

`workflow.json`'s `details` data structure:
```js
{
  ...,
  "details": {
    "flowCount": number > 0,
    "helperFlowsCount": number > 0,
    "mainFlowsCount": number > 0,
    "stashCount": number > 0,
    "flos": [
      {
        id: string;
        name: string;
        type: "MAIN" | "HELPER",
        screenshotURL: string
      }
    ]
    "tags": string[],
  },
  ...
}
```

### Managing metadata fields

Most fields in the `details` object **should not** be filled in manually as they must match exactly what is in the `workflow.flopack` file. 

These fields include:
  * `flowCount`
  * `helperFlowsCount`
  * `mainFlowsCount`
  * `stashCount`
  * `flos`

To generate this data, run the script at `./scripts/json-details-scripts/details_modifier.js`. It will iterate over **ALL** templates in the repository and modify the `details` object in each `workflow.json` file to match what is specified in the respecitve `workflow.flopack` file.

Each field in the `details` object is optional. If the template flopack doesn't contain flows or tables or isn't tagged, the corresponding field should be completely removed, rather be specified with a value of `0`.

Example: The shape a `details` object for a template with no tables
```js
{
  ...,
  "details": {
    "flowCount": 2,
    "helperFlowsCount": 1,
    "mainFlowsCount": 1,
    "flos": [
      {
        id: "id-1";
        name: "flo-1";
        type: "MAIN",
        screenshotURL: "https://flo-1-screenshot-url.png"
      },
      {
        id: "id-2";
        name: "flo-2";
        type: "HELPER",
        screenshotURL: "https://flo-2-screenshot-url.png"
      }
    ],
    "tags": [
      "introductory",
      "popular"
    ]
  },
  ...
}
```

Example: The shape a `details` object for a template with no flos and no tags
```js
{
  ...,
  "details": {
    "stashCount": number > 0
  },
  ...
}
```

**Reminder**: You don't have to calculate these fields or do any manual work. Just run the `details_modifier.js` script.

### Flows screenshots
For each workflow that contains flows, a screenshot of each flow should be added to the `${WORKFLOW_FOLDER}/resources` directory (create the `resources` directory if it doesn't exist). The purpose of this screenshot is to showcase your flow to users. The screenshot should cover the full flow, not only parts of it. The screenshot can have any name but it should use the `.png` extension. You can explore the screenshots for the current workflows in this repo for reference.

### Deploying flows screenshots & screenshot URL
Flows screenshots are automatically deployed to the cloud when a new branch is pushed to this repo. A background job runs on new branches and uploads the content of the `resources` folders to Amazon's S3.

The screenshot URL follows the pattern: `https://d78vv2h34ll3s.cloudfront.net/static/catalog/workflows/${WORKFLOW_NAME}/resources/${SCREENSHOT_HASH}.png`

Example: let's assume we have a workflow called "email_new_slack_user" that contain 3 flows, the screenshots folder structure for that workflow should look like:

```
workflows
  email_new_slack_user
    ...
    resources
      flow_1_screenshot.png
      flow_2_screenshot.png
      flow_3_screenshot.png
```

When the resources directory of this workflow is pushed to a branch in this repo, these 3 flow screenshots will be automatically deployed. Don't worry about the URL for each screenshot. [As mentioned earlier](https://github.com/okta/workflows-templates#managing-metadata-fields), You can run the `details_modifier.js` script to automatically populate the `screenshotURL` field for each flow in the `workflow.json` file.

## Step 3: Additional documentation

Finally, create a `readme.md` file that has the setup documentation for your template. It should be written in markdown and follow the structure outlined [here](https://docs.google.com/document/d/1a1jQ9o2am9pBfx0LsexiQ0HW8qyOU7WFAEg1Eevjinc/edit).

# How to SKIP CI process

* Add [skip ci] or [ci skip] in commit message in case blocked by CI. Although, this is not recommended but if build is queued for longer time or need to merge template due to urgent fixes, it is probably OK to do so.
* Change the last commit message with command `git commit --amend`. Add [skip ci] or [ci skip] to commit message
* Push the remote branch with force `-f` option e.g `git push -f origin <branch-name>`

# Test CI script on local setup

Install dependencies (first time only)

```js
npm install ajv@7.0.3
npm install shelljs
```

and then run the following commands from root of git repo to test remote branch. All files should have commit to diff with master

```
git checkout <remote-branch-name>
node scripts/schema_validate.js <remote-branch-name>
sh scripts/travis_release.sh <remote-branch-name>
```
