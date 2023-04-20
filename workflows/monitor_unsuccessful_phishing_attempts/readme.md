# Monitor unsuccessful phishing attempts

## Overview

This template uses an event hook that triggers the workflow when a phishing attempt is unsuccessful.

The flow sends the IP address of the phishing site and the affected user to a Slack channel for further investigation.

## Prerequisites

- Access to an Okta tenant with Okta Workflows enabled.
- Okta Verify enabled as an authentication factor.
- Event hook filtering enabled (this is an [open beta feature](https://help.okta.com/en/betas/Content/Topics/betas/open/event-hooks/eventhooks-main.htm)).
- A Slack connection configured within Workflows

## Setup steps

### Activate flow and collect the Invoke URL

1. Open the **Phishing Attempt Failed** flow.
2. In the **Slack** card at the end of the flow, select the channel where Workflows should send the notifications.
3. Activate the flow and click the `</>` icon at the bottom of the **API Endpoint** event card.
4. Copy the **Invoke URL**. You need this to configure the event hook.

### Create event hook

1. In the Okta Admin Console, go to **Workflow > Event Hooks** and click **Create Event Hook**.
2. Paste the **Invoke URL** into the **Endpoint URL** field. Provide a helpful event hook name (example: `Phishing blocked`).
3. For **Select all events that apply** scroll down the list of events and select **Authentication of user via MFA**.
4. Click **Create Hook & Continue**.
5. Check **Apply Filter**.
6. In the **Expression Language** text box, copy and paste the following expression:

   `event.outcome.reason eq "FastPass declined phishing attempt"`.

   This invokes the Workflow only during an unsuccessful phishing attempt.
7. Click **Save & Continue**. The event hook created should have an **Active** status because verification for Workflows endpoints is handled automatically.

## Testing

1. When a user logs in using Okta FastPass on a phishing site, the user is shown a `Suspicious page blocked` message.
2. The **Phishing Attempt Failed** workflow executes, sending a message to the configured Slack channel containing the IP address of the phishing site and the username.

## Limitations & known issues

- Keep in mind [Workflows system limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits).
- This template doesn't address error handling.
