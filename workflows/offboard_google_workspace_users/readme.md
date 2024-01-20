# Offboard Google Workspace user

## Overview

This template performs several tasks in Google Workspace when offboarding a target user. These flows execute when a user is added to a specified Okta group. 

You can configure different actions for the Google Workspace user:

* **Mailbox Delegate**: Delegates the target user's Gmail mailbox to the target user's manager. The manager is defined in the Okta Universal Directory using the **Manager** attribute.
* **Mailbox Forward Emails**: Sets up forwarding on the target user's Gmail mailbox. All emails sent to that mailbox are automatically forwarded to the target user's manager.
* **Mailbox Auto-Reply**: Sets an auto-reply on the target user's Gmail mailbox to notify anyone who sends an email to this mailbox. The reply explains that the target user is no longer with the company and provides the employee manager's contact info.
* **Clear Okta User Sessions** (optional): When activated, automatically clears all the target user's Okta sessions.
* **Remove Google Workspace Licenses** (optional): When activated, removes all the Google Workspace licenses assigned to the target user.
* **Remove All User Google Workspace ASPs** (optional): When activated, removes all the **Application Specific Passwords** defined by the target user in Google Workspace.
* **Remove All User Devices in Google Workspace** (optional): When activated, removes all the devices registered to the target user in Google Workspace.
* **Remove All User Access Tokens in GSuite** (optional): When activated, removes all application **Access Tokens** associated with this user.  
* **Deactivate Google Workspace Directory User** (optional): When activated, the target user is automatically deactivated in the Google Workspace Directory.
* **Create Google Drive Transfer Request** (optional): When activated, this creates a request in Google Workspace to transfer the target user's Google Drive files and folders to the user's manager.
* **Create Calendar Transfer Request** (optional): When activated, this creates a request to transfer the target user's calendar to the user's manager.

## Prerequisites

Configure the following items before you run this template:

### Google Cloud Project and Service Account

Follow the instructions to [Authorize an Account for Transfer of Ownership Features](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/gmail/actions/transferofownership.htm).

### Other prerequisites

* Functioning connections for the Okta, GMail, Google Drive, Google Calendar, and Google Workspace Admin connectors.
* An existing Okta user (to represent the manager) where the **Okta - Primary Email** is the same as the user's Google Workspace username.
* An existing Okta user (to represent the target user) where the **Okta - Primary Email** is the same as the user's Google Workspace username. Set the manager attribute in the Okta Universal Directory to the username of the Okta user representing the manager.
* An existing Okta group to use as a trigger for this workflow when you add the Okta target user.
* (Optional): Federate your Google Workspace tenant with your Okta tenant where Okta Workflows is enabled.
  > If you don't federate your Google Workspace tenant with the Okta tenant, you need to configure a SWA (Secure Web Authentication) Google Workspace application inside the same Okta tenant where Okta Workflows is enabled.
* Add the Google Workspace application to an Okta group
  > **NOTE**: Don't use the Okta group you're using to trigger this workflow.
* Google Workspace attempts to automatically assign licenses to new users in the Google Workspace tenant. Turn this off so Workflows can manage Google Workspace licenses. To do this:
  1. Sign in to the Google Workspace Admin Console.
  1. Click **Billing**.
  1. On the **Billing** page:
    1. Add another license. When this guide was written, the **Android Management** license was free.
    1. After you add the additional license, you can turn off the setting to auto-assign licenses for everyone.

## Set up steps

1. Install the **Google Workspace Deprovisioning** template.
1. If required, authorize the connections to Google Workspace Admin, Gmail, Google Drive, and Okta.
1. Open **[MAIN FLOW] Google Workspace Offboarding**
1. Review the various deprovisioning features included in this flow. Enable or disable these features in the **Call Flow** card inside the **[MAIN FLOW] Google Workspace Offboarding** flow. Enable a feature by setting the name to **True**, otherwise set it to **False** to disable it. 
1. Click **Save** when done. 
1. Turn on the flow.
1. Open the other flows in the folder and ensure that you have selected the appropriate connections for each action card. Save any changes and turn on each flow.

## Testing the flow

1. Open your Workflows console and go to the **[MAIN FLOW] Google Workspace Offboarding** flow. Enter an Okta ID for a test user and click **Run**.
1. Click the **Execution History** tab and review the execution results to ensure the flow ran as expected. Repeat for the **[Helper] Google Workspace Offboarding Tasks** flow.

You can also confirm that the various deprovisioning actions you enabled during the configuration steps took place within Google.

#### User ASPs, Devices, Licenses, and Deactivation

* Sign in to admin.google.com and go to **Users**.
* Select the target user and confirm that the user status is **Inactive**.
* Confirm that there are no devices under **Managed Devices**.
* Validate that the number of application-specific passwords created in the **Application-specific password** section is `0`.
* Confirm that there are no licenses in the **Licenses** section.

#### Calendar Transfer

* Sign in to Google Workspace with the manager account and check that the target user's events are transferred to the manager's calendar.

#### Drive Transfer

* While still signed in as the manager, go to the Google Drive and confirm the presence of the target user's files and folders.

If the user hasn't been deactivated, you can also check:

#### Forwarding

* Sign into Gmail as the target user (if you didn't configure this to be deactivated).
* In **Settings** > **Forwarding and POP/IMAP** > **Forwarding**, confirm that you see the manager's address in the **Forward a copy of incoming mail to** section.

#### Delegation

* In the Gmail settings, go to the **Accounts** tab.
* Check that the manager has been granted access under in the **Grant access to your account** section.

#### Auto-Reply

* Click the **General** tab.
* Look in the **Vacation Responder** section and to confirm it's enabled.
* Validate that the subject and body for the auto-reply are updated.

## Limitations & Known Issues

This Okta Workflow template makes some assumptions about the target user:

* The target user doesn't have an existing forwarder for their GMail mailbox.
* The target user doesn't have an existing delegate for their GMail mailbox.
* The target user's Google account has a license to access Google Drive and GMail.
* The target user's manager Google account has a license to access GMail.
