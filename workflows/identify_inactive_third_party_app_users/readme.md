# Identify inactive third-party app users

## Overview

Identifying inactive users of SaaS applications managed within Okta is a great way to maintain a principle of least privilege. By searching for inactive users (based on previous sign-in data), you can perform any remediation actions required by your company policies. This information also shows what expensive application licences aren't in use and can be canceled or reassigned.

This template searches for users of a given application who haven't signed in during a specified time window and adds those users to an Okta group.

## Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows
- Okta Identity Governance (OIG) enabled on your Okta tenant

## Setup Steps

1. Open each flow and confirm that all connectors have an active connection.
1. In the **Discover and review inactive users** flow:
   1. Fill out the **App Name**, **Inactive Group**, and **Days since last login** fields on the **Assign** card.
   1. Click the clock icon at the bottom of the **Schedule Flow** card, and configure the schedule. Example: `Run Flow every 3 months at 9am on the 18th`
   1. Click **Save** to confirm your changes.
   - Note: If the group specified doesn't exist, the flow creates one for you.
1. In the **Detect Group-Assigned Revocation** flow, fill out the **oktaOrg** and **Preview or Prod** fields, based on your specific Okta org environment. For example, if your Okta org is `exampleorg.oktapreview.com`, the **oktaOrg** is `exampleorg` and **Preview or Prod** is `oktapreview.com`. Click **Save** to confirm your changes.
1. Enable each flow.
1. Grant certification scopes on the Okta Workflow OAuth App:
   1. In your Okta Admin Console, go to **Applications > Applications**.
   1. Select the **Okta Workflows OAuth** application.
   1. Click the **Okta API Scopes** tab.
   1. Select **Grant** next to the following scopes:
      - `okta.governance.accessCertifications.manage`
      - `okta.logs.read`
1. Reauthorize your Okta connector to levarge the additional scopes granted.
1. Optional. Create a group to store inactive users:
   1. In the Admin Console, go to **Directory > Groups**.
   1. Click **Add Group**.
   1. Enter a **Name** and an optional **Description** to represent the inactive users for a specific application (for example `Inactive Users - Zoom`).
   1. Click **Save**. This group is needed later to set up an Identity Governance (IG) certification campaign.
   - Note: If you don't create a group, the workflow creates one for you, using the name specified in the **Discover and review inactive users** flow.
1. Create a certification campaign:
   1. Sign in to the Admin Console as an admin with the super admin role or the IG Access Certifications Admin role.
   1. Click **Identity Governance > Access Certifications**.
   1. Click **Create campaign**.
   1. Select **Resource Campaign**.
   1. Enter a **Resource campaign name** and **Description** (for example, `Recertify Inactive Zoom Users`).
   1. Set the desired start and duration for the campaign.
   1. Check the **Make this recurring** checkbox.
   1. Set the desired frequency for the campaign to run. **Make sure the Start Date/Time and Recurring schedule align with the Flow Schedule (step 2.2), so the flows complete before the campaign launches.**
   1. Click **Next**.
   1. In the **Resources** tab, select **Applications** in the **Type** field, and the appropriate application (for example, `Zoom`) in the **Select applications** field. This should be the same Application that was entered in the **Discover and review inactive users** flow (step 2.1).
   1. Click **Next**.
   1. In the **Users** tab, select **Specify user scope**.
   1. Enter the following expression in the **Scope users** field:
      - `user.isMemberOf({'group.profile.name': 'Inactive Users - Zoom'})`
        > Adjust the group name in the expression to match the group that you entered in the **Discover and review inactive users** flow (step 2.1).
   1. If any Okta users require an exclusion exception from the campaign, select the **Exclude users from the campaign** checkbox. Enter the users to exclude.
   1. Click **Next**.
   1. On the **Reviewer** tab, select one or more reviewers for this campaign.
   1. Configure any desired **Notifications** or **Additional Settings**.
   1. Click **Next**.
   1. On the **Remediation** tab, configure the desired actions to take when the reviewer revokes access or doesn't respond.
   1. Click **Schedule Campaign**.
1. To review the results of the Access Certification campaign:
   1. Click **Reports > Reports**
   1. In the Access Certification campaigns, click **Past Campaign Summary**.
   1. Select the campaign created to review the access decisions and the remediation actions.
1. To review group-provisioned users:
   1. Open the connected Slack instance configured in your Workflow template. Go to the channel you selected as the destination for automated messages. There you can find the users where the access decision was to revoke access but had conflicting Okta group rules.
   1. Review these users to find out the steps needed to deprovision access individually, or to adjust group rules and application assignments.

## Testing this Flow

1. Run the "Discover and review inactive users" flow.
1. Review the Okta group for new members. If there are users who have been provisioned to the application but haven't accessed it in the last 90 days, they're added to the Okta group.
1. Launch the Certification campaign.
1. After Access Certification decisions have been made, check the designated Slack channel for any group-provisioned user decisions.

## Limitations & Known Issues

* Users who are assigned to an application through a group rule aren't automatically deprovisioned based on the Access Certification revocation decision.
* If there are applications with duplicate names within your Okta org, this may result in the wrong application ID being used in the workflow.
* For applications with long-lived session tokens, the status telemetry for inactive users may not be accurate.
