# Contractor Expiry Notification


## Overview

Many organizations utilize contractors in addition to full time employees. A contractor typically has a contract expiry date. This is the date when their current contract is due to expire. Certain people within the organization, such as the contractor's manager, need to be notified ahead of the expiry date so they can potentially renew the employee's contract.

This template contains Flows which read a custom attribute on the user's Okta profile. This custom attribute holds the user's current contract expiry date. Based on a set number of days, a future date is calculated. The Flows compile a list of all users that have a matching contract expiry date and sends emails to a pre-configured list of recipients.

These Flows also demonstrate how static configuration values, like days, timezone and email recipients, can be externalized into a Flow table and read at runtime. This reduces the need to make modifications to the Flows such that changes only involve updating the respective configuration table.


## Workflow Summary

Below is a summary of the flows included in the template:

1 - Contractor Expiry Notification

This is the parent flow and it is initiated via a flow schedule. This flow will check to see if any users have a contract expiry date within a set number of days in the future. The exact number of days is set in the configuration table. For any users found, an email will be generated and sent to the configured recipients.

This parent flow will call the following child flows:

   1. Initialize
   2. Process Contractor
   3. Send Notification Emails

2 - Initialize

This child flow reads configuration data from the configuration table and also initializes the contractor-list table prior to processing. The flow will return configuration values for the number of days, current time zone and email address list, to the parent flow.

3 - Process Contractor

This child flow is called within a loop, once for each user found. The flow formats the user’s first name, last name and email and appends it onto the contractor-list table.

4 - Send Notification Emails

This child flow will process any users that have been stored on the contractor-list table by the previous child flow. If at least one user exists on the contractor-list table, then a HTML formatted email will be sent to the email address list set in the configuration table.


## Prerequisites

Before you get started, below are the things you’ll need:

*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Access to the tenant's profile editor so a custom attribute can be added to the default Okta profile
*   Access to the tenant's users, so the custom attribute can be populated
*   Access to an account for Office 365 Mail


## Setup Steps

Please follow the below step-by-step instructions to set up this workflow.

1. Within your Okta tenant's administration console, under Profile Editor, open the Okta default profile and add the following custom attribute:

    1. Data Type: string
    2. Display Name: Contract End Date
    3. Variable name: contractEndDate

2. Open the workflow folder and select Tables and open the configuration table. Then import the sample configuration data and modify where appropriate. The configuration data consists of the following:

    1. addressList - A comma delimited list of email addresses
    2. timezone - Your current timezone as per the list here: [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
    3. days - The number of days into the future that the workflow will calculate the contract expiry date

3. Within the flow titled "1.0 - Contractor Expiry Notification", update the Okta card to use your Okta connection.

4. Within the flow titled "1.3 - Send Notification Emails", update the Office 365 Mail card to use your Office 365 Mail connection.


## Testing this Flow

Below is how to test the flow.

1. Ensure the configuration table value for addressList contains an email address where you can receive emails for testing.

2. Set the value of the custom attribute for at least one user. The date format must match the following: yyyy-MM-DD. Set the value to be a set number of days into the future. i.e. 30 days. (This value must match the setting on the configuration table for days)

3. Initiate the parent flow (Contractor Expiry Notification) by clicking the Test button.

4. If the flow finds at least one user with a contract expiry date matching the set number of days, then an email will be sent to the configured recipients.


## Limitations & Known Issues

There are no limitations or known issues, at this time.
