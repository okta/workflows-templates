# Close Abandoned Accounts

## Overview

Abandoned accounts are less likely to have strong passwords and multifactor authentication. This template illustrates how Okta Workflows can be used to enhance your application's overall security by removing these abandoned accounts. Use this template to automatically alert inactive users about account expiration and then remove any users from Auth0 if the accounts remain inactive. 

This template runs daily at 9AM so you can keep on top of maintenance of abandoned accounts.

The steps covered by this template include: 
-   Search for all Auth0 users that haven't signed in at any point over the past 2 years. 
-   Send those users an email to warn them about their pending account expiration. This also advises them that they need to sign in to keep their account active.  
-   Removing the user account if the user doesn't sign in before their account expiration date.

## Prerequisites

Before you get started, here are the things you need:
-   Access to an Okta tenant with Okta Workflows enabled.
-   Access to an Auth0 tenant.
-   Access to a Gmail tenant.

## Setup Steps

### Okta Workflows Setup

1.  Install the template into your Workflows environment.
1.  You should see one main flow, which has a **Scheduled Flow** event card as the trigger event, and two helper flows. One helper flow is used to warn users about their impending account expiration. The other one is for removing the users if they still don't sign back in.
1.  You should also see a table that is used to track potentially abandoned accounts. 
1.  If you haven't already, establish a connection to Auth0 in Workflows.
1.  Similarly, establish a connection to Gmail. To configure a Gmail connection, see [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/gmail/overviews/authorization.htm).

### Customize the Template (Optional)

1.  In the first **Assign** card, set a time period for when you consider an account to be abandoned and eligible for cleanup. The default is 24 months without a successful sign-in attempt.
1.  Next, find the card that calculates the `expiration_date`. Set a time for how long you want to give a user to sign in before you delete their account. The default is 1 month.

## Testing this Flow

1.  Execute your flow in the Workflows console.
1.  Go to execution history for the flow and confirm that the flow executed successfully. 
1.  Check the **Abandoned Accounts Tracker** table. If any inactive users were found, they should now appear in this table.
1.  In Gmail, you should see that warning emails were sent to inactive users.

## Limitations & Known Issues

-  This template assumes that you have already linked any Auth0 identities with the same email address.
