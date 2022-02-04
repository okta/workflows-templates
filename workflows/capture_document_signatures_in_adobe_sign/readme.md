# Capture Document Signatures in Adobe Sign

## Overview

Many organizations use Adobe Sign to control agreements – such as Non-Disclosure Agreements (NDAs), Lease Contracts, and Terms of Service (TOS) – that dictate which resources users can access. This template leverages Adobe Sign webhooks to capture when a user signed a document. This information can be used by Okta to determine which systems a user can access and their security level.

## Before you get Started / Prerequisites

Before you get started, you will need:

- Access to an Okta tenant with Okta Workflows enabled for your org.
- Active users.
- Access to an Adobe Sign tenant with administrative rights to create an Adobe Sign application, agreements, and webhooks.

**Tip:** You can get an Adobe Sign tenant for development purposes at [https://acrobat.adobe.com/us/en/sign/developer-form.html](https://acrobat.adobe.com/us/en/sign/developer-form.html)

## Setup Steps

### Configure Okta

1. Access the Okta admin dashboard `(https://\<tenant>-admin.okta.com/admin/dashboard)`.
2. Create custom attribute:
    - Go to `Directories -> Profile Editor`
    - On the row `User (default)`, click `Profile`.
    - Click `Add Attribute`
    - Create an attribute to store the document signature date. For example:
        - **Type**: String
        - **Display Name**: NDA signed date
        - **Variable Name**: ndaDate
        - **Description**: The date a user signed the NDA
3. Create group:
    - Click `Directories -> Groups`.
    - Click `Add Group` and then follow the instructions to create a group for users who signed a contract. (i.e., *"Under NDA"*).
4. Create a group rule:
    - On the Groups page, click the Rules tab.
    - Create a rule to add users to the Under NDA group when the NDA signed date field is filled:
        - **Name**: Under NDA
        - **IF**: `Use Okta Expression Language (advanced)`:  
            - `String.len(user.ndaDate) \> 0`
        - **THEN**: Assign to `Under NDA`
    - Save and then Activate the Rule.

### Import the template

1. Click Workflow > Workflows Console.
2. Click Templates.
3. Open the `Capture Document Signatures in Adobe Sign` template.
4. Click Add template.

### Configure Adobe Sign

1. Login into Adobe Sign.
2. Follow these instructions to [Create an Application](https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsignsdk/gstarted.html#createapp).
3. Select the newly created application and **View/Edit** and record the **Application ID** and **Client Secret**, we will use this later to setup the connection with Adobe Sign.
4. Follow these instructions to [Configure OAuth for Application](https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsignsdk/gstarted.html#oauth), with the following:
    - **Redirect URI**: Okta Workflows Preview and Prod respectively:
        - `https://oauth.workflows.oktapreview.com/oauth/httpfunctions/cb`
        - `https://oauth.workflows.okta.com/oauth/httpfunctions/cb`
    - **Enabled Scopes**:

| Enabled? | Scope         | Modifier | Description                                                   |
|----------|---------------|----------|---------------------------------------------------------------|
| Checked  | webhook_read  | Account  | View webhooks on behalf of any user in your account           |
| Checked  | webhook_write | Account  | Create or edit webhooks on behalf of any user in your account |

### Configure the workflow

1. On the Workflow Console, click Home.
2. Select the newly added folder.
3. Click `Tables (2)` -> `Adobe Sign Config`.
4. Add a new table record and paste the Adobe Sign Application Client ID.
5. Click `Home` -> `Flows (2)`.
6. To the right of the `01. Get.Agreement.Information` flow, click the gear icon, then click `API Access`.
7. Select `Expose as Webhook` and copy the `invoke URL` *(it's needed to create the Webhook)*.
8. Click `Home`.
9. Select `Setup.Create.AdobeSign.Webhook` and paste the `01. Get.Agreement.Information`’s invoke URL into the `Text - Compose` card labeled `Invoke URL`.
10. At the `API Connector - Get` card, add a new OAuth connection to Adobe Sign, using:
    - Authorize Path: `https://secure.<your_shard>.adobesign.com/public/oauth/v2`
        - Use the correct shard (na1, na2, au1, eu1, jp1) for the account that is being configured.
    - Access Token Path: `https://secure.<your_shard>.adobesign.com/oauth/v2/token`
        - Use the correct shard (na1, na2, au1, eu1, jp1) for the account that is being configured.
    - Scope: `webhook_write:account webhook_read:account`
    - Client Id: Adobe Sign Application Client ID.
    - Client Secret: Adobe Sign Application Client Secret.
11. Click Save.
12. Click Test to create the Webhook at Adobe Sign.  
    ***Note***: You can confirm the webhook configuration by going into Adobe Sign and navigating to `API -> Webhooks`, you should see an Okta Workflows webhook.
13. You can deactivate the `Setup.Create.AdobeSign.Webhook` flow after the execution.

### Testing this Flow

1. In Workflows, add the name of the agreement you are submitting to the `Adobe Sign Documents` table.  
    ***Note***: *This table is used to filter any document that should not be processed by Workflows. Before an agreement is parsed by Workflows the agreement name should be added to this table*.
2. In Adobe Sign, send an agreement for a user who already exists in Okta.
3. As the user, sign the agreement in Adobe Sign.
4. Back in Workflows, go to the `01. Get.Agreement.Information` flow and select Flow History. You should see an execution for the user.
5. Open the user profile in Okta. Confirm that the document signed attribute is populated and that the user is a member of the Under NDA group.

### Limitations & Known Issues

1. This flow does not support multiple signers in the same agreement, although you could easily extend this capability by iterating through all signers once the agreement is complete. In its current state, the flow only supports one signer as the main signer.