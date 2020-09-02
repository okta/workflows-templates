# Intro to Custom API Actions

## Overview
Sometimes a connector doesn’t meet your needs because of a missing action. With the Custom API Action method, you can get around this limitation by making a generic HTTP request to any of the connectors that Workflows has available. 

This template helps demonstrate how to use the Custom API action card by allowing for the automated management of a help desk role within Okta. The flow leverages Okta's Custom API action which can be used to invoke any of Okta's published APIs. This sample flow uses a custom 'Role' attribute as part of Okta user profile. If the user is created with a 'Support' role attribute, the user is added to the HELP_DESK_ADMIN role in Okta.


## Prerequisites
Before you get started, here are the things you’ll need:
* Access to an Okta tenant with Okta Workflows enabled for your org
* Custom 'Role' attribute created on Okta's default user profile


## Setup Steps
* In the Okta console, go to Apps and select Workflows OAuth application. Click API Scopes, and make sure that okta.roles.manage and okta.roles.read are both granted. If not, click Grant for both of those scopes. 
* In the Workflows designer, select the “Add User to Admin Role” flow from the folder.
* If the roles-related scopes were not selected before, click the connection on the Okta card, click the gear icon, and select Reauthorize. Input your client id/secret from the Workflows OAuth app in your Okta console (located on the sign-on tab). 
* Click Save. Be sure to select “Save All Data”.
* In the top toolbar of the Workflow console, toggle the “Flow is OFF” switch to “ON”.


## Testing this Flow
This flow expects that a user is created in Okta with their ‘role’ attribute populated. In order to simulate this, we will use a test workflow ‘Test Flow: Create Okta User’ that leverages Okta’s ‘Create User’ card to create a test user.
* Open the flow ‘Test Flow: Create Okta User’. In the ‘Create User’ card, set the values for first name, last name, username and primary email as desired. Set the role as ‘Support’. Click the ‘Test’ button to run the flow.
* Open ‘Add User to Admin Role’ flow and view Flow History. You should see a successful flow run.
* Go to Okta admin console and review the list of administrators under Security -> Administrators tab.
* You should see the newly created user listed with the 'Help Desk Admin' role.


## Limitations & Known Issues
Please note that all Okta cards, including Custom API Action, will be subjected to org level rate limits per API endpoint.
