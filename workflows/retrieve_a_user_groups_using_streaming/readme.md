# Retrieve a user's groups using streaming

## Overview

This flow helps retrieve all the groups a user is assigned to.

## Prerequisites

Before you get started, here are the things you need:

1. Access to an Okta tenant with Okta Workflows enabled for your org.
2. A configured Okta Connection. To configure a connection, see [Authentication](https://help.okta.com/wf/en-us/content/topics/workflows/connector-builder/authentication.htm).
3. A user defined in the Okta tenant along with their `user_id`.

## Setup Steps

1. Install the template into your Workflows environment. 

2. Add a valid `user_id` to the **Flow control - Assign** card. 
    - You can find the `user_id` in the Admin Console by going to **Directory** > **People** and selecting the user. The `user_id` is the last string in the URL. 

3. Ensure that the **Okta - Get Users Groups** card has the correct Okta connection selected.

4. In the **Okta - Get Users Groups** card specify the time window you want to report on by editing the **Record Limit** field. The card is already set to stream 10M records.


   
## Testing this Flow

1. Open the **Get User Groups Streaming PARENT** flow and click the **Test** button at the top of the page.


2. When the flow execution is complete, go to the helper flow in the streaming section of the **Get User Groups Streaming PARENT** flow to check execution history.


3. The output of the **Okta - Get Users Groups** card contains the number of groups this user is a part of.



## Limitations & Known Issues
- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-system-limits.htm).
- Error handling isn't addressed in this template.