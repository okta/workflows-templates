# Subscribe to Microsoft alerts to notify admins of potential security issues

## Overview

You can use a Microsoft alert subscription to manage your security surface across API endpoints, email, collaboration spaces, cloud apps, and user identities.

## Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows enabled.
- A configured Okta connection. See [Okta connector](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/okta.htm) for configuration steps.
- A configured Office 365 Admin connection.

## Procedure

1. Create the Microsoft security alert by executing the **1.0 Create Microsoft Subscription** flow.
2. After you create the Microsoft security alert subscription, Okta sends the alert payloads to the **2.0 Subscription API Endpoint** flow.

## Test the flow

1. Download [Tor Browser](https://www.torproject.org/download/).
2. Sign in to your Office 365 account at https://portal.office.com. This action triggers an anonymous login event. The security alert sends the payload of the event to the Workflows API endpoint.

## Limitations & Known Issues

- Keep in mind the [Okta Workflows system limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
