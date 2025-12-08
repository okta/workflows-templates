# Disable Entra ID Account — ISPM Remediation Flow

This document outlines a workflow designed to respond to security issues detected by Okta Identity Security Posture Management (ISPM) by disabling an Entra ID account. This workflow leverage Okta delegated Workflows to minimize security risks associated with privileged accounts.

## How It Works

1.  **Trigger:**
    * The flow is initiated by an ISPM event via Workflows integration (delegated flow), triggered when a security issue is detected.

2.  **Data Parsing:**
    * Within the delegated flow, the incoming event is parsed to extract:
        * **Product name** ("AAD").
        * **Username** (the user to be remediated).
        * **Issue title** ("Unused Admin Account", etc.)
        * Additional metadata (severity, category, remediation suggestion, etc.)

3.  **Data Assignment:**
    * Uses the `Assign` card to clearly map and store parsed values.

4.  **Conditional Logic:**
    * The `If`/`Else If` structure routes the flow based on values like `Product Name` and `Issue Title`.
    * The logic is fully customizable and must be configured by the implementer.
    * **Recommendation:** Build logic based on a combination of **Issue title** and **Affected product**.

## Prerequisites

Before deploying this flow, ensure you have:

* A working ISPM instance with Workflows integration configured.
* Access to Okta Workflows with appropriate permissions.
* A configured Okta SSO and Okta connector in ISPM.

## Setup Instructions

1.  Create and configure the flow in Okta Workflows.
2.  In ISPM, select the flow to trigger via Workflows integration (delegated flow) directly from the issue page.
3.  In this flow, adjust the conditions to fit your use case:
    * Add logic based on your ISPM detections.
    * For example:
        * `If Product Name == "AAD" and Title == "Unused Admin Account" → Trigger Disable Entra ID Account flow.`

## Best Practices

* Use consistent naming conventions for issue titles and products.
* Validate your Workflows integration with test events before enabling in production.
* Maintain a central table for mapping issue titles to flow names.

## Limitations

* Improperly configured conditions can result in missed remediations.
* Requires regular updates as detection logic in ISPM evolves.

## Disable Entra ID Account as a Response to ISPM Detection - Overview

Reducing the number of privileged local accounts helps minimize the attack surface. Using Okta Identity Security Posture Management (ISPM), security teams can detect local admin users or other risky accounts in Entra ID and automatically disable them using Okta Workflows.

This flow receives an ISPM issue event and disables the corresponding user in Microsoft Entra ID.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* A configured Azure Active Directory connector in Okta Workflows.
* Access to an Entra ID tenant with the **User Administrator** role or equivalent permissions to disable users.
* A configured Entra ID connector in ISPM.

## Setup Steps

1.  Configure the flow.
    * Open the **"Disable Entra ID User"** flow.
    * In the **Disable User Account** action card, specify your configured Azure Active Directory connector and ensure that it correctly identifies the user (usually via `Username`/`UPN` or `User Id`).

2.  Configured condition.
    * In this flow, configure a condition to include the necessary user information (like `Username` or `User Id`). For example, `If Product Name == "AAD" and Title contains "Unused Admin"`.

3.  Activate the flows.
    * Turn on the flow and save it.

## Testing the Flows

1.  Create a Test User in Entra ID. See [How to create, invite, and delete users](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users).

2.  Trigger the flow (through ISPM run on demand or Manual Run).
    * Ensure the event data matches the condition set in the flow to trigger this flow. Provide the test user's UPN.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Disable Entra ID User** flow.
    * Confirm that the execution was successful.
    * Go to your **Entra ID Console** and verify that the test user has been disabled.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included in the flows using **try/catch blocks**.
* This flow only disables the Entra ID account.