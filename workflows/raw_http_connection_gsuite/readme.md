# Create a custom API connector for Google Workspace

## Overview

The current Workflows connector for Google Workspace Admin doesn't include all functions available within Google Workspace APIs. The Custom API action (CAPIA) card is also restricted to the Directory and Licensing APIs. 

While Workflows expands the scopes and permissions available for different Google Workspace APIs, use this guide to create your own custom HTTP connector to request specific scopes from different Google Workspace APIs.

## Prerequisites

To get started, you need:

*   Access to an Okta tenant with Okta Workflows enabled for your org
*   Access to a tenant in Google Workspace

## Setup Steps

1. Go to [https://console.cloud.google.com/](https://console.cloud.google.com/) and sign in with your Google Workspace Admin login.
1. If you don't already have a project, create a project.
1. Keep the default settings and click **Create**.

    <img src="images/image1.png" width="600" class="center">

1. Search for the APIs in the main search window, for example, `Group Settings API` and enable it for the project. This adds the API-specific scopes to the authorized app (Okta Workflows).
1. In the project you created, click **OAuth Consent Screen** under APIs and Services.
1. Click **Internal** to use the API for internal apps. Click **Create**.
1. Enter a name for the app. Choose the admin credentials as the support email address. 
1. Under **Authorized domains**, enter '[okta.com](http://okta.com/)' and add your email for the **Developer Contact Information**.
1. In the **Scopes** section, choose all the scopes you require for your Workflow and click **Update**.

    <img src="images/image2.png" width="800" class="center">

1. Keep the remaining fields as the defaults and complete the process.
1. Click **Credentials** under **APIs and Services** > **Create credentials** > **OAuth Client ID**. Enter a name and the following information for **Authorized Origins** and **Redirect** URIs. Copy the client ID and secret from this page to enter on the Okta side. Click **Save**.

    <img src="images/image3.png" width="500" class="center">

   **URIs:** https://oauth.workflows.okta.com
   
   **Authorized redirect URIs:** https://oauth.workflows.okta.com/oauth/httpfunctions/cb

1. Open the Okta Workflows Console and click **Connections**.
1. Create an HTTP connection with the following values:
    1. Choose **OAuth** as the authentication method.
    2. **Authorize path**: [https://accounts.google.com/o/oauth2/auth](https://accounts.google.com/o/oauth2auth)
    3. **Token Path**: [https://accounts.google.com/o/oauth2/token](https://accounts.google.com/o/oauth2/token)
    4. **Scopes**: [https://www.googleapis.com/auth/apps.groups.settings](https://www.googleapis.com/auth/apps.groups.settings) (This is only an example. Separate multiple scopes with spaces).
    5. **Client ID**: copied from the previous step
    6. **Client Secret**: copied from the previous step
1. Click **Create**. Authorize the request using the Google Workspace admin credentials.

Now you can directly call Google Workspace APIs and perform actions based on the scopes requested.


## Testing this Flow

- Ensure that the flow is turned on.
- Choose the new connector created in the HTTP card in the flow.
- Click **Test** for that specific card and give the API endpoint that you want to test.
- Verify the results on the **Execution History** page.

## Limitations & Known Issues 

- The **Raw HTTP Connector to Google Workspace** workflow doesn't receive a refresh token, so it requires re-authentication every hour.
- Be aware of the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm). When you invoke HTTP endpoints, consider any applicable rate limits of the SaaS app (or HTTP endpoint).
- Set up error handling on the card to retry periodically.