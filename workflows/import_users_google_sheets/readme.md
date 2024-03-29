# Importing Users from Google Sheets


## Overview

Often, there are disconnected user populations like contractors, or certain offices that need to be imported into Okta. A CSV or Flat File is the easiest way to create those users in Okta. This flow walks you through how to bring in users from Google Sheets and how to use For Each loops. 

This flow reads all users in a specified Google sheet and, each week on Monday at 6 am, tries to create them in Okta.   


## Prerequisites

Before you get started, here are the things you’ll need:

1. Access to an Okta tenant with Okta Workflows enabled for your org
2. Access to a Google Sheets tenant
3. A Google Sheets spreadsheet with the users you would like to create in Okta and their relevant profile information (first name, last name, email, username, etc.). The spreadsheet should have a header row including the names of each profile attribute in the column below.


## Setup Steps

1. Select "Import Users - Parent Flow" ("parent flow"):
    1. Make sure a connection is selected for the "Read All Rows Card"
    2. Click on “Options”.
    3. Select the spreadsheet to be imported from the “Spreadsheet” dropdown and the worksheet with the data from the “Worksheets” dropdown.
2. Save the parent flow.
3. Select the “Import Users - Helper Flow” (“helper flow”); find the Object “Get Multiple” card.
    1. Double check that the naming of the outputs of the “Get Multiple” card are correctly formatted. Each output should be “Columns-${colNo}.${colName}” where ${colNo} is the column number (starting from 0 on the left hand) and ${colName} is the column name.
    2. If any relevant columns are missing, add them to the outputs.
4. In the helper flow, find the Okta “Create User” card and make sure there is an authorized connection. Then:
    1. Click “Options”.
    2. From the dropdown, select whether the user should be created “without Credentials”, “with a Recovery Question”, “with a Password”, “with a Password & Recovery Question”, “with Authentication Provider”, or “in Group”, and click “Save”.
    3. From the list of “Inputs”, select which attributes should be mapped for the created user.
    4. Drag and drop the output fields from the “Get Multiple” card to the appropriate inputs “Create User” card.
5. Save the helper flow.
6. Make sure all flows are turned on. 

## Testing these Flows

1. First, test the parent flow to trigger the creation of new users ahead of the flow schedule.
2. Next, view Flow History of the parent flow to confirm that the flow successfully executed.
3. Next, open the helper flow and view Flow History. You should see one successful flow execution for each new user to be created.
4. Finally, go to your Okta tenant. You should see new Okta users matching those in your Google Sheet.

## Limitations & Known Issues

* After clicking “New Flow” when initially choosing the flow to be called by the For Each card of the parent flow, you will have to add an event to the new helper flow, save this flow, and then return to the parent flow again to specify this in the flo parameter of the For Each card once again.
