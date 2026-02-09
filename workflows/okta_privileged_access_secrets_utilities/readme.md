# Okta Privileged Access - Secrets Utilities

## Overview

This set of Workflows templates provide four utilities for use with secrets in Okta Privileged Access (OPA):
1. Tree-view report 
    - Generate and email a report that shows the tree view of the folders/secrets with attached policies.
2. User access report
    - Generate a report of all access that a specific user has for folders/secrets.
3. Secret search
    - Search through all secrets to find a specific one.
4. Resource access report
    - Show all users, groups, and permissions assigned to a folder/secret.

Note: Okta has released a search function for secrets since this template was written.

These utilities:
- Are built in Okta Workflows and use the OPA Connector for API calls.
- Are invoked through delegated flows in the Okta Admin Console (and require the appropriate access).
- Generate their output through email.

The template includes the following:
- Connectors
    - [Okta Priviliged Access connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/oktaprivilegedaccess/oktaprivilegedaccess.htm) 
    - [GMail connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/gmail/gmail.htm) 
        - This can be swapped out for another email connector.
- Tables to store the OPA data objects and relationships.
- Workflows
    - **LOAD** - flows to pre-load the OPA data objects and relationships.
    - **REPT** - the report utilities.
    - **UTIL** - utilty flows called by other flows.

The main **REPT** flows are exposed as delegated workflows in the Okta Dashboard and can be run by anyone authorized to do so. Run the **LOAD** main flows from within the Okta Workflows console.

See [A Set of Utilities for Secrets Management in OPA](https://iamse.blog/2025/08/14/a-set-of-utilities-for-secrets-management-in-opa/).

## Prerequisites

This template requires the following:
- An Okta environment with Okta, Okta Workflows, and Okta Privileged Access.
- OPA configured with secrets and secret folders (preferably in a hierarchy) and the associated users, groups, resource groups or projects, and the policies or rules to manage them.
- An Okta Privileged Access connector defined to workflows and connected to your OPA team.
- A GMail connector defined to workflows and connected to your GMail service.
- Delegated workflows configured in Okta with users who can run delegated flows.
- An email recipient.

## Setup Steps

To set up this template:
1. Confirm that you have the following connectors configured:
    - [Okta Priviliged Access connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/oktaprivilegedaccess/oktaprivilegedaccess.htm) 
    - [GMail connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/gmail/gmail.htm) 
2. Download the template, create a Workflows folder, and import the template file into it.
3. Activate every flow and check for the correct connectors where used.
4. Go through the four main flows (REPT10d, REPT20d, REPT30d, and REPT40d) and set the email *FROM* address

Before running any of the **REPT** flows, you must load the current data from OPA into the workflow tables. These tables hold the relevant OPA objects (users, groups, resources, policies) and relationships. This is done for performance (rather than building this data each time you run a report). You must reload the data any time the OPA data changes. 

To load the data, go to the Workflows console and run each of these flows in order:
1. LOAD10 - Get all Secret Folders
2. LOAD20 - Get all Secrets
3. LOAD30 - Get all Secret Policies
4. LOAD40 - Build Policy to Folder Mapping
5. LOAD60 - Get all Policy Principals

Not: There's no LOAD50.

## Test this Flow

To test the flows, go to the Okta Admin Console and access the delegated flows and run each of the following:
- REPT10d - Folder hierarchy with Policy Rules
    - Specify an email recipient and click **Run**.
    - Monitor the email inbox for the corresponding report.
    - Check that the hierarchy in the report matches your OPA secrets hierarchy.
- REPT20d - Access for a user
    - Specify a username (the OPA username not the Okta username) and email recipient, and click **Run**.
    - Monitor the email inbox for the corresponding report.
    - Check that the access presented for the user matches what they can see when they sign in to OPA.
- REPT30d - Find a secret
    - Specify a search argument (full or partial name for a secret or folder) and email recipient, and click **Run**.
    - Monitor the email inbox for the corresponding report.
    - Check that the found locations match where the secret/folder resides.
- REPT40d - Access to a resource
    - Specify a folder or secret name and email recipient, and click **Run**.
    - Monitor the email inbox for the corresponding report.
    - Check that the found locations match where the secret/folder resides.


## Limitations & Known Issues

- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
- Limited error handling is implemented in this template. Review the flows and add any additional error handling as required by your environment.
