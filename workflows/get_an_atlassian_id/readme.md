# Get Atlassian ID

## Overview

Many of the actions supported within the Jira connector, such as creating or assigning issues to users, require an Atlassian ID. You can use this helper flow to find a user's Atlassian ID when necessary.

## Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows enabled for your org
- A valid Jira connection in Workflows

## Setup steps

This flow is called using the [Call Flow function](https://help.okta.com/wf/en-us/content/topics/workflows/function-reference/flow-control/flocontrol_spawn.htm). You can retrieve Atlassian IDs from within any flow that needs them.

1. After installing the template, select your connection and turn on the **Get Atlassian ID** flow.
2. In the flow that requires an Atlassian ID, add a [Call Flow function](https://help.okta.com/wf/en-us/content/topics/workflows/function-reference/flow-control/flocontrol_spawn.htm) card and select the activated **Get Atlassian ID** flow.
3. Fill out the inputs for the user's email address and the Jira **Project Key**.

## Testing this flow

1. After the inputs are populated, run the parent flow that calls this helper flow.
2. View the execution history. You should see that the **Call Flow** card returns the **Atlassian ID** as an output.

Alternatively, you can test the helper flow in isolation by running it and manually providing the necessary inputs.

## Limitations & known issues

* The flow assumes that the user's email address is their username in Jira.
    > If the username isn't the user's email address, update the `email address` input with the correct username format.
* To search for users within a given project, you need the correct **Project Key**.
* See the [Jira API Doc](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search/#api-group-user-search) for more details. 