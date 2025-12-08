# Okta - Add User to a Group — ISPM Remediation Flow

This document outlines a workflow designed to respond to security issues detected by Okta Identity Security Posture Management (ISPM) by adding user to a group (Okta). This workflow leverage Okta delegated Workflows to minimize security risks associated with privileged accounts, compromised credentials, and misconfigurations.

## How It Works

1.  **Trigger:**
    * The flow is initiated by an ISPM event via Workflows integration (delegated flow), triggered when a security issue is detected.

2.  **Data Parsing:**
    * Within the delegated flow, the incoming event is parsed to extract:
        * **Product name** ("Okta").
        * **Username** (the user to be remediated).
        * **Issue title** ("No MFA - Admin Account", etc.)
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
        * `If Product Name == "Okta" and Title == "No MFA - Admin Account" → Trigger Okta - add user to a group flow.`

## Best Practices

* Use consistent naming conventions for issue titles and products.
* Validate your Workflows integration with test events before enabling in production.
* Maintain a central table for mapping issue titles to flow names.

## Limitations

* Improperly configured conditions can result in missed remediations.
* Requires regular updates as detection logic in ISPM evolves.

## Okta - Add User to a Group as a Response to ISPM Detection - Overview

Using Okta Identity Security Posture Management (ISPM), Security Teams can detect risky Okta accounts (e.g., admins without MFA) and automatically add them to a specific Okta group using Okta Workflows. This group can be configured to enforce Multi-Factor Authentication (MFA) or trigger factor enrollment policies.

This flow receives an ISPM issue event and adds the identified user to a designated group in Okta.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* An Okta group created for this purpose (e.g., "Enforce MFA on Risky Admins").
* The **Group ID** of the target Okta group.
* Okta policies configured to enforce MFA or factor enrollment for members of the target group.
* Administrator privileges in Okta to manage users and groups.
* A configured Okta connector in ISPM.

## Setup Steps

1.  Configure the flow.
    * Open the **Okta - Add user to a group (Enforce MFA / Enroll factors)** flow.
    * In the **Add User to Group** action card, configure your Okta connection, provide the target **Group ID**, and ensure it correctly identifies the user (usually through `User ID` or `Username`). You might need a `Read User` step first if only the username is passed.

2.  Configured condition.
    * In this flow, configure a condition to include the necessary user information (like `Username` or `User ID`). For example, `If Product Name == "Okta" and Title == "No MFA - Admin Account"`.

3.  Activate the flows.
    * Turn on the flow and save it.

## Testing the Flows

1.  Create a Test User in Okta.
    * Add a test user to your Okta tenant who is *not* currently in the target group.

2.  Trigger the Flow.
    * Ensure the event data matches the condition set in the flow to trigger this flow. Provide the test username or ID.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Okta - Add user to a group** flow.
    * Confirm that the execution was successful.
    * Go to your **Okta Admin Console**, find the test user, and verify they are now a member of the target group.
    * Optionally, test the sign-in experience for the user to confirm MFA/enrollment is prompted as expected.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included using **try/catch blocks**.
* This flow only adds the user to the group; the actual MFA/enrollment enforcement depends on correctly configured Okta policies targeting that group.