# Create a Report on Multiple Okta Events


## Overview

There may be times where you want to utilize multiple events for a singular purpose. Instead of creating copies of each flow that then need to be maintained separately, helper flows and tables can be leveraged to limit the repetition in your flows.  

This template demonstrates a simple pattern for creating a daily report of user attributes from three Okta events: User Created, User Okta Profile Updated, and User Deactivated. It then uploads a report daily to Google Drive using a scheduled flow that runs at midnight every night.  


## Prerequisites

Before you get started, you will need:


*   Access to an Okta tenant with Okta Workflows enabled
*   Optional. A login for Google Drive. 


## Setup Steps

1. Make sure all Okta connectors are connected to the desired Okta tenant.  Okta cards are used in the following flows:
    1. Okta User Profile Updated
    2. Okta User Deactivated
    3. Okta User Created
    4. [Helper] Write User Attributes to Table
2. Connect the Google Drive Upload File card in the “Upload daily report” flow.
3. Make sure all flows are turned on.  


## Testing this Flow

1. In the Okta Admin portal for the same tenant, select People from the Directory menu.
2. Click the Add Person button at the top of the page.
3. Select a User Type, and fill out the corresponding profile attributes.  For testing purposes, you can leave the activation email option unchecked.  
4. Click Save.
5. Use the search bar to locate the user that was just created and select them from the list.
6. Click on the Profile link at the top of the page and click the Edit button to update the user’s attributes.
7. Change or add a few of the user attributes that are being tracked in the report and click Save.
8. Again, select People from the Directory menu, and use the search bar to locate the user that was just created.
9. Click into the user’s profile again, and select Deactivate from the More Actions dropdown menu.
10. Return to your flows, open the flow titled “Upload daily report”, and click the Test button.
11. Verify that the flows executed correctly by checking that all rows in the User Attributes table have been deleted and that the file appears as expected in the Google Drive account.  


## Limitations & Known Issues

*   The Workflows table feature has a limit of 100K records.  Use Google Sheets or Microsoft Excel Online if you expect more daily records.
*   Large reports could fail on upload.  If this happens, be sure to use the Multi-part File Upload function in place of the Google Drive Upload File connector.  
