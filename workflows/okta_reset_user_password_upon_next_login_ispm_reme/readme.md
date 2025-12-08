# Okta - Reset User Password Upon Next Login — ISPM Remediation Flow

This document outlines a workflow designed to respond to security issues detected by Okta Identity Security Posture Management (ISPM) by reseting user password upon next login (Okta). This workflow leverage Okta delegated Workflows to minimize security risks associated with privileged accounts, compromised credentials, and misconfigurations.

## How It Works

1.  **Trigger:**
    * The flow is initiated by an ISPM event via Workflows integration (delegated flow), triggered when a security issue is detected.

2.  **Data Parsing:**
    * Within the delegated flow, the incoming event is parsed to extract:
        * **Product name** ("Okta").
        * **Username** (the user to be remediated).
        * **Issue title** ("Old Password - Admin Account", etc.)
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
        * `If Product Name == "Okta" and Title == "Old Password - Admin Account" → Trigger Okta - reset user password upon next login flow.`

## Best Practices

* Use consistent naming conventions for issue titles and products.
* Validate your Workflows integration with test events before enabling in production.
* Maintain a central table for mapping issue titles to flow names.

## Limitations

* Improperly configured conditions can result in missed remediations.
* Requires regular updates as detection logic in ISPM evolves.

## Okta - Reset User Password Upon Next Login as a Response to ISPM Detection - Overview

Resetting passwords for compromised or risky accounts helps reduce the risk of unauthorized access.
Using Okta Identity Security Posture Management (ISPM), security teams can detect suspicious Okta accounts and automatically reset their passwords using Okta Workflows. This reset action forces users to change their password upon their next login.

This template receives an Okta ISPM issue and resets the user’s password in Okta.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* Administrator privileges in Okta to manage users and perform password resets.
* A configured Okta connector in ISPM.
* A logging table in Okta Workflows to capture remediation actions.

## Setup Steps

1. Configure the flow.

   * Open the **Okta - Reset User Password Upon Next Login** flow.
   * In ISPM, trigger a workflow via Workflows integration (delegated flow) directly from the issue page.
   * Enable automation and select **Compromised Okta Account** or a similar issue title as the trigger.

2. Configured condition.

   * Open the **Okta - Reset User Password Upon Next Login** flow.
   * Ensure the **Reset Password** action is configured to:

     * Use the correct `username` or `user ID`.
     * Force the user to change their password on next sign-in.
   * Confirm that the **Create Row** card includes the relevant input fields to log event details.

3. Activate the flows.

   * Turn on the flow and save it.

## Testing the Flows

1. Create a test user in Okta.

   * Add a test user to your Okta tenant.

2.  Trigger the flow (through ISPM run on demand or Manual Run).

   * Open the **ISPM Event** flow.
   * Click **Run** in the toolbar.
   * In the **Run dialog**, provide the necessary headers, body, and query values.
   * Copy the example schema from the Okta ISPM documentation and replace `eventdata.affectedEntity.displayname` with your test username.
   * Click **Run**.

3. Verify execution and results.

   * Open the **Execution History** tab in the **Okta - Reset User Password Upon Next Login** flow.
   * Confirm that the execution was successful.
   * Go to your **Okta Admin Console** and verify that the test user’s password was reset and marked for change upon next login.
   * Check the logging table to ensure that the remediation event was recorded.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included in the helper flow using **try/catch blocks**.
* The **Okta - Reset User Password Upon Next Login** helper flow is specific to Okta and does not interact with other systems like Entra ID or Google Workspace.
* Success depends on a correctly configured connector and valid usernames.
* Two tables are used in the flows: one for ISPM events and one for error logging.