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
1. Click on Connections and find Onfido API HTTP Connection.
2. Modify the Onfido API connection Custom Authentication value with your Onfido API Token value, it should read as follows: Token token={yourOnfidoAPIToken}
3. Click on the API Access [</>] icon next to the flow named: `[Onfido]` Handle Webhook.
4. Click on Expose as a Webhook and copy the Invoke URL.
5. Login to your Onfido Dashboard and create a webhook using the above Invoke URL. 
6. Copy the Webhook Token Value.
7. Navigate to the `[Onfido]` Handle Webhook and insert the Webhook Token Value into the Text Compose card.
8. Navigate to each child flow ([Webhook Child] Get Report Results and [Webhook Child] Get Check Results) and make sure the URL is correct for your Onfido Region.
9. Activate the `[Onfido]` Handle Webhook then each of the Webhook Child flows. 

### Testing this flow

1. Turn on Flow History in the parent and child flows.
2. Login to your Onfido Dashboard and navigate to Webhooks.
3. Find the corresponding webhook for this flow and select test.
4. The flow will fail as a real user is not used, but we can copy the webhook event and use real information as needed, noting that the HMAC signature check will fail as well. 

### Limitations & Known Issues

* Currently this flow only handles "complete" event types from the Onfido Webhook.