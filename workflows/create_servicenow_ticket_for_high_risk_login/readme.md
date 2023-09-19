# Create ServiceNow Ticket for High Risk Login

## Overview

This template illustrates how Okta Workflows can be used to guard against high-risk customer logins. When a high-risk login occurs, the template automatically creates a ServiceNow incident with relevant information, enabling your security team to respond quickly and mitigate any risk to your site.

To determine the risk associated with a login, this template relies on Auth0's confidence calculation. For more information about this calculation, see the *Evaluate confidence* section of the [Customize Adaptive MFA](https://auth0.com/docs/secure/multi-factor-authentication/adaptive-mfa/adaptive-mfa-rules) documentation. 

This template is triggered from the Auth0 **Login Actions** flow, using the Auth0 Actions [Workflows Integration](https://marketplace.sus.auth0.com/integrations/okta-workflows) and a Workflows **API Endpoint** event card. Any login assessed to be "low confidence" by Auth0 generates a ServiceNow ticket.

The ServiceNow incident includes the following information:
- Login timestamp.
- User information: name, email, phone number, and Auth0 ID.
- Login information: authentication methods, IP address, IP confidence, device confidence, and travel confidence.
- Full Auth0 risk assessment object.

## Prerequisites

Before you get started, here are the things you need:
- Access to an Okta tenant with Okta Workflows enabled.
- Access to an Auth0 tenant.
- Access to a ServiceNow tenant.

## Setup Steps

### Okta Workflows

1. Install the template into your Workflows environment.
1. You should see one main flow that gets triggered by an **API Endpoint** event card. 
1. Copy the `Invoke URL` and `Client Token` from the card for later use.
1. Establish a connection to ServiceNow (if not already set up). To configure a connection, see [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/servicenow/overviews/authorization.htm).

### Auth0 Actions

1. Install the Auth0 Actions Workflows Integration:
    1. Go to the [Okta Workflows integration](https://marketplace.sus.auth0.com/integrations/okta-workflows) in the [Auth0 Marketplace](https://marketplace.sus.auth0.com/).
    1. Click **Add Integration**.
    1. Sign in to your Auth0 account.
    1. Select the Auth0 tenant where you want to add the Okta Workflows integration.
    1. Click **Continue**.
    1. Take the `Invoke URL` value that you saved from the **API Endpoint** event in the template and paste it into the `URL to trigger Okta Workflows` field.
    1. Similarly, paste the `Client Token` into the `Client token for API Authorization` field.
1. Go to **Actions** > **Flows** > **Login** in the Auth0 console.
1. Add the Auth0 Actions Workflows integration to the Auth0 Login Flow.

## Testing this Flow

Test your Action in Auth0 by simulating a user sign-in and confirm that it's correctly kicking off the template.

1. Create an Auth0 user that you can use to simulate a login.
    > Note: you must have access to this user's email address so that you can verify it.
1. Simulate a sign-in attempt by following the directions in the *Verify end-to-end Login Flow* section in the [Test Actions](https://auth0.com/docs/customize/actions/test-actions#verify-end-to-end-login-flow) documentation.
1. Go to the Execution History for the flow. You should see that the flow ran, but it didn't create the ServiceNow ticket because this wasn't a high risk login. 
1. Simulate a high risk login by testing the flow using a sample payload for the `body` field of the **API Endpoint** event card.
    1. Go to **Actions** > **Flows** > **Login** in the Auth0 console.
    1. Click the plus sign on the right to add an action and choose **Build Custom**.
    1. Give your action a name and click **Create**. 
    1. Go to the "Test" icon on the top left of your **Custom Action**. 
    1. Copy the payload for the event. 
    1. Test the template with the payload pasted into the `body` field on the **API Endpoint** event card.
    1. Open the Execution History from the flow.  
    1. Copy the incident number for the ServiceNow incident.
    1. Go to your ServiceNow account and search for the incident number. Confirm that the incident was created and contains relevant information about the login.

## Limitations & Known Issues

This flow only alerts the security team about a high risk login by creating a ServiceNow incident. However, it doesn't:
- Send the incident to the security team, though you can add that functionality to the end of the flow.
- Make any automated changes to the user's sign-in experience.
