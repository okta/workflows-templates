# Onfido Create Applicant

## Overview

For identity verification, this flow creates an Onfido applicant using a User Created event card for the Okta connector and saves the applicant ID in the user’s Okta profile.

When you create an application in Onfido as part of the Okta user creation process your organization ensures that each newly registered user has an Onside application ID that can be used for identity verification checks. This applicant ID can be reused for other Onfido features such as facial biometric re-checks, initializing the Onfido SDK, and collecting report information for a check on a specific user.

## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled for your org
2. An Onfido instance with an API Token generated for use in this workflow (see: https://documentation.onfido.com/#token-authentication). Choose `Sandbox` or `Live` as appropriate for your Onfido instance. 
3. A custom Okta Universal Directory profile attribute named: `onfidoApplicantId` of type `string`


## Setup Steps

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

## Testing this Flow

1. Create a user in Okta
2. Verify that the `[Onfido] UserEvent_Create Applicant` workflow executes successfully and the user profile attribute `onfidoApplicantId` is updated with a value. 


## Limitations & Known Issues

* OnFido applicants are created for all Okta Users that are created. Additional conditional logic can be added in the flow to create OnFido applicants based on user status, group membership, etc. 
* Refer to the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) for event hooks and Okta API rate limits.
* Onfido also has rate limits for API calls: [Onfido Rate Limit](https://documentation.onfido.com/#rate-limits) that should be taken into account when designing flows.

