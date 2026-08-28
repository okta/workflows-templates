# Remove Bounced Emails with Custom API Action

## Overview

When Okta can't deliver an email to a user — due to an invalid address or a receiving server rejection — that address is added to Okta's internal bounce list. Once on this list, the user doesn't receive any further Okta emails, including password resets, MFA enrollment prompts, and admin notifications, until the address is manually removed. This template provides an on-demand flow to remove one or more email addresses from Okta's bounce list using the Remove Bounced Emails API (bulkRemoveEmailAddressBounces) called via **Okta - Custom API Action** card in Okta Workflows.

## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled.
2. An Okta connection in Workflows with the okta.orgs.manage scope granted under Authorization settings.

## Setup Steps

After installing this template, follow these steps:

1. Grant the required scope: The **Custom API Action** card requires the `okta.orgs.manage` scope to call the Remove Bounced Emails API.
    - In the Okta Workflows console, go to **Connections** and open your Okta connection. 
    - Click the **Authorization** tab. 
    - Go to the the custom scopes section and add `okta.orgs.manage`. 
    - Click Save.
    - See [Okta Workflows Authorization Help](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/okta/overviews/authorization.htm) for detailed guidance. 
    - Ensure the Custom API Action card is using this Okta connection.

2. Add email addresses.
-  Open the flow and locate the **List - Construct** card at the start of the flow. 
- Enter each email address you want to remove from the bounce list as a separate list item.
- Note: For larger lists, you can replace the **List - Construct** card with a card that reads from a hosted or manually imported CSV file, Google Sheets, or an AWS S3 bucket.

3. Activate the flow.

## Testing this Flow
1. Identify a test user whose email address is on the Okta bounce list. You can verify this by attempting to send them an Okta-generated email and checking for delivery failures, or by querying the bounce list via the API.

2. Add the test email address to the **List - Construct** card.

3. Run the flow manually and open Execution History in the Workflows console.

4. Confirm the **Custom API Action** card returns a `204 - No Content` status, which indicates the address was successfully removed.

5. To verify end-to-end, trigger an Okta-generated email to the address.
 - Navigate to the user in **Admin Console** > **Directory** > **People**.
 -  Select the user, and use **Send Email**.
 - If the underlying deliverability issue is resolved, the email should now be delivered.

6. Remove the test email address from the **List - Construct** card once testing is complete.


## Limitations & Known Issues

- Manual input required: This template doesn't automatically detect bounced addresses. Email addresses must be known and entered manually (or sourced from an external list).
- Keep in mind the Okta Workflows System Limits.
- Error handling is not addressed in this template.
