# Create Leads in Marketo

## Overview

This template illustrates how B2C companies can use Okta Workflows to sync customers to Marketo. Using this template ensures that every new user that signs in to your website has a profile in Marketo. This enables you to avoid manual and error-prone imports and immediately engage with new users through marketing campaigns to increase engagement and retention.

This template is triggered from the Auth0 Login Actions flow, using the Auth0 Actions [Workflows Integration](https://marketplace.sus.auth0.com/integrations/okta-workflows) and a Workflows **API Endpoint** event card. 

The steps covered by this template: 
- Check if this is the first time the user is signing in.
- If it is, confirm that they don't already have a corresponding lead in Marketo.
- If no lead for the user exists, create one for them in Marketo.

## Prerequisites

Before you get started, here are the things you need:
- Access to an Okta tenant with Okta Workflows enabled.
- Access to an Auth0 tenant.
- Access to a Marketo tenant.

## Setup Steps

### Okta Workflows

1. Install the template into your Workflows environment.
1. You should see one main flow that gets triggered by an **API Endpoint** event card. 
1. Copy the `Invoke URL` and `Client Token` from the card for later use.
1. Establish a connection to Marketo (if not already set up). To configure a connection see [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/marketo/overviews/authorization.htm).

### Auth0 Actions Setup
1. Install Auth0 Actions Workflows integration 
    1. Go to the [Okta Workflows integration](https://marketplace.sus.auth0.com/integrations/okta-workflows) in the [Auth0 Marketplace](https://marketplace.sus.auth0.com/).
    1. Click **Add Integration**.
    1. Sign in to your Auth0 account.
    1. Select the Auth0 tenant to which you want to add the Okta Workflows integration.
    1. Click **Continue**.
    1. Take the `Invoke URL` that you saved from the **API Endpoint** event in the template and paste it into the `URL to trigger Okta Workflows` field.
    1. Similarly, paste the `Client Token` into the `Client token for API Authorization` field.
1. Go to **Actions** > **Flows** > **Login** in the Auth0 console.
1. Add the Auth0 Actions Workflows integration to the Auth0 Login Flow.

### Customize the Template (Optional)

This template requires the user to indicate which Auth0 name fields the user wants to map to Marketo. The defaults are the Auth0 `family_name` and `given_name`. 

If you would rather use the Auth0 `name`, update the **Assign** card found near the beginning of the flow. Set `Use Name` equal to `True` and `Use Given Name and Family Name` equal to `False`.

## Testing this Flow

Test your Action in Auth0 by simulating the sign-in of a new user and confirm that the template correctly executes.

1. Create an Auth0 user that you can use to simulate a login. 
    > Note: You must have access to this user's email address so that you can verify it. 
1. Simulate a sign-in attempt by following the directions in the *Verify end-to-end Login Flow* section in the [Test Actions doc](https://auth0.com/docs/customize/actions/test-actions).
1. Go to execution history for the flow and confirm that the flow executed successfully. 
1. Open your Market account and confirm that a new `Lead` has been created for your user.

## Limitations & Known Issues

### Limitations

- This template only considers new user logins. No Marketo leads are created for existing users.
- This template only syncs first name, last name, email, and phone number to the lead in Marketo. If you would like to sync more user attributes, you can change the **Create Lead** action card in the template accordingly. 

### Known issue
- If you are using the Auth0 `name` to map to Marketo `first name` and `last name`, note that the flow takes any characters before the last space in `name` as the "first name" and anything after that last space as the "last name". 