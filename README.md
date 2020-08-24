
Welcome to Templates for Workflows!

Templates are pre-built automated business processes that can be imported in Okta Workflows. New workflow templates submitted to this repo can be published to the Okta Workflows console.

## Getting Started

#### How to submit Workflows Template

1. Open Okta Workflows and design the intended business process. This can be distributed across one or more workflows and tables. Keep all related workflows and tables in same folder.
2. Export the folder containing the business prodcess. 
3. Name this file workflow.flopack
4. Create workflow.json and capture following information in workflow.json
  1. *name* - this should be the folder name under workflows folder - see below
  2. *title* - title of workflows template
  3. *description* - template description
  4. *connectors* - list of connectors used by this template. Connector names are app names seen in workflows designer. Connector names should be in lower case.
  6. *links* - Links to documentation or videos for this template. The documentation should link to the file within the workflows-templates repo (not the source repo). 
5. Use following directory structure to organize workflow.flopack, workflow.json and connector.json
workflows/
  <my_shared_workflow>/
    workflow.json
    workflow.flopack
    README.md
