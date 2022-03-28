# Remote Sync 


## Overview

Many Customer Identify and Access Management customers have multiple user stores that need to be maintained until legacy systems are decommissioned. When the identity information sourced in Okta changes, these attributes need to be synchronized downstream. This template provides an easy-to-implement, fully customizable way to update a remote system with CRUD (create, read, update and delete) operations.

This integration uses Okta Group membership to identify the users to be synced. Adding a user to the group initiates the user creation in the remote system. Removing a user from the group deletes the user from the remote system.

In this sample, the user's name, address, and email are synced to the remote system. The flows can be modified to change attribute sync requirements. The implementation uses a modular approach that splits the downstream CRUD operations into helper flows to facilitate adaptation to complex environments.

## Prerequisites

1.   Access to an Okta tenant with Okta Workflows enabled for your org.
2.   The Remote System API calls in this sample use a mock API. 
3.   Create an HTTP Raw Request card with the connection set to none.


## Setup Steps

1. Configure a HTTP Connector to communicate with a remote system
    * Enable secure HTTP connections:
      * Basic Auth
      * Custom Auth
      * OAuth
2. For the following flows, make sure a connection is selected for the instances of the Okta connector cards:
    * Event Update User of Group
    * Event Remove User from Group
    * Event Add User to Group
    If the connection is not selected automatically, select the necessary connection manually.
3. For the following flows, modify API URL and API Request JSON to match your remote system requirements:
    * [helper]Create User via API
    * [helper]Update User via API
    * [helper]Delete User via API
   Select an appropriate HTTP connection of "none" for the "HTTP Raw Request" card
4. Create an Okta group named "API Provisioning Group"
5. Add a custom attribute to the Okta user profile name = 'customId' type=string
   * This attribute will contain the user ID in the Remote System
6. Ensure all these flows are turned on:
    *   Event Update User of Group
    *   Event Remove user From Group
    *   Event Add user to Group
    *   [helper]Update User Via API
    *   [helper]Delete User Via API
    *   [helper]Create User Via API


## Testing these Flows

The easiest way to test these flows is to add your test user to the Okta Group "API Provisioning Group"

1. In the Okta Admin UI, navigate to the test user's page.
2. In the Groups tab of the Users page, add "API Provisioning Group".
3. Inspect the remote system for the test user.
4. In the Profile tab of the user's page, edit the value for "city" attribute.
5. Inspect the remote system for change in test user's "city" value.
6. In the Groups tab of the Users page, remove "API Provisioning Group".
7. Inspect the remote system, searching for the test user, which should not be present.


## Limitations & Known Issues
*   None
