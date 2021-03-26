## Onfido Create Applicant

### Overview

This workflow creates an Onfido applicant from the Okta Create User event for use in Identity Verification. The Okta user profile is updated with the Onfido Applicant ID.

Creating an applicant in Onfido at Okta user creation allows organizations to ensure that each newly registering user has an Onfido Applicant ID that can be used for Identity Verification Checks. This applicant ID can be re-used for other Onfido functionality such as facial biometric re-checks, to initialize the Onfido SDK, and to collect report information for a given check on a specific user.

### Before you get Started / Prerequisites

Before you get started, you will need:

* Access to an Okta tenant with Okta Workflows enabled for your org
* An Onfido instance with an API Token generated for use in this workflow (see: https://documentation.onfido.com/#token-authentication). Choose `Sandbox` or `Live` as appropriate for your Onfido instance. 
* A custom Okta Universal Directory profile attribute named: `onfidoApplicantId` of type `string`


### Setup Steps

1. In Okta Workflows, click on Connections. Create a new `Http Connection` and fill in the following:

	- [x] Connection Nickname `Onfido API`
	- [x] Auth Type `Custom`
	- [x] Header Name `Authorization`
	- [x] Header Value `Token token={yourOnfidoAPIToken}` without the parentheses 	

2. Open the `[Onfido] UserEvent_Create Applicant` flow and modify the following:

- On the `Text Compose` card with the Onfido API URL, enter the correct Onfido URL for your region.
- Choose the Okta connection for the `Okta Read User` and `Okta Update User` cards
- Choose the `Onfido API` HTTP Connection for the `HTTP Post` card
 
3. Save and Turn on the `[Onfido] UserEvent_Create Applicant` flow.

### Testing this Flow

1. Create a user in Okta
2. Verify that the `[Onfido] UserEvent_Create Applicant` workflow executes successfully and the user profile attribute `onfidoApplicantId` is updated with a value. 


### Limitations & Known Issues

* OnFido applicants are created for all Okta Users that are created. Additional conditional logic can be added in the workflow to create OnFido applicants based on user status, group membership etc. 
* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) of Event Hook and Okta API rate limits.
* Onfido also has rate limits for API calls: [Onfido Rate Limit](https://documentation.onfido.com/#rate-limits) that should be taken into account when designing workflows.