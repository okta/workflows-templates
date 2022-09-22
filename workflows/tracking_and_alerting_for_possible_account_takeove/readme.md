# Tracking and Alerting for Possible Account Takeover Attempts in Okta

## Overview

A main vector for fraud comes from Account Takeovers, achieved from resetting passwords or changing levels of access to privileged accounts. Dynamically monitoring and responding to these two vectors with automated flows greatly reduces the risk of these costly attacks.

This template illustrates how Okta Workflows can be used to automate responses to help combat ATOs and mitigate risk with self service and help desk-based account recovery. The template watches user password and MFA factor reset and activation events to determine if the user's account is under threat of an account takeover attempt (ATO). At a high level, the template:

1. Checks MFA Factor reset events for suspicious activity. In particular it checks to see if the actor who initiated the reset is different from the account owner. For example, if the reset was performed by an Okta Administrator (potentially a member of the help desk staff) instead of the user, the template will take the following actions:
    1. All of the user's active identity provider sessions will be cleared, and optionally all of their OAuth refresh and access tokens will be revoked.
    2. The user will be placed in a temporary group for a "cooling off" period, during which time any further MFA factor activity will be more closely scrutinized by the template.
    3. Details about the event will be logged in a Workflows Table.
2. During the cool-off period (which is configured in a workflows Table), any addtional password or factor operations for a user who is a member of the temporary MFA Monitoring group are monitored.
3. If the activity indicates a potential account takeover attempt (see #1 below) the following actions are taken:
    1. All of the user's active identity provider sessions will be cleared, and optionally all of their OAuth refresh and access tokens will be revoked.
    2. An alert message is composed and sent to the Slack channel specified in the configuration table. The Slack message contains details about the most recent event, a list of all of ther factors that have been reset during the monitoring period, and a hyperlink to the Okta Admin Console SysLog page with a query that will list *all* factor and password activity for the user from 10 minutes before the very first monitored event until the current time. The addtional 10 minute window is to capture the event(s) that lead up to this user being placed in the monitoring group.
4. A scheduled flow runs every 24 hours and scans the MFA Monitoring table to see if any users can be removed from the monitoring group. Any user who's most recent entry is past the monitoring end period can be removed from the monitoring group and their entries can be deleted from the table.
  
(*#1*) A key indicator of a potential account takeover attempt is an actor activating a factor of lower assurance than a factor that has previously been deactivated. For example, if an actor other than the user deactivated Okta Verify then any other lower-assurance factor such as SMS is activated, the template will treat that as a suspicous event and alert the Slack channel.

## Before you get Started / Prerequisites

Before you get started, here are the things you’ll need:

-   Access to an Okta tenant with Okta Workflows enabled for your org.
-   An Okta Group to temporarily contain users who are being monitored for suspecious MFA activity, e.g., "MFA Monitoring". 
-   A test Okta user for which you will activate and deactivate various MFA factors for testing. You will need to be able to register multiple factor types, including SMS, Okta Verify, etc.

## Setup Steps

### 1. Update the Configuration Table

The "Configuration" table is used to store variables used by the flows in this Template. Open this table and update the following columns:

| Column | Description |
| :--- | :---|
| mfaMonitoringGroupId | ID of the group you are using to contain users who are being monitored. |
| monitoringDuration | An integer that determines how long users' MFA activity will be monitored. By default, this is the number of `days` you wish to monitor users. |
| alertSlackChannelId | The Slack channel ID of the Slack channel you will send alerts to. You can obtain the channel ID by right-clicking on the channel within the Slack app, clicking on `View channel details` and scrolling to the bottom of the window to see the ID |
| active | True/False flag to indicate that this row of the table is the active configuration. Make sure this is set to `true` |
| revokeTokens | The **Okta - Clear User Sessions** card is used by this template to clear a user's sessions if suspicious MFA activity is detected. The card takes a True/False parameter `Revoke oauthTokens`, which will also revoke any refresh and access tokens issued to the user. Enter `true` here to revoke tokens. |
| oktaTenantUrl | This is the full name and domain of your Okta tenant, excluding the `https://`. For example `myorg.oktapreview.com` |
| reportingTimeZone | The time zone string for the time zone you wish to use when querying Okta's SysLog for MFA event history, e.g., `America/Los_Angeles` |

### 2. Import the CSV File to the `Factor Assurance Levels` Table

The *Factor Assurance Table* is a lookup table that allows us to compare the relative assurance level of various factor, so that we can determine if the user is activating a factor that is less secure than a factor that was previously deactiated on their account. The various factor activated and deactivated events that are processed by this template will include details about the factor involved, which we can use to look up the assurance level of that factor from the table. *Note* that the factor assurance table may not be complete. If you are using factor types that are not represented in the table, feel free to update the table to reflect those factors.

1. Open the **Factor Assurance Table**.
2. Click on the `Import` button at the top of the page.
3. Choose the file `factorAssuranceLevels.csv` that was included with this template and complete the import.

## Testing this Template

To test this template, it can be helpful to be logged into the Okta Admin Console as an administrator in one browser window and as our test user in another browser (in Incognito mode). Remember that the triggering event that will cause a user to be placed into the temporary monitoring group is when one of the user's active MFA factors is reset by someone other than the user, e.g., the user's factor might be reset by helpdesk personnel. 

1.  Ensure that the test user has Okta Verify or some other high-assurance factor activated.
2.  From the Okta Admin Console, navigate the test user and click on `More Actions` then `Reset Authenticators`.
3.  Select one of the user's active authenticators, and click `Reset Selected Authenticator`. Because a factor was reset by someone other than the test user themselves, the user's sessions will be cleared (and OAuth tokens optionally revoked), the user will be placed in our MFA Monitoring group and the event will be logged in the **MFA Events** table. **Note**: to test the complete functionality of this template, be sure to deactivate a higher-assurance factor such as Okta Verify or Touch ID.
4.  Verify that the event was logged in the *MFA Events* table with relevant details about the factor that was deactivated, the actor who caused the event, and the factor itself.
5.  Verify that the user is a member of our MFA Monitoring group.
6.  In an Incognito browser window, log into Okta as the test user. 
7.  Navigate to Settings and set up SMS for the user by clicking on *Phone* `Set Up` and following the instructions. The test user should be a member of the MFA Monitoring group because of the activity in previous steps. Because of that, the template will check to see if the factor that you just activated (SMS) is a lower assurance factor than *any* factor that was previously reset and logged in the **MFA Monitoring** table. If it is, then an alert will be composed and sent to the Slack channel you specified in the **Configuration** table. 
8.  Verify that you recieved the Slack alert message.
9.  Click on the hyperlink in the Slack alert to view an Okta SysLog query detailing all MFA and password related events during the monitoring period.
10. (optional) After the `duration` specified in the **Configuration** table, a scheduled flow will check to see if the user can be removed from the **MFA Monitoring** group and will clear the user from the tracking table.
11.  Repeat and vary the steps above to test different scenarios, i.e., different actors resetting and registering factors, different sequences of factors of different assurance levels being reset and activated, etc.

## Limitations & Known Issues

This is where you might note to the customer any known issues, edge
cases, or gotchas as they think about using the flow in a real-life
scenario.

-   This template was developed, tested, and documented on an Okta tenant running OIE. Configuration and testing steps may be different on Okta Classic.
-   The list of factor-types in the **Factor Assurance Levels** table is incomplete. You should review flow history to ensure any addtional factors that you have enabled on your Okta org are represented in the table.
