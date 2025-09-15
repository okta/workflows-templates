# Process Batched Okta Events from an Event Hook

## Overview

This template provides a way for reliably processing events sent by an Okta event hook, especially when multiple events are batched into a single API call to your workflow endpoint. Okta event hooks can deliver a payload containing an array of individual event objects. 

This template uses a main flow to receive the entire batch, parse it, extract the common batch identifier (`eventId`) and the list of individual events. It then iterates through each event, calling a helper flow to process each one. The example helper flow demonstrates how to access key information from each event (like its unique `uuid`, `eventType`, and `displayMessage`) and logs these details, along with the batch `eventId`, to an Okta Workflows table. 

This illustrates a foundational pattern that can be customized for various event-driven automation tasks. 


## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled for your org. 


## Setup Steps

After installing these templates, follow these steps to configure them:

1. Implement the desired logic to process each individual event. This could include the following: 
- Sending notifications to Slack, email, or other systems.
- Calling other Okta APIs to update user profiles or manage group memberships.
- Interacting with third-party app APIs or conditional logic based on `eventType` or other event data.

2. Activate both steps

## Testing this Flow

1. Enter any necessary data for the API Endpoint event and click **Run**.
2. A **Flow Inputs** dialog displays. Provide the following:
- **Current ISO Date/Time (Text)**: Enter the current date and time in ISO 8601 format
- **headers (Object)**: For basic testing, you can provide an empty JSON object: `{}`
- **query (Object)**: You can often provide an empty JSON object: `{}`
- **body (Object)**: This is the most critical input for manual testing. The **Parse JSON** card in the flow expects a JSON string.
    - Example `body` JSON structure:

        ```{"eventId":"b7dfcf40-0fb6-47d4-b74e-972ea15974c1","eventTime":"2024-05-26T10:30:00.000Z","eventTypeVersion":"1.0","cloudEventsVersion":"0.1","source":"[https://your-okta-domain.okta.com](https://your-okta-domain.okta.com)","contentType":"application/json","data":{"events":[{"uuid":"a1a1a1a1-1111-2222-3333-444444444444","published":"2024-05-26T10:29:59.000Z","eventType":"user.lifecycle.created","version":"0","displayMessage":"User created","severity":"INFO","client":{},"actor":{"id":"00uExampleUser1","type":"User","alternateId":"user1@example.com","displayName":"User One"},"target":[{"id":"00uExampleUser1","type":"User","alternateId":"user1@example.com","displayName":"User One","detailEntry":null}]},{"uuid":"b2b2b2b2-5555-6666-7777-888888888888","published":"2024-05-26T10:30:00.000Z","eventType":"user.lifecycle.activated","version":"0","displayMessage":"User activated","severity":"INFO","client":{},"actor":{"id":"00uExampleUser2","type":"User","alternateId":"user2@example.com","displayName":"User Two"},"target":[{"id":"00uExampleUser2","type":"User","alternateId":"user2@example.com","displayName":"User Two","detailEntry":null}]}]}}```

2. Check the main flow execution history. Verify that it was triggered. If manually run, check the inputs that you provided were accepted. If triggered by an event hook, inspect the received `body`. Confirm the `eventId` and `eventsList` were correctly extracted by the **Parse JSON** and **Object: Get** cards. Ensure the **List: For Each** card executed for each event in your test `body`. 

3. Check the helper flow execution history. You should see one execution for each event. Verify the `event` and `eventId` inputs were correctly received by the helper. If using the example table logging, check your Okta Workflows table for new rows. Note: While testing with the example body structure shared above, since it isn't known if the event was successful or not, the `event` and `eventId` are added to the table.

4. Test with an actual event hook. Ensure the Okta event hook is configured and points to your main flow's active API endpoint. In Okta, perform actions that generate the events your hook is subscribed to. Try to perform several actions quickly to encourage batching. Monitor the flow histories as described above and ensure the `event` and `eventId` is added to the table.

## Limitations & Known Issues
- Keep in mind the Okta Workflows System Limits.
- Error handling isn't addressed in this template.