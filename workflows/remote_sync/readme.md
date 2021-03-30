# Workflows Template: Remote Sync 


## Overview

Many Customer Identify and Access Management customers have multiple user stores that need to be maintained until legacy systems are decommissioned. When the identity information sourced in Okta changes, these attributes need to be synchronized downstream. This template provides an easy-to-implement, fully customizable method to update a remote system with CRUD (create, read, update and delete) operations.
This integration uses Okta Group membership to identify those users that shall be synced. Adding a user to the group initiates the creation in the remote system. Removing a user from a group deletes the user from the remote system.
In this sample, the user's name, address, and email are synced to the remote system. The flows can be modified to change attribute sync requirements. 

The implementation uses a modular approach that splits the downstream CRUD operations into child flows to facilitate adaptation to complex environments.

## Prerequisites

*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   The Remote System API calls in this sample are using a mock API. Create an HTTP connector with the Auth for the mock API as none.


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
    * [child]Create User via API
    * [child]Update User via API
    * [child]Delete User via API
    
   Select an appropriate HTTP connector for "HTTP Raw Request" card
4. Create an Okta group named "API Provisioning Group"
5. Add a custom attribute to the Okta user profile name = 'customId' type=string
   * This attribute will contain the user ID from Remote System
6. Ensure all these flows are turned on:
    *   Event Update User of Group
    *   Event Remove user From Group
    *   Event Add user to Group
    *   [child]Update User Via API
    *   [child]Delete User Via API
    *   [child]Create User Via API


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
