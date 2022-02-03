# Password sync for ChromeOS devices

## Overview

Google ChromeOS is a rapidly growing platform that has many advantages over legacy operating systems. With ChromeOS and Okta you can authenticate to your device using your Okta credentials and keep those credentials in sync with Okta Workflows.

## Before you get Started / Prerequisites

Before you get started, here are the things you’ll need:

- Access to an Okta tenant with Okta Workflows enabled for your org.
- Google Workspace tenant with a ChromeOS device management license.
  - Admin rights to the Google Workspace tenant with permissions to create API tokens and define scopes.
- Test user account in Google Workspace (this is a non-destructive
  action, but a test user is still recommended).
- At least one ChromeOS device running a current version of the
  software.

## Setup Steps

The main thing we require is the API token to connect to the Google APIs. The majority of the work will be done as a Google admin.

1. Create the API token and provide the necessary scopes by following the Google directions:
    - [https://developers.google.com/chrome/chrome-device-token/guides/authorizing](https://developers.google.com/chrome/chrome-device-token/guides/authorizing)
2. During the “Add Key” step you will be asked to download a JSON file from Google.
3. Load the Chrome Device Token API template in Workflows.
4. Open the JSON file from Google in a text editor, then copy and paste the entire contents of the file into the first text box of the Okta Workflow (the card is titled “JSON Parse”).

## Testing this Flow

1. Go to your Okta Admin dashboard.
    - View the user record for the user you are testing with
    - Copy the internal user ID value from the URL bar (it’s the part
    after the last /).
        - Example *(do not use this value)*:
    `https://{orgURL}/admin/user/profile/view/00u292rwz3ox00uYU5d6`

2. Compose a JSON object that contains this ID value
    - Example JSON: `{"ID":"00u292rwz3ox00uYU5d6"}`
    - Copy this JSON to your clipboard.

3. Test the workflow
    - Click the test button on the workflow.
    - Scroll down to the object labeled “Okta User” and paste the JSON value in to the field.
    - Click “Run Test”.
4. The workflow will only take a few seconds to run and you should get a `200 OK` response at the end of the flow.

If you do not receive a 200 OK message then you either called an invalid Okta ID value, the user specified does not exist in Google Workspace, or the JSON uploaded from Google was incorrect, revoked, or is lacking the necessary permissions. Please refer to the Google documentation linked above.

## Limitations & Known Issues

- The Okta Workflow event card for “User Okta Password Updated” does not fire if the user’s password is sourced from Active Directory or LDAP with delegated authentication.
- The user will be prompted to log in to their ChromeOS device with Okta the next time they lock the screen. This API does not forcibly log the user out of ChromeOS.
- Note that the user will be able to login to the ChromeOS device offline as long as the session policy defined in Google Workspace ChromeOS policy allows. Only when the device is reconnected to the internet will the user be forced to reauthenticate with Okta.