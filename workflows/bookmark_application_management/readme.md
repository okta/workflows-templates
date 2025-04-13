# Bookmark Application Management
## Overview
This template contains flows for managing bookmark apps in Okta. 
- Create new bookmark apps.
- Update bookmark apps.
- Deactivate bookmark apps. 
## Prerequisites 
Before you get started, here are the things you need: 
- Access to an Okta tenant with Okta Workflows enabled for your org. 
- Bookmark app list with the URL, app assignment group, and app sign on policy. 
## Setup steps 
1. Import the list of bookmark apps to be created in the **Bookmark Application Table** table. 
1. Update the Okta workflow connection to include the okta.apps.manage scope if not already included.
## Testing this flow 
1. Open the **Bookmark Application Table** table and update the **Action** column to *Create* for the bookmark apps you want to create. 
1. Run **1.0 Bookmark Application Management - Parent Flow**.
1. Once the flow completes, validate that the apps whose action was set to *Create* are created in Okta. 
    - The action for updating apps is *Update*. The action for deactivating apps is *Deactivate*. 
## Limitations and known issues
- The group to be assigned must exist in Okta and be an Okta group. 
- The apps sign on policy to be assigned must exist in Okta. 
- For the *Update* action, the app name and app URL are supported.
