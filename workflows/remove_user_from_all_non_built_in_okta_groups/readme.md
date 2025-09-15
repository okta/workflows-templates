# Remove User from All Non-Built-in Okta Groups

## Overview

This template automates the process of removing a specified user from all their Okta group memberships. It intelligently skipping built-in Okta groups (like `Everyone`) from which users typically can't be programmatically removed. 

The template comprises two key flows: 


- **Main Flow**: This flow is initiated with an Okta User ID. It retrieves all Okta groups that the user is a member of and then streams each group individually to the **Remove User from Group - Helper** flow for processing. 
- **Helper Flow**: This helper flow is triggered for each group streamed by the main flow. It performs checks on the group type to ensure it's an Okta group and skips built-in groups. If the group is deemed eligible, the flow proceeds to remove the specified user from that group using an Okta API call. 

This automation is valuable for user de-provisioning processes, ensuring clean removal of group access while preserving essential built-in group memberships. 

## Prerequisites

Before you get started, here are the things you need:

1. Access to an Okta tenant with Okta Workflows enabled for your org.

2. The `userID` of the Okta user who you want to remove from all the groups the user is assigned to.

## Setup Steps

After installing the templates, follow these steps to configure them for your environment:

1. In the Okta Workflows console, locate and open the main flow template **Remove User from all Groups** and replace the `{userId}` with a value.



## Testing this Flow

1. Select a non-critical test user in your Okta tenant. Assign this user to several Okta groups, including some regular Okta groups. Note the `userId` of this test user. 

2. Run the main flow. Use the `userId` of your test user as input and run the flow. 

3. Check its execution history. Verify that the **Okta: Get User's Groups** card successfully retrieved the groups for the user and initiated streaming to the helper flow.

4. Verify in Okta Admin Console. Go to the test user's profile in the Okta Admin console and go to their **Groups** tab. Confirm that the user has been removed from the targeted groups. Confirm that the user remains a member of the built-in groups.

## Limitations & Known Issues
- Keep in mind the Okta Workflows System Limits.
- Error handling isn't addressed in this template.