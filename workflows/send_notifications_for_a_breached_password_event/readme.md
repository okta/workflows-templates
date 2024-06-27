# Send notifications for a breached password event

## Overview

This template provides a sample workflow to notify users when their credentials have appeared in a list of breached credentials. The Okta System Log records this as a [Breached Password](https://help.okta.com/oie/en-us/content/topics/security/breached-password-protection/about-breached-password-protection.htm) event.

The template uses an event hook to trigger an API endpoint and start the flow. Then it composes a notification message and sends it to your user through the Gmail and Slack connectors.

This template also serves as a useful reference guide for using event hooks alongside Okta Workflows. There are several scenarios where you may want to consider using event hooks rather than one of the built-in Okta [connectors](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/connector-reference.htm):

- If an event-hook eligible event is available but not yet built into a connector
- If a use case would benefit from [Event Hook Filtering](https://iamse.blog/2022/07/12/event-hook-filtering-and-okta-workflows/), a feature that isn't currently available in an Okta connector.

## Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows enabled for your org
- Authorized connectors for Slack and Gmail (or any other notification mechanism)

## Setup Steps

### Import and prepare the flows

Navigate to the **Templates** tab within the Okta Workflows Console and add the `Send Notifications for a Breached Password Event` template.

- The connectors in both flows must have valid connections.
  - For the **Close** card in the **Event Initiated Flow**, you can use a `No Auth` type connection.
- Select a Slack channel in the **If Error** section of the **Process event object** flow.
- After making any necessary changes, save both flows.
- Optional. To keep the data that passes through your flow, enable the **Save all data that passes through the Flow?** option. This data is helpful for the design and troubleshooting stages.
- In the **Event Initiated Flow**, click the **Endpoint settings** `</>` icon at the bottom of the **API Endpoint** card.
  - Copy the **Invoke URL**. You need this value to create the event hook.

### Create the Event Hook in the Admin Console

1. Open your Okta Admin Console and go to **Workflow > Event Hooks**.
1. Click **Create event hook**.
1. In the **Add hook details** dialog, fill in the following fields:
    1. **Name**: Give your event hook a memorable name, for example *Breached Passwords Notification*. You can optionally provide a description as well.
    1. **URL**: Paste in the **Invoke URL** that you copied for the API endpoint.
    1. In the **Subscribe to events** field, type `A credential,` and then select the event named `A credential, such as a password, which is associated with a known breach was used during an authentication flow`.
    1. Click **Save & Continue**.
    1. Continue to proceed and activate the hook.

Assuming the flows and hook are activated, everything is set up and the flow executes when a `security.breached_credential.detected` event occurs.

Optionally, you can modify or extend the **Process event object** flow for various other use cases.

- Change what the notifications say, who they're sent to, or what systems they're sent from
- Create tickets in downstream systems
- Add a user to an Okta group that is subject to more stringent policies

This template also serves as a useful starting point when you need to work with Okta Event Hooks.

## Testing this Flow

The only way that this flow can be invoked is when a `security.breached_credential.detected` event occurs and fires the associated event hook.

As the breached credential detection process is fully automated, there's no way to manually trigger one of these events. Instead, you can use a preview of the payload to test the flow.

> Note: It's possible to open the previously configured event hook and click **Deliver Request** on the **Preview** tab. This sends a sample event to the Workflows API endpoint.

Using a payload preview is a good way to test event hook flows for most cases. However, without an existing `security.breached_credential.detected` event in the System Log, the sample event preview lacks some necessary data, for example the `actor` object that appears in this Workflow template.

The following steps explain how to alter the provided JSON sample text to manually test your flow.

1. Copy the sample JSON into a text editor and modify the following values:
    - `actor.displayName`
        - This is the user's name for the notification message
        - Currently this is set as `Test User`
    - `actor.alternateId`
        - This is the email address where the message is sent 
        - The flow also uses this to look up the Slack User ID
        - Currently this is set as `test@example.com`
    - `displayMessage` 
        - This is the email subject line
1. Open the **Event Initiated Flow** in Workflows
1. Click **Run** and in the **body** input, paste the modified JSON text. Then click `Run` again.

<details>
<summary>Click here to expand Sample JSON</summary>

    {
        "eventType": "com.okta.event_hook",
        "eventTypeVersion": "1.0",
        "cloudEventsVersion": "0.1",
        "source": "https://vl2.okta1.com/api/v1/eventHooks/example",
        "eventId": "example",
        "data": {
            "events": [
                {
                    "uuid": "exampleID1234",
                    "published": "2024-06-17T22:00:56.423Z",
                    "eventType": "security.breached_credential.detected",
                    "version": "0",
                    "displayMessage": "test@example.com - Credential set matches to known compromised credentials.",
                    "severity": "WARN",
                    "client": {
                        "userAgent": {
                            "rawUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                            "os": "Mac OS X",
                            "browser": "CHROME"
                        },
                        "zone": "null",
                        "device": "Computer",
                        "id": null,
                        "ipAddress": "555.555.55.5",
                        "geographicalContext": {
                            "city": null,
                            "state": null,
                            "country": null,
                            "postalCode": null,
                            "geolocation": {
                                "lat": 55.55,
                                "lon": -111.55
                            }
                        },
                        "ipChain": [
                            {
                                "ip": "555.555.55.5",
                                "geographicalContext": {
                                    "city": null,
                                    "state": null,
                                    "country": null,
                                    "postalCode": null,
                                    "geolocation": {
                                        "lat": 55.55,
                                        "lon": -111.55
                                    }
                                },
                                "version": "V4",
                                "source": null
                            }
                        ]
                    },
                    "device": null,
                    "actor": {
                        "id": "exampleOktaID12345",
                        "type": "User",
                        "alternateId": "test@example.com",
                        "displayName": "Test User",
                        "detailEntry": null
                    },
                    "outcome": {
                        "result": "SUCCESS",
                        "reason": null
                    },
                    "target": [
                        {
                            "id": "exampleID1234",
                            "type": "AuthenticatorEnrollment",
                            "alternateId": "unknown",
                            "displayName": "Password",
                            "detailEntry": null
                        }
                    ],
                    "transaction": {
                        "type": "WEB",
                        "id": "exampleID1234",
                        "detail": {}
                    },
                    "debugContext": {
                        "debugData": {
                            "authnRequestId": "exampleID1234",
                            "deviceFingerprint": "exampleFingerprint1234",
                            "behaviors": "{New Geo-Location=UNKNOWN, New Device=UNKNOWN, New IP=UNKNOWN, New State=BAD_REQUEST, New Country=BAD_REQUEST, Velocity=UNKNOWN, New City=BAD_REQUEST}",
                            "requestId": "exampleID1234",
                            "dtHash": "exampleHash1234",
                            "risk": "{reasons=Anomalous Location, Anomalous Device, level=HIGH}",
                            "requestUri": "/idp/idx/challenge/answer",
                            "targetEventHookIds": "exampleID1234",
                            "url": "/idp/idx/challenge/answer?"
                        }
                    },
                    "legacyEventType": null,
                    "authenticationContext": {
                        "authenticationProvider": null,
                        "credentialProvider": null,
                        "credentialType": null,
                        "issuer": null,
                        "authenticationStep": 0,
                        "rootSessionId": "exampleID1234",
                        "externalSessionId": "exampleID1234",
                        "authenticatorContext": null,
                        "interface": null
                    },
                    "securityContext": {
                        "asNumber": null,
                        "asOrg": null,
                        "isp": null,
                        "domain": null,
                        "isProxy": null
                    },
                    "insertionTimestamp": null
                }
            ]
        },
        "eventTime": "2024-06-17T22:01:21.809026Z",
        "contentType": "application/json"
    }
</details>

## Limitations & Known Issues

- [Event Hooks concepts](https://developer.okta.com/docs/concepts/event-hooks/)
- [Workflows System Limits](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-system-limits.htm)