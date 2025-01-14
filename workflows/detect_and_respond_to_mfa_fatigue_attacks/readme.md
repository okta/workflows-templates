# MFA Fatigue Detection

This template contains two instruction sets, depending on which version of Okta you have.
- [Okta Identity Engine](#okta-identity-engine)
- [Okta Classic Engine](#okta-classic-engine)

## Okta Identity Engine

### Overview

This template shows you how to identify and automate responses to MFA fatigue attacks against your Okta org. 

MFA fatigue attacks work by flooding a user device with push MFA prompts. While users should reject all prompts that they didn't initiate, the attacker keeps sending these prompts until the user finally relents and accepts a prompt. After the user accepts the prompt, the attacker is granted a session with that user's credentials.

By default, Okta tracks all rejected push MFA prompts in the event log. This Workflow template triggers a response if it detects that a user has rejected five push MFA prompts in an hour. The rejection and time period thresholds can be easily tweaked in the template to meet your organization’s needs. If the criteria are met, this is a clear signal that an MFA fatigue attack is in progress, and this Workflow triggers actions to remediate the user and notify your SOC.

### Prerequisites

Before you get started, here are the things you need:

- Access to an **Okta Identity Engine** tenant with Okta Workflows enabled
- Access to a Slack tenant for notifications
- *Optional*: Turn on Event Hook Filters in your Okta org. This feature is in Early Access. See [Create an event hook with filters](https://help.okta.com/en-us/Content/Topics/automation-hooks/add-event-hooks.htm#Create).

### Procedure

1. Decide how you want to initiate the workflow. There are two ways to run this flow but only one method should be active at any given time:

    * **Event based** - The workflow fires for all `user.authentication.auth_via_mfa` events in Okta. The flow itself contains logic to filter out events that aren't rejections.

    * **Hook based** - Okta is configured with an event hook on the `Authentication of user via MFA` event. The event hook uses a filter (currently in Early Access) to filter the events fired by this hook with the reason `INVALID_CREDENTIALS` and a target of `Okta Verify`. 
    
        This Okta event hook calls out to a workflow configured as an API webhook only when it sees that reason for the event. This results in many fewer executions of the workflow. The workflow itself filters on the factor type of `OKTA_VERIFY_PUSH`, to filter out other failure modes of Okta Verify.

1. Configure the event hook (if using the **Hook based** method)
    
    To configure the event hook in Okta:

    * In the Okta Admin Console, go to **Settings > Features** and turn on the Early Access feature **Event Hook Filtering**.

    * In the Workflows Console, get the event hook URL information. Open the **Incoming Hook…** flow and click **Endpoint Settings** at the bottom of the **API Endpoint** starting card to get the invoke URL.

    * In the Okta Admin Console, you now need to configure an event hook:
        * Go to **Workflow > Event Hooks > Create Event Hook**.
        * Enter the endpoint URL.
        * Select the **Authentication of user via MFA** event and click **Create hook & Continue**
        * Under **Apply filters** enter the following:

            ```java
            event.target.?[type eq 'AuthenticatorEnrollment' && displayName eq 'Okta Verify'].size()> 0 && event.outcome.reason.contains('INVALID_CREDENTIALS')
            ```

        * Save the hook

1. Tune the thresholds for detection

    > You can modify the parameters for how long to look back at rejections for a given user and how many attempts need to be seen in that duration before triggering the remediation actions. Ideally these parameters should be tuned to reduce false positives, while allowing for a high detection rate.
    
    At the start of the main **OV MFA Rejection** workflow, there’s an **Assign** card for assigning these variables:

    | Parameter | Default Value | Description |
    | --- | --- | --- |
    | `hours` | 1 | How long (in hours) to look back for user rejection attempts |
    | `attempts` | 5 | How many attempts need to be seen for a given user during the configured interval to trigger an action |

1. Tune the thresholds for logging cleanup

    The flow pack purges the tables that it uses after a given interval. Configure these thresholds in the **Maintenance: Purge Log** flow's **Assign** card:

    | Parameter | Default Value | Description |
    | --- | --- | --- |
    | `log` | 1 | How many days to keep the main table entries |
    | `summary` | 7 | How many days to keep the summary table entries |


1. Modify the **Remediate: Take Action on User** flow to take the appropriate actions

    The template includes actions to suspend the user account and compose a Slack message to the SOC.
    
    Other remediation options: 
    
    * Create an incident or notify any on-call SOC resources through API calls to systems like PagerDuty or Slack.
    * Reset the user's password if you have determined that credentials are likely compromised.
    * Place the user into a 'high-risk' group that denies access to certain apps, or requires a phishing-resistant authenticator. This action requires you to set the appropriate authentication policies for that group.

### Testing the flow

Use the following procedure to test this flowpack in a non-production org:

1. Set up an app to require MFA:
    1. Go to **Security > Multifactor > Factor Types > Okta Verify** and enable the **Push Notifications** setting for your org
    1. Create an **MFA Fatigue Test** group in your Okta org.
    1. Add a test user to the **MFA Fatigue Test** group.
    1. Ensure that you have set up Okta Verify for the test user on a test mobile device.
    1. Modify the **Authentication Policy** to require Okta Verify when users in the **MFA Fatigue Test** group sign in to their Okta dashboard. Make this rule the top priority in the policy.
1. In the Workflows console, open the **OV MFA Rejection** flow, and click **Flow History** to monitor the flow capturing rejection events.
1. Try to authenticate to the Okta dashboard with your test user.
1. Tap the **No It's Not Me** option on the device where you configured Okta Verify.
1. Confirm that the rejection attempt gets logged in both the **summary failed attempts** and **all failed attempts** tables.
1. Repeat steps 3 and 4 until you reach the threshold set in the **OV MFA Rejection** flow.
1. Observe the remediation flow execution.


### Limitations & Known Issues

- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) to limit the entries in the **summary failed attempts** and **all failed attempts** tables. 

---

## Okta Classic Engine

### Overview

This template shows you how to identify and automate responses to MFA fatigue attacks against your Okta org. 

MFA fatigue attacks work by flooding a user device with push MFA prompts. While users should reject all prompts that they didn't initiate, the attacker keeps sending these prompts until the user finally relents and accepts a prompt. After the user accepts the prompt, the attacker is granted a session with that user's credentials.

By default, Okta tracks all rejected push MFA prompts in the event log. This Workflow template triggers a response if it detects that a user has rejected five push MFA prompts in an hour. The rejection and time period thresholds can be easily tweaked in the template to meet your organization’s needs. If the criteria are met, this is a clear signal that an MFA fatigue attack is in progress, and this Workflow triggers actions to remediate the user and notify your SOC.

### Prerequisites

Before you get started, here are the things you need:

- Access to an **Okta Classic Engine** tenant with Okta Workflows enabled
- Access to a Slack tenant for notifications

### Procedure

This Workflow runs on a five-minute schedule and polls the System Log for push MFA rejections. The detection thresholds can be modified to fit your organization's requirements. 

1. Tune the thresholds for detection

    > You can modify the parameters for how long to look back at rejections for a given user and how many attempts need to be seen in that duration before triggering the remediation actions. Ideally these parameters should be tuned to reduce false positives, while allowing for a high detection rate.
    
    At the start of the **1.1 Main: Summarize Data** flow, there’s an **Assign** card for assigning these variables:

    | Parameter | Default Value | Description |
    | --- | --- | --- |
    | `time interval` | 1 | How long (in hours) to look back for user rejection attempts |
    | `attempts` | 5 | How many attempts need to be seen for a given user during the configured interval to trigger an action |

1. Tune the thresholds for logging cleanup

    The flow pack purges the tables that it uses after a given interval. Configure these thresholds in the **2.1 Maintenance: Purge Log** flow's **Assign** card:

    | Parameter | Default Value | Description |
    | --- | --- | --- |
    | `log entries` | 1 | How many days to keep the main table entries |
    | `summary entries` | 7 | How many days to keep the summary table entries |


1. Modify the **1.4 Remediate: Take Action on User** flow to take the appropriate actions
    
    The template includes actions to suspend the user account and compose a Slack message to the SOC.
    
    Other remediation options: 
    
    * Create an incident or notify any on-call SOC resources through API calls to systems like PagerDuty or Slack.
    * Reset the user's password if you have determined that credentials are likely compromised.
    * Place the user into a 'high-risk' group that denies access to certain apps, or requires a phishing-resistant authenticator. This action requires you to set the appropriate authentication policies for that group.

### Testing the flow

Use the following procedure to test this flowpack in a non-production org:

1. Set up an app to require MFA:
    1. Go to **Security > Multifactor > Factor Types > Okta Verify** and enable the **Push Notifications** setting for your org
    1. Create an **MFA Fatigue Test** group in your Okta org.
    1. Add a test user to the **MFA Fatigue Test** group.
    1. Ensure that you have set up Okta Verify for the test user on a test mobile device.
    1. Add an **Okta Sign-on Policy** to target the **MFA Fatigue Test** group. Configure the rule in the policy to always require MFA at every sign in. Make this new sign-in policy the top priority for sign-in policies.
1. In the Workflows console, open the **0.2 Helper: Log MFA Failure** flow, and click **Flow History** to monitor the flow capturing rejection events.
1. Try to authenticate to the Okta dashboard with your test user.
1. Tap the **'No It's Not Me'** option on the device where you configured Okta Verify.
1. Confirm that the rejection attempt gets logged in both the **summary failed attempts** and **all failed attempts** tables.
1. Repeat steps 3 and 4 until you reach the threshold set in the **1.4 Remediate: Take Action on User** flow.
1. Observe the remediation flow execution.


### Limitations & Known Issues

- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) to limit the entries in the **summary failed attempts** and **all failed attempts** tables. 
