# Automated Security Remediation Workflows for ISPM Detections via Delegated Flow

This document outlines various workflows designed to respond to security issues detected by Okta Identity Security Posture Management (ISPM). These workflows leverage Okta delegated Workflows to minimize security risks associated with privileged accounts, compromised credentials, and misconfigurations.

The general architecture follows a **Main Flow + Helper Flows** model:
1.  **ISPM Event Routing Flow (Main Flow):** Receives ISPM event notifications via Workflows integration (delegated flow), parses the event data, and uses conditional logic to route the event to the appropriate helper flow.
2.  **Remediation Helper Flows:** Each helper flow is designed to perform a specific remediation action on a target platform such as Okta, Microsoft Entra ID, Google Workspace, or Salesforce.

The helper flows included here primarily focus on two types of remediation:
* **User Suspension/Deactivation:** Temporarily suspending or deactivating user accounts identified as risky such as unused admin accounts or compromised accounts.
* **Adding User to a Group:** Assigning users to specific security groups to enforce stricter policies, such as requiring Multi-Factor Authentication (MFA) or enrolling additional factors.

Each section below details a specific flow, including its purpose, prerequisites, setup instructions, testing procedures, and known limitations.

---
---

# 1. ISPM Event Routing Flow

## Overview

This flow acts as a routing mechanism for ISPM-detected issues. It receives an event from ISPM via Workflows integration (delegated flow), extracts key values from the incoming payload, and routes the event to the appropriate remediation helper flow based on customizable logic.

It allows organizations to run on demand remediation based on the type of issue and the product where it originated like Okta, Entra ID, or Google Workspace.

## How It Works

1.  **Trigger:**
    * The flow is initiated by an ISPM event via Workflows integration (delegated flow), triggered when a security issue is detected.

2.  **Data Parsing:**
    * Within the delegated flow, the incoming event is parsed to extract:
        * **Product name** ("Okta", "AAD", "Google Workspace").
        * **Username** (the user to be remediated).
        * **Issue title** ("No MFA - Admin Account", "Old Password", "Unused Admin Account")
        * Additional metadata (severity, category, remediation suggestion, etc.)

3.  **Data Assignment:**
    * Uses the `Assign` card to clearly map and store parsed values.

4.  **Conditional Logic:**
    * The `If`/`Else If` structure routes the flow based on values like `Product Name` and `Issue Title`.
    * The logic is fully customizable and must be configured by the implementer.
    * **Recommendation:** Build logic based on a combination of **Issue title** and **Affected product**.

5.  **Helper Flow Triggering:**
    * Based on the matched condition, a specific helper flow is called to perform the remediation action.

## Prerequisites

Before deploying this flow, ensure you have:

* A working ISPM instance with Workflows integration (delegated flow) configured.
* Access to Okta Workflows with appropriate permissions.
* All remediation helper flows created and activated.
* A set of defined routing rules based on your ISPM detection logic.
* A configured Okta SSO and Okta connector in ISPM.

## Setup Instructions

1.  Create and configure the parent flow in Okta Workflows.
2.  In ISPM, select the parent flow to trigger via Workflows integration (delegated flow) directly from the issue page.
3.  In this flow, adjust the conditions to fit your use case:
    * Add logic based on your ISPM detections.
    * For example:
        * `If Product Name == "Okta" and Title == "No MFA - Admin Account" → Trigger MFA group flow.`
        * `If Product Name == "AAD" and Title == "Unused Admin Account" → Trigger disable Entra ID user flow.`
5.  In each condition, call the relevant helper flows.

## Testing the Flow

1.  Create a test issue in ISPM targeting a test user.
2.  Ensure that the issue triggers the parent flow.
3.  Confirm the following:
    * Fields are parsed correctly.
    * Conditions evaluate properly.
    * The intended helper flow is triggered.
4.  Review the execution logs and helper flow output.

## Best Practices

* Clearly label each branch with its intent for maintainability.
* Use consistent naming conventions for issue titles and products.
* Validate your Workflows integration with test events before enabling in production.
* Maintain a central table for mapping issue titles to helper flow names.

## Limitations

* Doesn't include actual remediation logic. Helper flows must be configured separately.
* Improperly configured conditions can result in missed remediations.
* Requires regular updates as detection logic in ISPM evolves.

---
---

# 2. Suspend Okta Account as a Response to ISPM Detection

## Overview

Minimizing privileged accounts helps reduce security risks by limiting unauthorized access.
Using Okta Identity Security Posture Management (ISPM), security teams can detect risky Okta accounts, assess their security posture, and automatically suspend them using Okta Workflows.

This helper flow receives an Okta ISPM issue event (forwarded by the main routing flow) and suspends the user in Okta.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* Admin privileges in Okta to manage users.
* A configured Okta connector in ISPM.
* The **ISPM Event Routing** flow set up to call this helper flow based on relevant ISPM issue criteria.

## Setup Steps

1.  Configure the helper flow.
    * Open the **"Suspend Okta User"** helper flow.
    * Ensure that the **Suspend User** action card is configured to use the appropriate Okta connection and identify the user correctly (usually through `Username` or `User Id` passed from the main flow).

2.  Link from parent flow.
    * In the **"ISPM Event Routing** flow, configure a condition to call this helper flow, passing the necessary user information (like `Username` or `User Id`). For example, `If Product Name == "Okta" and Title contains "Risky Account"`.
    

3.  Activate the flow.
    * Turn on both the parent and this helper flow.

## Testing the Flows

1. Add a test user to your Okta tenant.

2.  Trigger the main flow (through ISPM Test Event or Manual Run)
    * Ensure the event data matches the condition set in the main flow to trigger this helper flow. Provide the test username.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Suspend Okta User** flow.
    * Confirm that the execution was successful.
    * Go to your **Okta Admin Console** and verify that the test user has been suspended.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included in the helper flows using **try/catch blocks**.
* This helper flow is responsible for suspending the user in Okta and does not interact with other platforms like Entra ID.
* Assumes the parent flow correctly identifies and passes the target Okta username or user ID.

---
---

# 3. Disable Entra ID Account as a Response to ISPM Detection

## Overview

Reducing the number of privileged local accounts helps minimize the attack surface. Using Okta Identity Security Posture Management (ISPM), security teams can detect local admin users or other risky accounts in Entra ID and automatically disable them using Okta Workflows.

This helper flow receives an ISPM issue event (forwarded by the main routing flow) and disables the corresponding user in Microsoft Entra ID.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* A configured Azure Active Directory connector in Okta Workflows.
* Access to an Entra ID tenant with the **User Administrator** role or equivalent permissions to disable users.
* A configured Entra ID connector in ISPM.
* The **ISPM Event Routing** flow set up to call this helper flow based on relevant ISPM issue criteria.

## Setup Steps

1.  Configure the helper flow.
    * Open the **"Disable Entra ID User"** helper flow.
    * In the **Disable User Account** action card, specify your configured Azure Active Directory connector and ensure that it correctly identifies the user (usually via `Username`/`UPN` or `User Id` passed from the main flow).

2.  Link from parent flow.
    * In the **ISPM Event Routing** flow, configure a condition to call this helper flow, passing the necessary user information (like `Username` or `User Id`). For example, `If Product Name == "AAD" and Title contains "Unused Admin"`.

3.  Activate the flows.
    * Turn on both the parent and this helper flow.

## Testing the Flows

1.  Create a Test User in Entra ID. See [How to create, invite, and delete users](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users).

2.  Trigger the main flow (through ISPM Test Event or Manual Run).
    * Ensure that the event data matches the condition set in the main flow to trigger this helper flow. Provide the test user's UPN.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Disable Entra ID User** flow.
    * Confirm that the execution was successful.
    * Go to your **Entra ID Console** and verify that the test user has been disabled.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included using **try/catch blocks**.
* This helper flow only disables the Entra ID account.
* Assumes the parent flow correctly identifies and passes the target Entra ID username (UPN).

---
---

# 4. Deactivate Salesforce User as a Response to ISPM Detection

## Overview

Minimizing privileged accounts helps reduce security risks. Using Okta Identity Security Posture Management (ISPM), security teams can detect risky Salesforce accounts and automatically deactivate them using Okta Workflows.

This helper flow receives an ISPM issue event (forwarded by the main routing flow) and deactivates the user in Salesforce.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* A configured Salesforce connector in Okta Workflows.
* Admin privileges in Salesforce to manage users and API access.
* A configured Salesforce connector in ISPM.
* The **ISPM Event Routing** flow set up to call this helper flow based on relevant ISPM issue criteria.

## Setup Steps

1.  Configure the helper flow.
    * Open the **"Deactivate Salesforce User"** helper flow.
    * Ensure that the **Update User** (or similar) action card used for deactivation is configured with your Salesforce connector and correctly identifies the user (usually via `Username` passed from the main flow) and sets the `IsActive` field to `false`.

2.  Link from parent flow.
    * In the **ISPM Event Routing** flow, configure a condition to call this helper flow, passing the necessary user information (like `Username` or `User Id`). For example, `If Product Name == "Salesforce" and Title contains "Risky Account"`.

3.  Activate the flows.
    * Turn on both the parent and this helper flow.

## Testing the Flows

1.  Create a test user in Salesforce.
    * Add an active test user to your Salesforce account.

2.  Trigger the main flow.
    * Ensure that the event data matches the condition set in the main flow to trigger this helper flow. Provide the test Salesforce username.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Deactivate Salesforce User** flow.
    * Confirm that the execution was successful.
    * Go to your **Salesforce Admin Console** and verify that the test user has been deactivated.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included using **try/catch blocks**.
* Deactivation in Salesforce might have licensing implications or prevent data access depending on your configuration.
* Assumes the parent flow correctly identifies and passes the target Salesforce username.

---
---

# 5. Suspend Google Workspace User as a Response to ISPM Detection

## Overview

Minimizing privileged accounts helps reduce security risks. Using Okta Identity Security Posture Management (ISPM), security teams can detect risky Google Workspace accounts and automatically suspend them using Okta Workflows.

This helper flow receives an ISPM issue event (forwarded by the main routing flow) and suspends the user in Google Workspace.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* A configured Google Workspace connector in Okta Workflows with appropriate scopes, such as `https://www.googleapis.com/auth/admin.directory.user`.
* Admin privileges in Google Workspace to manage users.
* A configured Google Workspace connector in ISPM.
* The **ISPM Event Routing** flow set up to call this helper flow based on relevant ISPM issue criteria.

## Setup Steps

1.  Configure the helper flow.
    * Open the **"Suspend Google Workspace User"** helper flow.
    * Ensure that the **Update User** action card is configured with your Google Workspace connector, identifies the user correctly (usually through `Primary Email` passed from the main flow), and sets the `Suspended` field to `true`.

2.  Link from parent flow.
    * In the **ISPM Event Routing** flow, configure a condition to call this helper flow, passing the necessary user information (like `Primary Email`/`Username`/`User Id`). For example, `If Product Name == "Google Workspace" and Title contains "Risky Account"`.

3.  Activate the flows.
    * Turn on both the parent and this helper flow.

## Testing the Flows

1.  Create a test user in Google Workspace.
    * Add an active test user to your Google Workspace account.

2.  Trigger the Main Flow (through ISPM Test Event or Manual Run).
    * Ensure that the event data matches the condition set in the main flow to trigger this helper flow. Provide the test user's primary email address.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Suspend Google Workspace User** flow.
    * Confirm that the execution was successful.
    * Go to your **Google Admin Console** and verify that the test user has been suspended.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included using **try/catch blocks**.
* Suspending a user prevents login and email access but does not delete the account or data immediately.
* Assumes the parent flow correctly identifies and passes the target Google Workspace primary email.

---
---

# 6. Okta - Add User to a Group as a Response to ISPM Detection

## Overview

Using Okta Identity Security Posture Management (ISPM), Security Teams can detect risky Okta accounts (e.g., admins without MFA) and automatically add them to a specific Okta group using Okta Workflows. This group can be configured to enforce Multi-Factor Authentication (MFA) or trigger factor enrollment policies.

This helper flow receives an ISPM issue event (forwarded by the main routing flow) and adds the identified user to a designated group in Okta.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* An Okta group created for this purpose (e.g., "Enforce MFA on Risky Admins").
* The **Group ID** of the target Okta group.
* Okta policies configured to enforce MFA or factor enrollment for members of the target group.
* Administrator privileges in Okta to manage users and groups.
* A configured Okta connector in ISPM.
* The **ISPM Event Routing** flow set up to call this helper flow based on relevant ISPM issue criteria.

## Setup Steps

1.  Configure the helper flow.
    * Open the **Okta - Add user to a group (Enforce MFA / Enroll factors)** helper flow.
    * In the **Add User to Group** action card, configure your Okta connection, provide the target **Group ID**, and ensure it correctly identifies the user (usually through `User ID` or `Username` passed from the main flow). You might need a `Read User` step first if only the username is passed.

2.  Link from parent flow.
    * In the **ISPM Event Routing** flow, configure a condition to call this helper flow, passing the necessary user information (like `Username` or `User ID`). For example, `If Product Name == "Okta" and Title == "No MFA - Admin Account"`.

3.  Activate the flows.
    * Turn on both the parent and this helper flow.

## Testing the Flows

1.  Create a Test User in Okta.
    * Add a test user to your Okta tenant who is *not* currently in the target group.

2.  Trigger the Main Flow (via ISPM Test Event or Manual Run).
    * Ensure the event data matches the condition set in the main flow to trigger this helper flow. Provide the test username or ID.

3.  Verify execution and results.
    * Open the **Execution History** tab in this **Okta - Add user to a group** flow.
    * Confirm that the execution was successful.
    * Go to your **Okta Admin Console**, find the test user, and verify they are now a member of the target group.
    * Optionally, test the sign-in experience for the user to confirm MFA/enrollment is prompted as expected.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
* Error handling is included using **try/catch blocks**.
* This flow only adds the user to the group; the actual MFA/enrollment enforcement depends on correctly configured Okta policies targeting that group.
* Assumes the parent flow correctly identifies and passes the target Okta user identifier.

---
---

# 7. Entra ID - Add User to a Group as a Response to ISPM Detection

## Overview

Using Okta Identity Security Posture Management (ISPM), security teams can detect risky Entra ID accounts and automatically add them to a specific Entra ID group using Okta Workflows. This group can be used within Entra ID Conditional Access policies to enforce Multi-Factor Authentication (MFA) or other controls.

This helper flow receives an ISPM issue event (forwarded by the main routing flow) and adds the identified user to a designated group in Entra ID.

## Prerequisites

Before you begin, ensure that you have:

* Access to an Okta tenant with Okta Workflows enabled.
* A configured Azure Active Directory connector in Okta Workflows.
* An Entra ID group created for this purpose (e.g., "Require MFA for Risky Logins").
* The **Group Object ID** of the target Entra ID group.
* Entra ID Conditional Access policies configured to target the group for MFA enforcement or other actions.
* Administrator privileges in Entra ID to manage users and groups.
* A configured Entra ID connector in ISPM.
* The **ISPM Event Routing** flow set up to call this helper flow based on relevant ISPM issue criteria.

## Setup Steps

1.  Configure the helper flow.
    * Open the **Entra ID - Add user to a group (Enforce MFA / Enroll factors)** helper flow.
    * You may need a `Read User` card first to get the Entra ID User Object ID from the UPN passed by the main flow.
    * In the **Add User to Group** action card, configure your Azure AD connection, provide the target **Group Object ID**, and use the **User Object ID** obtained in the previous step.

2.  Link from parent flow.
    * In the **ISPM Event Routing** flow, configure a condition to call this helper flow, passing the necessary user information (like `Username`/`UPN`/`User Id`). For example, `If Product Name == "AAD" and Title contains "Risky Sign-in"`.

3.  Activate the flows.
    * Turn on both the parent and this helper flow.

## Testing the Flows

1.  Create a test user in Entra ID.
    * Add a test user to your Entra ID tenant who isn't currently in the target group.

2.  Trigger the main flow (through ISPM Test Event or Manual Run).
    * Ensure the event data matches the condition set in the main flow to trigger this helper flow. Provide the test user's UPN.

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

---
---


# 8. Okta - Reset User Password Upon Next Login as a Response to ISPM Detection

## Overview

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

1. Set Up the parent flow.

   * Open the **ISPM Event** parent flow.
   * In ISPM, trigger a workflow via Workflows integration (delegated flow) directly from the issue page.
   * Enable automation and select **Compromised Okta Account** or a similar issue title as the trigger.

2. Configure the helper flow.

   * Open the **Okta - Reset User Password Upon Next Login** helper flow in a new tab.
   * Ensure the **Reset Password** action is configured to:

     * Use the correct `username` or `user ID`.
     * Force the user to change their password on next sign-in.
   * Confirm that the **Create Row** card includes the relevant input fields to log event details.

3. Activate the flows.

   * Turn on both the parent and helper flows.

## Testing the Flows

1. Create a test user in Okta.

   * Add a test user to your Okta tenant.

2. Run the parent flow.

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
* Two tables are used in the helper flows: one for ISPM events and one for error logging.
* The parent flow’s branching logic determines whether to invoke this helper flow based on the ISPM issue type.