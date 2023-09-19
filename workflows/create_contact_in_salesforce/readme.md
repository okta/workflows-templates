# Create Contact in Salesforce

## Overview

This template illustrates how B2C companies can use Okta Workflows to automatically sync customers to their CRM solution. When you use this template, every new user that signs in to your website becomes a `Contact` inside your Salesforce account.

This template is triggered from the Auth0 **Login Actions** flow, using the Auth0 Actions [Workflows Integration](https://marketplace.sus.auth0.com/integrations/okta-workflows) and a Workflows **API Endpoint** event card. 

The steps covered by this template: 
- Check if this is the first time the user is signing in.
- If this is a new login, confirm that the user doesn't exist in your Salesforce account.
- If there's no existing contact for the user, create a `Contact` record for them in Salesforce.
 
## Prerequisites

Before you get started, here are the things you need:
- Access to an Okta tenant with Okta Workflows enabled.
- Access to an Auth0 tenant.
- Access to a Salesforce tenant.

## Setup Steps

### Okta Workflows

1.  Install the template into your Workflows environment.
1. You should see one main flow that gets triggered by an **API Endpoint** event card. 
1. Copy the `Invoke URL` and `Client Token` from the card for later use.
1. Establish a connection to Salesforce (if not already set up). To configure a connection, see [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/salesforce/overviews/authorization.htm).

### Auth0 Actions

1. Go to the [Okta Workflows integration](https://marketplace.sus.auth0.com/integrations/okta-workflows) in the [Auth0 Marketplace](https://marketplace.sus.auth0.com/).
    1. Click **Add Integration**.
    1. Sign in to your Auth0 account.
    1. Select the Auth0 tenant where you want to add the Okta Workflows integration.
    1. Click **Continue**.
    1. Take the `Invoke URL` that you saved from the **API Endpoint** event in the template and paste it into the `URL to trigger Okta Workflows` field.
    1. Similarly, paste the `Client Token` into the `Client token for API Authorization` field.
1. Go to **Actions** > **Flows** > **Login** in the Auth0 console.
1. Add the Auth0 Actions Workflows integration to the Auth0 Login Flow.

### Customize the Template (Optional)

This template requires you to indicate which Auth0 "name" field that you want to map into Salesforce. The default is the Auth0 `family_name` and `given_name`. 

If you would rather use Auth0 `name` value, update the **Assign** card near the beginning of the flow:
1. Set `Use Name` equal to `True`
1. Set `Use Given Name and Family Name` equal to `False`.

## Testing this Flow

Test your action in Auth0 by simulating the sign-in attempt of a new user and confirm that it's correctly executing the template.

1. Create an Auth0 user that you can use to simulate a login.
    > Note: You must have access to this user's email address so that you can verify it.
1. Simulate a sign-in attempt for one of the users by following the directions in the *Verify end-to-end Login Flow* section in the [Test Actions doc](https://auth0.com/docs/customize/actions/test-actions).
1. Go to execution history for the flow and confirm that the flow executed successfully. 
1. Open your Salesforce account and confirm that there's a new `Contact` created for your user.

## Limitations & Known Issues

### Limitations

- This template stores your customers in Salesforce in `Contacts`. If you use a different Salesforce data structure to store your customers, you need to change the **Create Record** action card in this template accordingly.
- This template only considers logins from new users. No Salesforce records are created for existing users.
- This template only syncs the first name, family name, email, and phone number to the Salesforce `Contact`. If you would like to sync other user attributes, you need to change the **Create Record** action card in the template. 

### Known issue

- One issue to note is if you're using the Auth0 `name` value to map to the "first name" and "last name" fields in Salesforce. The flow takes anything before the last space in `name` to be the "first name" and anything after that last space to be the "last name". For example, if the `name` value is "Jane Doe Jorgensen", then "first name" is set to "Jane Doe" and "last name" is set to "Jorgensen" in Salesforce.