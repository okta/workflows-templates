# Suspend Okta Account — ISPM Remediation Flow

This document outlines a workflow designed to respond to security issues detected by Okta Identity Security Posture Management (ISPM) by suspending an Okta account. This workflow leverage Okta delegated Workflows to minimize security risks associated with privileged accounts.

## How It Works

1.  **Trigger:**
    * The flow is initiated by an ISPM event via Workflows integration (delegated flow), triggered when a security issue is detected.

2.  **Data Parsing:**
    * Within the delegated flow, the incoming event is parsed to extract:
        * **Product name** ("Okta").
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
        * `If Product Name == "Okta" and Title == "Unused Admin Account" → Trigger Suspend Okta Account flow.`

## Best Practices

* Use consistent naming conventions for issue titles and products.
* Validate your Workflows integration with test events before enabling in production.
* Maintain a central table for mapping issue titles to flow names.

## Limitations

* Improperly configured conditions can result in missed remediations.
* Requires regular updates as detection logic in ISPM evolves.

## Suspend Okta Account as a Response to ISPM Detection - Overview

Minimizing privileged accounts helps reduce security risks by limiting unauthorized access.
Using Okta Identity Security Posture Management (ISPM), security teams can detect risky Okta accounts, assess their security posture, and automatically suspend them using Okta Workflows.

This flow receives an Okta ISPM issue event and suspends the user in Okta.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* Admin privileges in Okta to manage users.
* A configured Okta connector in ISPM.

## Setup Steps

1.  Configure the flow.
    * Open the **"Suspend Okta User"** flow.
    * Ensure that the **Suspend User** action card is configured to use the appropriate Okta connection and identify the user correctly (usually through `Username` or `User Id`).

2.  Configured condition.
    * In this flow, configure a condition to include the necessary user information (like `Username` or `User Id`). For example, `If Product Name == "Okta" and Title contains "Unused Account"`.
    

3.  Activate the flow.
    * Turn on the flow and save it.

## Testing the Flows

1. Add a test user to your Okta tenant.

2.  Trigger the flow (through ISPM run on demand or Manual Run)
    * Ensure the event data matches the condition set in the flow to trigger this flow. Provide the test username.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Suspend Okta User** flow.
    * Confirm that the execution was successful.
    * Go to your **Okta Admin Console** and verify that the test user has been suspended.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included in the flows using **try/catch blocks**.
* This flow is responsible for suspending the user in Okta and does not interact with other platforms like Entra ID.