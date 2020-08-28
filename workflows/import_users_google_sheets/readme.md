## Importing Users from Google Sheets


### <span style="text-decoration:underline;">Overview</span>

Often, there are disconnected user populations like contractors, or certain offices that need to be imported into Okta. A CSV or Flat File is the easiest way to create those users in Okta. This flow walks you through how to bring in users from Google Sheets and how to use For Each loops. 

This flow reads all users in a specified Google sheet and, each week on Monday at 6 am, tries to create them in Okta.   


### <span style="text-decoration:underline;">Before you get Started / Prerequisites</span>

Before you get started, here are the things you’ll need:

*   Access to an Okta tenant with Okta Workflows enabled for your org
*   Access to a Google Sheets tenant
*   A Google Sheets spreadsheet with the users you would like to create in Okta and their relevant profile information (first name, last name, email, username, etc.). The spreadsheet should have a header row including the names of each profile attribute in the column below.


### <span style="text-decoration:underline;">Setup Steps</span>

1. Select "Import Users - Parent Flow" ("parent flow"):
    1. Make sure a connection is selected for the "Read All Rows Card"
    2. Click on “Options”.
    3. Select the spreadsheet to be imported from the “Spreadsheet” dropdown and the worksheet with the data from the “Worksheets” dropdown.
2. Save the parent flow.
3. Select the “Import Users - Child Flow” (“child flow”); find the Object “Get Multiple” card.
    1. Double check that the naming of the outputs of the “Get Multiple” card are correctly formatted. Each output should be “Columns-${colNo}.${colName}” where ${colNo} is the column number (starting from 0 on the left hand) and ${colName} is the column name.
    2. If any relevant columns are missing, add them to the outputs.
4. In the child flow, find the Okta “Create User” card and make sure there is an authorized connection. Then:
    1. Click “Options”.
    2. From the dropdown, select whether the user should be created “without Credentials”, “with a Recovery Question”, “with a Password”, “with a Password & Recovery Question”, “with Authentication Provider”, or “in Group”, and click “Save”.
    3. From the list of “Inputs”, select which attributes should be mapped for the created user.
    4. Drag and drop the output fields from the “Get Multiple” card to the appropriate inputs “Create User” card.
5. Save the child flow.
6. Make sure all flows are turned on. 

### <span style="text-decoration:underline;">Testing this Flow</span>

1. First, test the parent flow to trigger the creation of new users ahead of the flow schedule.
2. Next, view Flow History of the parent flow to confirm that the flow successfully executed.
3. Next, open the child flow and view Flow History. You should see one successful flow execution for each new user to be created.
4. Finally, go to your Okta tenant. You should see new Okta users matching those in your Google Sheet.

### <span style="text-decoration:underline;">Limitations & Known Issues</span>

* After clicking “New Flow” when initially choosing the flow to be called by the For Each card of the parent flow, you will have to add an event to the new child flow, save this flow, and then return to the parent flow again to specify this in the flo parameter of the For Each card once again.
