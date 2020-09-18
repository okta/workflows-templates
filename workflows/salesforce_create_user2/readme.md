# Create Users in Salesforce


## Overview

User Provisioning, or creating users in a 3rd party system, is one of the most foundational use cases for Okta’s Lifecycle Management product. In order to provide access to a system, for example providing access to Salesforce, a newly created user needs to have an account in that system with the correct profile attributes and entitlements. This template walks you through how to create a user in Salesforce and assign them a Profile based on their department. 


## Before you get Started / Prerequisites

Before you get started, here are the things you’ll need:



*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Access to a tenant for Salesforce. If you don’t already have a Salesforce tenant, you can get a free developer trial through [this link](https://developer.salesforce.com/signup). 
*   A configured app instance of Salesforce in your Okta tenant. Make sure that Provisioning is disabled. 
*   A user with the department field populated with either Sales, Marketing, or Operations. If you don’t have the department attribute populated, please populate it for a test user. 
    *   If you are using the Developer trial tenant, due to limited licenses, we recommend using a department value of Sales as the Template is configured to provision a Chatter Free user (where there are many licenses available). 


## Setup Steps



1. Open the “Create Users in Salesforce” template. 
2. On the “User Assigned to App” event card (all the way to the left), add an existing Okta connection or create a new connection. 
    1. The options tab on the event card will show a warning symbol - click Options, and select Salesforce as the app. Select the app instance of Salesforce that you’d like to use with this Template.
3. Select any of the Salesforce cards, and select an existing connection or setup a new connection. 
    2. If you are using a free developer tenant, make sure you select Production when configuring the connection. 
4. Click Save. 
5. Turn the Flow On. Wait 1 minute before proceeding to test the flow to give some buffer time for the event hook to register. 


## Testing this Flow



1. Back in the Okta console, find a user that you’d like to create in Salesforce and make sure that their department attribute is populated with either Sales, Marketing, or Operations. 
    1. If you are using the Developer trial tenant, due to limited licenses, we recommend using a department value of Sales as the Template is configured to provision a Chatter Free user (where there are many licenses available). 
2. On the user profile, click Applications -> Assign Applications. Select the Salesforce app instance that you configured on the event card in Workflows. Go through the process to assign the user. 
3. Go to Flow History and confirm that the flow executed successfully. 
4. Go to your Salesforce tenant and search for the user you created. You should successfully see them provisioned. 


## Limitations & Known Issues



*   You can find out more about Salesforce profiles through this [link](https://help.salesforce.com/articleView?id=users_understanding_license_types.htm&type=5). 
*   You can find out more about Salesforce feature licenses through this [link](https://help.salesforce.com/articleView?id=users_understanding_feature_licenses.htm&type=5). 