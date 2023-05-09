# Invalidate anomalous Slack sessions

## Overview

This workflow is designed for security operations teams to invalidate Slack sessions and notify admins when Slack detects anomalies associated with session hijacking.

The workflow periodically checks the Slack Risk Audit API for anomalous events, then filters through the results for specific security interest events. The workflow invalidates any Slack sessions associated with an anomalous event.

It is also configured to notify the organization's security operations team or Slack administrator of these events. They can investigate if the user was a victim of an account takeover.  

## Before you get Started / Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows enabled for your org
- An Enterprise Grid plan (licence) for Slack
- A Slack channel for sending notifications to your security team or Slack admins.

## Setup Steps

1. Create a Slack "app" to interact with Slack APIs using the Slack documentation: <https://api.slack.com/admins/audit-logs>

A Slack "app" interacts with the Slack API using a system account rather than a human user. Name your Slack App something like "Anomaly Detection Flow".

The app requires the following scopes in its settings:

- `auditlogs:read` - to read the Slack Audit API
- `chat:write` - to send a notification to the security operations team
- `admin.users:write` - to reset Slack sessions

1. Copy the User OAuth Token for this Slack application from the **App Settings > OAuth & Permissions**. This token is used in the "Header Value" field of the **API Connector** card when you create a connection in Okta Workflows.
2. Connect to your organization's Slack tenant on the first **API Connector - Get** card and enter the following:

| Field | Value |
| ------| ----- |
| Connection Nickname | Anomaly Detection Flow |
| Auth Type | Custom|
| Header Name | Authorization|
| Header Value | [The User OAuth Token retrieved from the Slack app. It typically begins with `Bearer xoxo-`] |

4. Connect all Slack cards in the flow using the same connection.
5. Set the frequency for how often you want the workflow to poll the Slack Audit API for anomalous events.
    1. Select the frequency in the **Scheduled Flow** card
    2. Select the same frequency in the **Date & Time - Subtract** card.
6. Evaluate what combination of anomalous events that you want to filter for any given user. The combinations chosen for this demonstration are for illustrative purposes only.
7. Insert the channel ID for the Slack channel that you want to notify into the **Object Construct** card. To find the ID for any channel in the Slack app, right-click on the channel and select **Copy > Copy Link**. The channel ID is the string in the last part of the path, and usually starts with a C. The same ID can be found in the URL if you open the Slack app in your browser and select the channel.
8. Finally, insert the same Channel ID in the **Error Handling** helper flow.

## Testing this Flow

Before testing, you may want to deliberately disable the first **API Connector Post** card that resets user sessions, and only test whether the flow works as configured to that point. One way to do this is to insert a **Continue If** card immediately before the **API Connector Post** card, and then configure it so that the flow could only continue under impossible conditions.

## Limitations & Known Issues

- Okta has no visibility into how the Slack Audit API identifies anomalous events and can't warrant that this Workflow identifies all malicious Slack activities.
- Slack has [published explanations](https://api.slack.com/admins/audit-logs-anomaly) for its reason codes.
- Users of this workflow should adjust the scheduling intervals, event filters, and messaging channels to those that best suit your organization.
