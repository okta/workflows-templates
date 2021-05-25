
# Creates a Report with Google Sheets

## Overview

This is a sample flow for generating a simple spreadsheet report using Okta system log events. We’ll use user suspension as an example, but any event works.

## Prerequisites

Before you get started, here are the things you’ll need:

*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Access to a Google Sheets tenant
*   A user who can be suspended

## Setup Steps

1. Select the “Suspended Users Google Sheets Report” flow from the folder.
2. If you have not already done so, authorize the connections to Google Sheets, Gmail, and Okta. 
3. Create a new spreadsheet in Google Sheets with the column headers “Display Name,”	“Alternate ID”, and “Time” in one of its sheets.
4. Select the spreadsheet and worksheet in the “Create Row” Google Sheets connector. 
5. Select the spreadsheet in the Read Worksheet info card.
6. Enter one or more email addresses in the “Send Email” card.
7. Click Save. Be sure to select “Save All Data.”
8. In the top toolbar of the Workflow console, toggle the “Flow is OFF” switch to “ON” 

## Testing this Flow

1. Go into your Okta tenant and suspend a user    
2. Open your flow and view Flow History. You should see a successful flow run.
3. View the spreadsheet you connected. You should see an additional row with the suspended user’s name, Okta username, and a timestamp.
4. Look at the inbox of the email address you sent the notification to. You should see a notification email about the user suspension with a link to the spreadsheet.

## Limitations & Known Issues

*   If extending this flow to work with other Okta events, please note that only a subset of System Log events are available in the Okta connector.
