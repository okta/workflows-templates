
# Assign group memberships temporarily based on time


## Overview

Within Okta, you may want to give a user group membership, but only for a limited time. An example would be a group that gives auditors access to applications, but revoked after 30 days.  Another example may be a temporary development project that you want to assign developers access.

These flows have two entry points. The first is triggered when a user is added to a group in Okta. This will trigger “User Added to Group” flow. This flow will search the associated group table to determine if the group a user was added to was one that has been designated at temporary access. When a user is added to a group designated as temporary, the user id, group id, and a user membership expiration date will be added to the user table. The user membership expiration date is calculated as current date/time + the duration specified in the group table. 

Note: the current duration units is set to minutes for testing purposes. You would likely set this to hours or days in real use cases.

The second entry point is a scheduled flow “Scan users for removal”. This flow would be set up on a scheduled basis to review the user table and determine if the user's access to a group has expired. If the access has expired (based on current date/time of scan), the user will be removed from the group, and entry deleted from the user table.


## Before you get Started/Prerequisites

Before you get started you will need:



*   Access to an Okta tenant with Okta Workflows enabled for your org
*   Create a group in Okta - example “Temp Group”
*   This will require an Okta Connection. If you have not already configured the Okta connection in your Workflows tenant, follow these steps: [https://help.okta.com/en/prod/Content/Topics/Workflows/workflow-connect-your-applications.htm#Authenti](https://help.okta.com/en/prod/Content/Topics/Workflows/workflow-connect-your-applications.htm#Authenti)


## Workflow Setup Steps



1. Set Okta Connections on the cards
    1. In “User Added to Group” flow, click the connection of the first card “Okta User Added to Group”. Set it to your Okta connection.
    2. In “SUB - Remove User from Group” flow, click the connection of the second card “Okta Remove User from Group”. Set it to your Okta connection.
2. Add group names and duration to Temp Groups table
    1. Navigate to Workflows Tables, Temporary Groups table. (this table should have been imported with your flow).
    2. Click on the first empty row to create a new row. In the “Group Name” column, specify the name of the group you created above in prerequisites (“Temp Group”).
    3. On the same row, click on the “Duration” column. Specify the duration of time you want that user to be allowed in the group. (The default units are minutes, and can be changed in the flow).
    4. You can add as many groups as you as want to set up (one per row in the table).


## Testing this flow



*   Ensure all three flows are turned on.
*   From Okta administration, add a user to the group you have created.
*   The “User added to Group” flow should be triggered. The flow should add the user, group, expiration to the “User Added to Temporary Groups” table.
*   Run the “Scan users for removal” flow to scan the user table to see if users should be removed from groups. If the scan is run after the duration specified, you should see the user removed from the group and removed from the user table as clean up.


## Limitations & Known Issues 



*   Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
*   When invoking HTTP endpoints consider any applicable rate limits of the SaaS application (or http endpoint) that you are invoking. You should almost always set up error handling on the card to retry periodically.
