
# Entra ID - Add User to a Group — ISPM Remediation Flow

This document outlines a workflow designed to respond to security issues detected by Okta Identity Security Posture Management (ISPM) by adding user to a group (Entra ID). This workflow leverage Okta delegated Workflows to minimize security risks associated with privileged accounts, compromised credentials, and misconfigurations.

## How It Works

1.  **Trigger:**
    * The flow is initiated by an ISPM event via Workflows integration (delegated flow), triggered when a security issue is detected.

2.  **Data Parsing:**
    * Within the delegated flow, the incoming event is parsed to extract:
        * **Product name** ("AAD").
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
        * `If Product Name == "AAD" and Title == "No MFA - Admin Account" → Trigger Okta - add user to a group flow.`

## Best Practices

* Use consistent naming conventions for issue titles and products.
* Validate your Workflows integration with test events before enabling in production.
* Maintain a central table for mapping issue titles to flow names.

## Limitations

* Improperly configured conditions can result in missed remediations.
* Requires regular updates as detection logic in ISPM evolves.

## Entra ID - Add User to a Group as a Response to ISPM Detection - Overview

Using Okta Identity Security Posture Management (ISPM), security teams can detect risky Entra ID accounts and automatically add them to a specific Entra ID group using Okta Workflows. This group can be used within Entra ID Conditional Access policies to enforce Multi-Factor Authentication (MFA) or other controls.

This flow receives an ISPM issue event and adds the identified user to a designated group in Entra ID.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* A configured Azure Active Directory connector in Okta Workflows.
* An Entra ID group created for this purpose (e.g., "Require MFA for Risky Logins").
* The **Group Object ID** of the target Entra ID group.
* Entra ID Conditional Access policies configured to target the group for MFA enforcement or other actions.
* Administrator privileges in Entra ID to manage users and groups.
* A configured Entra ID connector in ISPM.

## Setup Steps

1.  Configure the flow.
    * Open the **Entra ID - Add user to a group (Enforce MFA / Enroll factors)** flow.
    * You may need a `Read User` card first to get the Entra ID User Object ID from the UPN.
    * In the **Add User to Group** action card, configure your Azure AD connection, provide the target **Group Object ID**, and use the **User Object ID** obtained in the previous step.

2.  Configured condition.
    * In this flow, configure a condition to include the necessary user information (like `Username`/`UPN`/`User Id`). For example, `If Product Name == "AAD" and Title contains "Risky Sign-in"`.

3.  Activate the flows.
    * Turn on the flow and save it.

## Testing the Flows

1.  Create a test user in Entra ID.
    * Add a test user to your Entra ID tenant who isn't currently in the target group.

2.  Trigger the flow (through ISPM run on demand or Manual Run).
    * Ensure the event data matches the condition set in the flow to trigger this flow. Provide the test user's UPN.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Entra ID - Add user to a group** flow.
    * Confirm that the execution was successful.
    * Go to your **Entra Admin Center**, find the target group, and verify the test user is now a member.
    * Optionally, test the login experience for the user to confirm Conditional Access policies apply as expected.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included using **try/catch blocks**.
* This flow only adds the user to the group; actual enforcement depends on correctly configured Conditional Access policies.
* Requires obtaining the User Object ID, as adding to a group typically requires the ID, not just the UPN.
* Assumes the parent flow correctly identifies and passes the target Entra ID username (UPN).