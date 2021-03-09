## Onfido Create Applicant

### Overview

This workflow will create an Onfido applicant from the Okta Create User event for the use in Identity Verification. This will then save the Onfido Applicant ID into the user's profile.

Creating an applicant in Onfido at Okta user creation allows organizations to ensure that each newly registering user has an Onfido Applicant ID that can be used for Identity Verification Checks. This applicant ID can be re-used for other Onfido functionality such as facial biometric re-checks, to initialize the Onfido SDK, and to collect report information for a given check on a specific user.

### Before you get Started / Prerequisites

Before you get started, you will need:

* Access to an Okta tenant with Okta Workflows enabled for your org
* An Onfido instance with an API Token generated for use in this workflow (see: https://documentation.onfido.com/#token-authentication)
* An Okta Universal Directory profile attribute named: onfidoApplicantId


### Setup Steps

1. Click on Connections and find Onfido API HTTP Connection.
2. Modify the Onfido API connection Custom Authentication value with your Onfido API Token value, it should read as follows: Token token={yourOnfidoAPIToken}
3. Open the `[Onfido]` UserEvent_Create Applicant flow and modify the Onfido API Text Compose element with the correct Onfido URL for your region.
4. Make sure a Okta connection is selected for the Read User and Update User cards.
5. Turn on the flow named `[Onfido]` UserEvent_Create Applicant.

### Testing this Flow

1. Go to the flow named `[Onfido]` UserEvent_Create Applicant and click "Test Flow" in the toolbar.
2. You will be presented with a prompt to create a Create User event payload to test with, for this test, you need to provide an object that has an Okta User object with a string property of ID. The ID property should be an ID of an existing Okta user you wish to test with. 
3. Ensure that the profile of the Okta test user you provided has been updated with a value in the onfidoApplicantId field and when clicking on Flow History, everything has succeeded.

### Limitations & Known Issues

* Currently there is no filtering on user type, this flow responds to all user created events. It should be straight forward to build a conditional if/else to check things like status (Active, Suspended, etc) or group membership.