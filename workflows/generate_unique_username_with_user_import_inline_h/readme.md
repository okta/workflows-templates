# Generate unique username with user import inline hooks

## Overview

IT administrators need to have a unique username to add a new hire within an organization. This template uses inline hooks and Workflows to check to see if the imported user exists within the Okta Universal Directory. If the user exists, the template increments the username prefix by 1 to make it unique. For example, `jessiedoe1@example.com`.

## Prerequisites

1.  Access to an Okta tenant with Okta Workflows enabled.
2.  A [configured Okta connection](https://help.okta.com/okta_help.htm?type=wf&id=ext-connect-your-apps).

## Procedure

1.  Go to each flow and ensure that your Okta connector is associated with a valid connection. Enable each flow included in the template.
2.  After you enable the flows, open the Okta Admin Console and go to **Workflow > Inline Hooks**.
3.  Create a **User Import Inline Hook**. Choose a name for your inline hook. Enter the **Workflows API Endpoint invoke URL** found in the `1.0 Create User` flow from the imported template.
    * The **Workflows API Endpoint URL** can be found by looking at the **API Endpoint** card in your template. At the bottom of the card, there's a `</>` icon labeled **Endpoint Settings**, click the icon to copy the URL.
4.  In the Admin console, select the directory integration you want to import users from. For example, **CSV Directory**.
5.  In the **Provisioning** settings for your directory integration, go to the **To Okta** tab. In the **Inline Hook** settings, select the inline hook that you created and click **Save**.

## Testing

1.  Import a user from an existing directory integration with Okta Universal Directory. This should trigger your inline hook flow.
2.  For more information regarding user import inline hooks, see the [developer reference documentation](https://developer.okta.com/docs/reference/import-hook).

## Limitations and known issues

-   Keep in mind the Okta [Workflows system limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits).
-   This template doesn't address error handling.
-   If you don't have a directory integration configured, you can test this template by setting up a [CSV directory integration with Okta](https://help.okta.com/okta_help.htm?id=ext_csvintegration).
-   This template supports a maximum of nine prefix increments for cases where the username already exists. For example, `jessiedoe1@example.com` ... `jessiedoe9@example.com`