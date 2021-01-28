# Overview

More companies are using multiple Office 365 tenants. This is especially evident in M&A activities. As a result, users need access across multiple tenants. Many are solving the licensing aspect of this through a Microsoft Guest account. But automating the creation and management of these users is cumbersome.  This Flow will get you started with creating guest accounts with no code nor special infrastructure to host code. 


## Before you get Started/Prerequisites

Before you get started you will need:



*   Access to an Okta tenant with Okta Workflows enabled
*   Active Okta users with a populated ‘Display Name’
*   Groups Defined in Okta
*   Administrative Access to an O365 tenant 


## Setup Steps



1. Create an Okta group used for O365 guests
2. Connect the ”Okta User Added to Group” card.
3. From the Workflow Console , in the Continue If card enter the name of your group in the “value B” field. 
4. Connect the ”O365 - Create Guest User” card.
5. Save the flow enabling “Save all data that passes through this Flow?”
6. Turn on Flow


## Testing this flow



*   Make sure your users has a valid ‘Display Name’ in Okta’s Universal Directory 
*   Assign a user to the O365 guest group on the Okta admin UI
*   From the Okta Workflows console click the Flow History link for the “Create O365 Guest User” flow
*   Read the results of each card. Each card should correspond to the following card. 
*   Login to the O365 admin portal and launch Azure AD. Click the Users option and search for your user to verify their User type. 


## Limitations & Known Issues 



*   None at this time. 
