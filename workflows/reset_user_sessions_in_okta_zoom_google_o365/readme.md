
# Reset User Sessions

## Overview

This page outlines a sample workflow template that contains one workflow:

A **Reset User Sessions** flow: In this helper flow a users session will be cleared/revoked in:
* Okta
* Google Workspace 
* Zoom
* Office 365

Any applications you do not want to take this action on can be deleted from the flow once the template has been installed. This flow is built as a helper flow so it can be called by event based triggers or as a delegated flow. Examples of where you may want this used:

* When an Okta user is suspended
* When an Okta user reports suspicous activity
* When an Okta admin performs a password reset on a user
* Delegated flow triggered by Okta admin
* Security remediation use cases


## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled.
2. A configured Okta Connection. To configure a connection, see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).
3. A configured Google Workspace connection. To configure a connection, see [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/googledirectory/overviews/authorization.htm).
4. A configured Office 365 Admin connection. To configure a connection, see [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/office365admin/overviews/authorization.htm).

You will also need admin access to your Zoom tenant to create an account-installed OAuth Marketplace Integration. The Zoom session reset is accomplished using an API Connector not the out of box Zoom connector.

## Setup Steps

### Zoom Setup Steps

Create Zoom Marketplace API integration

1. Open the Zoom Marketplace ([https://marketplace.zoom.us/](https://marketplace.zoom.us/)) and login with your Zoom administrator account.

2. Navigate to Develop -> Build App

3. Click "Create" under OAuth  

4. Complete "Create an OAuth app" form

    * Enter App Name of your choice (example: "Okta Workflows HTTP")
    * Select "Account-level app"
    * Uncheck "Would you like to publish this app on Zoom App Marketplace?"
    * When complete click "Create"

5. Record Client ID and Client Secret as you will need them later. 

6. In "Redirect URL for OAuth" and "Add allow lists" fields input the below URL:
    
    * For Okta Preview envs: https://oauth.workflows.oktapreview.com/oauth/httpfunctions/cb
    * For Okta Prod envs: https://oauth.workflows.okta.com/oauth/httpfunctions/cb

7. Click "Continue"

8. Complete "Short description", "Long description", "Name", and "Email address" fields on "Information" page. Everything else can be left blank.

9. Click "Scopes" on left hand navigation

10. Click "+ Add Scopes"

11. Search for "User"

12. Check box next to "View users information and manage users" (user:write:admin)

13. Click "Done"

14. Click "Continue"


### Okta Workflows Setup Steps

Install the template

Create New API Connector Connection for Zoom in Okta Workflows

1. Go to Connections page in your Okta Workflows console.

2. Click "+ New Connection"

3. Click "API Connector"

4. Rename Connection Nickname to "Zoom OAuth"

5. For "Auth Type" select "OAuth" from list.

6. Fill in form with data below:

    * Authorize Path: https://zoom.us/oauth/authorize
    * Access Token Path: https://zoom.us/oauth/token
    * Scope: user:write:admin
    * Client ID: (generated from Zoom Marketplace)
    * Client Secret: (generated from Zoom Marketplace)

7. Click "Create"

8. A pop up window will open requesting OAuth approval to allow Okta Workflows access to your Zoom tenant using your Zoom Marketplace integraion.  

9. Click "Allow"

10. The pop up window will auto close and you should see your new API Connector connection in the list. 

Select Connection on API Connector card in flow

1. Navigate to the flow.

2. Find the "Zoom" note and API Connector "Delete" card.

3. On the "Delete" card click on the connection selector just below the card name and above the text "Request"

4. Select your "Zoom OAuth" connection from the list.


## Testing the Flow

1. Open the "Reset User Sessions" flow.

2. It is recommended you test the flow using a test user that has an active session of Okta, Google Workspace, Zoom, and Office 365. 

3. The only attribute passed in is the Okta User ID of the user who's sessions you would like to reset. 


## Limitations & Known Issues

* All of these requests are in "If Error" blocks so that if one of them fails the flow will continue.
* Error handling is not addressed in this template.
* If a user does not exist in any of the systems it will error and continue the flow. 
* This template uses APIs that are maintained by 3rd parties and could change over time.
* APIs used in this template may have rate limits which could result in failed executions.


