# Link New Users to Existing Accounts Based on Email 

## Overview

This template illustrates how Okta Workflows can streamline customer identity management by automatically linking duplicate customer accounts in Auth0. This template checks the email address for every new user that signs in to your website against your existing user base. If a duplicate is found, the template automatically links the user's two Auth0 accounts.

This template is triggered from the Auth0 **Login Actions** flow, using the Auth0 Actions [Workflows Integration](https://marketplace.sus.auth0.com/integrations/okta-workflows) and a Workflows **API Endpoint** event card. 
 
The steps covered by this template include:
- Check if this is the first time the user is signing in.
- If this is a new sign-in attempt, check whether an Auth0 user exists with the same email address.
- If a duplicate user is found, link the two Auth0 accounts.

## Prerequisites

Before you get started, here are the things you need:
- Access to an Okta tenant with Okta Workflows enabled.
- Access to an Auth0 tenant.

## Setup Steps

### Okta Workflows

1. Install the template into your Workflows environment.
1. You should see one main flow that gets triggered by an **API Endpoint** event card. 
1. Copy the `Invoke URL` and `Client Token` from the card for later use.
1. Establish a connection to Auth0 in Workflows (if not already set up). 

### Auth0 Actions

1. Install the Auth0 Actions Workflows integration 
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

This template automatically merges the metadata of the two user accounts that you want to link. 

If you don't want this to happen, update the **Options** section of the Auth0 **Link Account** action card so that `Merge Metadata` equals `False`. 
> Note: if you choose not to merge the metadata, any user or app metadata associated with the secondary user (the new user) is discarded.

## Testing this Flow

Test your action in Auth0 by simulating the sign-in attempt of a new duplicate user and confirm that it's correctly executing the template.

1. Create two Auth0 users with the same email address. 
    > Note: you must have access to this user's email address so that you can verify it.
1. Simulate a sign-in attempt for one of the users by following the directions in the *Verify end-to-end Login Flow* section in the [Test Actions doc](https://auth0.com/docs/customize/actions/test-actions).
1. Go to execution history for the flow and confirm that the flow executed successfully. 
1. In Auth0, go to **User Management** > **Users**.
1. Click the record for your user. 
1. In **Identity Provider Attributes**, confirm that the users were linked. See [here](https://auth0.com/docs/manage-users/user-accounts/user-account-linking) for more information about user account linking.

## Limitations & Known Issues

This template assumes that existing users in Auth0 have no duplicates. If multiple user accounts in Auth0 exist with the same email address, the template only links the first matching user account found, instead of *all* matching user accounts found.
