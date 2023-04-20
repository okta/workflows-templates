# Detect suspicious MFA push notifications

## Overview

This template uses an event hook that triggers the workflow when Okta Verify sends a push notification.

This flow checks the geolocation (city, state, and country) of both the sign-in request (source) and the successful Okta Verify push (destination). If the city is different, the flow continues to gather information for a security team investigation.

You can easily modify this flow to notify other downstream applications based on business needs.

## Prerequisites

- Access to an Okta Identity Engine tenant with Okta Workflows enabled.
- Okta Verify enabled as an authentication factor.
- Event hook filtering enabled (this is an [open beta feature](https://help.okta.com/en/betas/Content/Topics/betas/open/event-hooks/eventhooks-main.htm)).

## Setup steps

### Activate flow and collect the Invoke URL

1. Activate the flow and click the `</>` icon on the **API Endpoint** event card.
2. Copy the **Invoke URL**. You need this to configure the event hook.

### Create event hook

1. In the Okta Admin console, go to **Workflow > Event Hooks** and click **Create Event Hook**.
2. Paste the **Invoke URL** into the **Endpoint URL** field. Provide a useful name for the hook (for example, `Filter Successful Okta Verify push notifications`)
3. In the **Select all events that apply** field, select **Authentication of User via MFA**.
4. Click **Create Hook & Continue**.
5. Check **Apply Filter**.
6. Use Expression Language for the filter. Copy and paste the following expression:

    `event.target.?[displayName eq 'Okta Verify'].size() > 0 && event.outcome.result eq 'SUCCESS'`

    This expression filters the event hook so the Workflow only runs after successful Okta Verify pushes.
7. Click **Save & Continue**. The event hook should have an **Active** status as verification is automatically handled for you.

## Testing

1. Sign in using an Okta Verify push to trigger the flow.

- If the city where the sign-in request originated (source) matches the city where the Okta Verify push was successful (destination), the sign-in action isn't suspicious and the flow ends.
- If the city where the sign-in request originated (source) doesn't match the city where the Okta Verify push was successful (destination), the flow composes a message for the security team to investigate further.

## Limitations & known issues

- Keep in mind the Okta Workflows [system limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits).
- This template doesn't address error handling.
