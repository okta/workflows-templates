# Suspend Google Workspace User — ISPM Remediation Flow

This document outlines a workflow designed to respond to security issues detected by Okta Identity Security Posture Management (ISPM) by suspending a Google Workspace user. This workflow leverage Okta delegated Workflows to minimize security risks associated with privileged accounts.

## How It Works

1.  **Trigger:**
    * The flow is initiated by an ISPM event via Workflows integration (delegated flow), triggered when a security issue is detected.

2.  **Data Parsing:**
    * Within the delegated flow, the incoming event is parsed to extract:
        * **Product name** ("Google Workspace").
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
        * `If Product Name == "Google Workspace" and Title == "Unused Admin Account" → Trigger suspend Google Workspace user flow.`

## Best Practices

* Use consistent naming conventions for issue titles and products.
* Validate your Workflows integration with test events before enabling in production.
* Maintain a central table for mapping issue titles to flow names.

## Limitations

* Improperly configured conditions can result in missed remediations.
* Requires regular updates as detection logic in ISPM evolves.

## Suspend Google Workspace User as a Response to ISPM Detection - Overview

Minimizing privileged accounts helps reduce security risks. Using Okta Identity Security Posture Management (ISPM), security teams can detect risky Google Workspace accounts and automatically suspend them using Okta Workflows.

This flow receives an ISPM issue event and suspends the user in Google Workspace.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* A configured Google Workspace connector in Okta Workflows with appropriate scopes, such as `https://www.googleapis.com/auth/admin.directory.user`.
* Admin privileges in Google Workspace to manage users.
* A configured Google Workspace connector in ISPM.

## Setup Steps

1.  Configure the flow.
    * Open the **"Suspend Google Workspace User"** helper flow.
    * Ensure that the **Update User** action card is configured with your Google Workspace connector, identifies the user correctly (usually through `Primary Email`), and sets the `Suspended` field to `true`.

2.  Configured condition.
    * In this flow, configure a condition to include the necessary user information (like `Primary Email`/`Username`/`User Id`). For example, `If Product Name == "Google Workspace" and Title contains "Risky Account"`.

3.  Activate the flows.
    * Turn on the flow and save it.

## Testing the Flows

1.  Create a test user in Google Workspace.
    * Add an active test user to your Google Workspace account.

2.  Trigger the main flow (through ISPM run on demand or Manual Run).
    * Ensure the event data matches the condition set in the flow to trigger this flow. Provide the test user's primary email address.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Suspend Google Workspace User** flow.
    * Confirm that the execution was successful.
    * Go to your **Google Admin Console** and verify that the test user has been suspended.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included using **try/catch blocks**.
* Suspending a user prevents login and email access but does not delete the account or data immediately.