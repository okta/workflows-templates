# FastPass Enrollment Reminder Automation

## Overview
This template evaluates users’ enrollment status across multiple factors including **TOTP**, **Push**, **SMS**, **Okta TOTP**, and specifically **Okta FastPass**. It automatically notifies unenrolled users via Slack (pre-built), or can be configured for email or Microsoft Teams. The workflow features a simulation mode out-of-the-box. 

The **2.0 Campaign** runs without configuration, populating the **FastPass Campaign - Admin Notification** table to let you view results without sending alerts. The **2.1 Notification Sender** can be run in simulation mode to populate a **Notification Log** table, allowing you to audit the outreach logic before sending live messages.

## Prerequisites
Before you get started, here are the things you need:
*   Access to an Okta tenant with Okta Workflows enabled for your org.
*   Okta Verify with FastPass enabled in the org.
*   A user or group with the necessary permissions to configure Okta, Slack, Microsoft Teams, or email connectors.
*   Workflows connector for Okta Users API.

## Why this Workflow checks for signed_nonce: 
We do not just check if a user has "Okta Verify" enrolled. A user can be enrolled in Okta Verify (OTP) and still be vulnerable to phishing. This workflow specifically filters for users missing the signed_nonce factor, ensuring we can target users who have not yet upgraded to the Phishing Resistant (FastPass) flow.

## Setup Steps

1.  Configure Ingestion (1.0 & 1.1)
    1.  Open **1.0 FastPass Adoption**. On the **List Users with Search** card, click the connection icon and select or create your Okta connection.
    2.  Open **1.1 List Factors Helper**. On the **Custom API Action** card, select the same Okta connection you used in the previous step.
    3.  In **1.1 List Factors Helper**, locate the **Search Rows** card (used for checking excluded emails). Click the card and ensure it is targeting the **FastPass Campaign - Excluded Emails** table. If unconfigured or causing errors, re-select the table from the list.
    4.  Note that the **Clear Table** card in **1.0 FastPass Adoption** automatically targets the correct **FastPass Campaign - User Status** table on import.

2.  Configure Notification Strategy (2.1)
    - Open **2.1 Notification Sender**. This flow contains a **Try/If** block pre-loaded with Slack cards. Choose one of the following options:
        1.  Simulation Mode: Delete the entire **Try/If** block where the two Slack cards are located. This skips sending messages and populates the **Notification Log** table instead.
        2. Slack: Keep the **Try/If** block. Connect the **Read User** and **Send Direct Message** cards to your Slack connection.
        3. Email or Teams: Delete the Slack cards in the **Try/If** block and add your provider's **Send** card. Map the *Email* and *Message To Employee* fields from **Flow Start**.

3.  Enable and Schedule
    1.  Turn on the helper flows **1.1 List Factors Helper** and **2.1 Notification Sender**.
    2.  Turn on the parent flows **1.0 FastPass Adoption** and **2.0 Campaign**.
    3.  Configure the schedules by selecting the clock icon in the **Schedule Flow** cards for both parent flows.
    4.  Ensure **1.0 FastPass Adoption** runs well before **2.0 Campaign** (for example, 2:00 AM vs 9:00 AM) to allow data ingestion to complete.
    
    **Note:** You can run these sequentially. Enable **1.0** and **1.1** to ingest data, then turn them off before enabling **2.0** & **2.1** to execute the campaign.

4.  Optional Customizations
    1.  Modify target %: Open **2.0 Campaign**, locate the **If/Else** card, and change the default value of *95* to your desired adoption target.
    2.  Exclude users: Add the email addresses of VIPs or Executives to the **FastPass Campaign - Excluded Emails** table to prevent them from receiving notifications.
    3.  Customize message: Open **2.1 Notification Sender** and edit the **Text Compose** card to match your organization's tone.
    4.  Speed up simulation: If using simulation mode, you can delete the **Wait For** card in **2.1 Notification Sender** to process the list faster.
    5.  Admin Alerts: **2.0 Campaign** logs results to a table by default. You can add a **Send Message** card at the end of the flow to send these results to a real Admin channel.

## Testing this Flow
1.  With **1.0 FastPass Adoption** and **1.1 List Factors Helper** enabled, manually run **1.0 FastPass Adoption**.
2.  Open the **FastPass Campaign - User Status** table and verify that users are listed with their specific authenticator status (TOTP, FastPass, etc.).
3.  With **2.0 Campaign** and **2.1 Notification Sender** enabled, manually run **2.0 Campaign**.
4.  If running simulation (Slack deleted), open the **Notification Log** table to verify which users would have received a message.
5.  If running Slack, verify that the target users received the DM in Slack.

## Limitations & Known Issues
*   Wait For Card (1.1): The **Wait For** card in **1.1 List Factors Helper** is designed to protect Okta API rate limits. If you have a low user count, you may consider deleting this card to speed up ingestion, but only do so after testing in a non-production environment.
*   Wait For Card (2.1): The **Wait For** card in **2.1 Notification Sender** is included because Slack recommends a one second delay between messages. If running in simulation mode, you can delete this card.
*   Scheduling: **2.0 Campaign** (Outreach) can't start until **1.0 FastPass Adoption** (Ingestion) is completely finished. For large orgs, allow several hours between these flows.
*   Percentage Accuracy: The *Percent Complete* calculation in **2.0 Campaign** is based on the first 5,000 users retrieved. For larger orgs, this percentage is an estimate.
*   Data Verification: The API may return true for `token:software:totp` for both Google Auth and Okta Verify. The workflow includes logic to differentiate these. Rely on the calculated output rather than the raw API value.