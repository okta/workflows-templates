## Onfido Handle Webhook

### Overview

This workflow will allow you to receive Onfido webhook events for when a check or a report has completed from Onfido's Identity Verification process. With these webhook events, you can parse the report or check data, update user profiles with statuses, or other functions like suspending users who fail Onfido's IDV process.

This workflow currently will update a user's onfidoIdvStatus profile property with the result of a check, but there are many more possibilities.

### Before you get Started / Prerequisites

Before you get started, you will need:

* Access to an Okta tenant with Okta Workflows enabled for your org
* An Onfido instance with an API Token generated for use in this workflow (see: https://documentation.onfido.com/#token-authentication)
* An Okta Universal Directory profile attribute named: onfidoApplicantId and onfidoIdvStatus
* An Onfido applicant ID in the user profile attribute onfidoApplicantId (see workflow: Onfido Create Applicant template)

### Setup Steps
1. Click on the API Access [</>] icon next to the flow named: Handle Webhook.
2. Click on Expose as a Public service and copy the Invoke URL.
3. Login to your Onfido Dashboard and create a webhook using the above Invoke URL. 
4. Copy the Webhook Token Value.
5. Click on the Tables in the flow folder and open the Onfido Variables table.
6. Edit the value column for the following keys:
   1. apiURL - this should be the base URL for your Onfido instance, such as api.us.onfido.com/v3. It is important to have the version without a trailing slash as well. Your base URL is based on your region: US = api.us.onfido.com, EU = api.onfido.com, and CA = api.ca.onfido.com.
   2. apiToken - this should be the API Token you have generated in the Prerequisites.
   3. webhookToken - this should be the value you copied above for the webhook.
7. Click on the Handle Webhook flow and make sure a Okta connection is provided for the List User and Update User cards.
8. Turn on both Child flows: Get Report Results and Get Check Results.
9. Turn on the parent flow: Handle Webhook

### Testing this flow

1. Turn on Flow History in the parent and child flows.
2. Login to your Onfido Dashboard and navigate to Webhooks.
3. Find the corresponding webhook for this flow and select test.
4. The flow will fail as a real user is not used, but we can copy the webhook event and use real information as needed, noting that the HMAC signature check will fail as well. 

### Limitations & Known Issues

* Currently this flow is hard to test without test users and Onfido applicant IDs. 