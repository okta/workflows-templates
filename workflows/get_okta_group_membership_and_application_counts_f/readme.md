# Get Membership and Application Counts for an Okta Group

## Overview

This template retrieves detailed statistics for a specific Okta group, including counts of its user members, group members (nested groups), and assigned apps. It uses the `expand=stats` query parameter with the Okta Groups API, called through an **Okta Custom API** action card. 

This template is useful for admins or automated processes that need to quickly find out the composition and app linkage of a particular group without making multiple API calls. 


## Prerequisites

 - Access to an Okta tenant with Okta Workflows enabled for your org.


## Setup Steps

After installing this template, follow these steps to configure it for your needs: 

1. Configure Okta Connections: Locate the **Okta: Search Groups** card. Go to its connection setting and select an existing Okta connection with `okta.groups.read` permissions, or create a new one. Do the same for the **Okta: Custom API** action card. 

2. Provide the Target Group Name in the **Okta - Search Group** card 

## Testing this Flow

1. Provide a **Group ID**. Make sure a valid **Okta Group Name** is supplied to the flow. 

2. Trigger the workflow.

3. Check the execution history and outputs. Inspect the outputs of the final **Assign** card. Verify that the following are returned:
- `groupId`: This is present as the `id` field.
- `groupName`: This is present as the `profile.name` field.
- `userMembersCount` / `groupMembersCount`: This is present as the `_embedded.stats.usersCount` field.
- `assignedAppsCount`: This is present as the `_embedded.stats.appsCount` field.




4. Cross-reference these counts with the actual statistics for that group as viewed in your Okta Admin Console to ensure accuracy. 

## Limitations & Known Issues
- Keep in mind the Okta Workflows system limits.
- Error handling isn't addressed in this template.