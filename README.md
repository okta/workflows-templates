
Welcome to Templates for Workflows!

Templates are pre-built automated business processes that can be imported in Okta Workflows. New workflow templates submitted to this repo can be published to the Okta Workflows console.

## Getting Started

#### How to submit Workflows Template

*   Open Okta Workflows and design the intended business process. This can be distributed across one or more workflows and tables. Keep all related workflows and tables in the same folder. 
*   Export the folder containing the business process by clicking the gear icon on the folder and selecting Export. 
    *   Rename this file to workflow.flopack
*   Next, we’re going to create the files necessary for submitting your template to this repository. Each template will have three files: the template, a readme, and a workflow.json file that stores some metadata. You can find an example of the structure [here](https://github.com/arvilnagpal-okta/suspend-inactive-users). 
*   Create a workflow.json file with the following information. 
    *   _name_ - The name of your template. Treat this as a unique identifier (eg suspend_inactive_users)
    *   _title_ - The title of workflows template that will appear in the product. 
    *   _description_ - template description
    *   _connectors_ - list of connectors used by this template. Connector names are app names seen in workflows designer. Connector names should be in lower case. You can find a list of the connector names here. [insert link to readme doc]  
    *   _links_ - Links to documentation or videos for this template 
*   Finally, create a readme.md file that has the setup documentation for your template. It should be written in markdown and follow the structure outlined [here](https://docs.google.com/document/d/1a1jQ9o2am9pBfx0LsexiQ0HW8qyOU7WFAEg1Eevjinc/edit).    
*   Use following directory structure to organize workflow.flopack, workflow.json and connector.json workflows/ &lt;my_shared_workflow>/ workflow.json workflow.flopack readme.md
*   Create a new folder under the following directory. Place the three files (readme, workflow.json, and workflow.flopack) into this new folder. 
    *   [https://github.com/okta/workflows-templates/workflows](https://github.com/okta/workflows-templates/tree/master/workflows)/[your new folder] 

---

#### Guideline on file/folder structure before submitting Workflow Template

*   Folder name needs to be lower case and separated with underscore (regex: ^[a-z0-9_]{2,50}$ e.g create_report_google_sheets).
*   Each published file (mentioned below) in workflow folder needs to be in lower case.
    *   readme.md
    *   workflow.flopack
    *   workflow.json
*   Files such as workflow.flopack and workflow.json needs to have valid JSON structure.
*   Workflow name needs to have matching folder name.
*   Workflow name has a limit of 50 characters.
*   Workflow should have valid connector names which are referenced in connectors.json file
*   Verify if video and documentation links in workflow.flopack file refers to same folder structure

---

#### "workflow.json" data structure & validation rules
Each workflow template has a `workflow.json` file that contains metadata about the template. This `workflow.json` file contains a `details` object that should contain specific pre-defined elements with correct type for each element. There are validation rules that run on CI to make sure that what is inside this `details` object correspond with what's inside the `workflow.flopack` file. Your PR CI checks will fail if the validation rules are not met.

`workflow.json`'s details data structure:
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
  },
  ...
}
```

1. Certain fields in the `details` object **should not** be filled in manually. These fields are: `flowCount, helperFlowsCount, mainFlowsCount, stashCount, flows`.

2. There is a script at `./scripts/json-details-scripts/details_modifier.js` that you should run to do so. It will go over **ALL** templates in the repo and modify the `details` object in each `workflow.json` file to contain valid data coming from each `workflow.flopack` file.

3. These `details` fields in question are all optional. For example; if a flo doesn't have any tables, the `stashCount` should be completely removed, rather than be there with a zero value. Here is the shape of the details object then:

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
    ]
  },
  ...
}
```

Another example: if a flo doesn't have any flos, but only tables. Here is the shape of the details object then:

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

---

#### How to SKIP CI process

*   Add [skip ci] or [ci skip] in commit message in case blocked by CI. Although, this is not recommended but if build is queued for longer time or need to merge template due to urgent fixes, it is probably OK to do so.

*   Change the last commit message with command `git commit --amend`. Add [skip ci] or [ci skip] to commit message

*   Push the remote branch with force `-f` option e.g `git push -f origin <branch-name>`

*   Test CI script on local setup
    ### Install dependencies (one time only)
    *   npm install ajv@7.0.3
    *   npm install shelljs

    ### Run below script from root of git repo to test remote branch. All files should have commit to diff with master

    *   git checkout `remotebranch`
    *   node scripts/schema_validate.js `remotebranch`
    *   sh scripts/travis_release.sh `remotebranch`
