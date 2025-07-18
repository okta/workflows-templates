# Automated Unblocking of Bounced Okta Emails (via System Log Monitoring)

## Overview

This template automates the process of identifying and unblocking Okta user email addresses that have been added to Okta's internal bounce list. The main scheduled flow proactively searches Okta System Logs for events indicating email delivery failures. For each user identified through these logs, a helper flow is invoked to programmatically remove their email address from the bounce list using the Okta API. 

This automation helps ensure that users can receive important Okta communications by promptly addressing email bounces. 

See [How to unblock an email address from the Okta email address bounce list via API](https://support.okta.com/help/s/article/How-to-unblock-an-email-address-from-the-Okta-email-address-bounce-list-via-API?).


## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled for your org. 


## Setup Steps

1. Install the template into your Workflows environment. 
2. Set the run schedule.
    - Open the **Remove emails from bouncing** main flow and select the **Scheduled Flow trigger** card (the first card). Configure your desired `Interval`, `Start Time`, and other scheduling parameters. 

3. In the **Flow Control - Assign** card, replace the default value with your organization's URL in the **orgBaseUrl** field.

4. Set an Okta Connection for the **System Log Search** card.

5. Activate both flows. 


## Testing this Flow

Testing this flow requires actual email bounce events to be present in your Okta System Logs. 

1. Ideally, use a test user whose email address has genuinely hard-bounced recently and is recorded in the System Logs.
    - **Note**: Intentionally causing an email to bounce for testing is risky and might affect email reputation if not done carefully with test accounts. 

2. Check System Logs manually.
    - In your Okta Admin Console, go to **Reports** > **System Log**. 
    - Search for email bounce events to confirm events exist for your test users within the time window. You can filter using queries such as `eventType eq "system.email.bounce.blocked_email"`.

3. Configure the **Remove emails from bouncing** main flow to run more frequently (such as every 5 or 10 minutes). Also, ensure that its System Log query window is configured to include the time of your test bounce events. 

4. Execute the **Remove emails from bouncing** main flow and monitor the execution history. Verify it found the relevant System Log events and extracted the correct user IDs.
5. Check the helper flow execution history for invocations corresponding to your test user IDs.

6. Verify unblocking.
    -  After a successful unblock (204 status), attempt to trigger an Okta-generated email to the user's address. If the underlying email deliverability issue is resolved, the email is delivered. 

7. Once testing is complete, reset the main flow's schedule to its intended production frequency. 

## Limitations & Known Issues
- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-system-limits.htm).
- Error handling isn't addressed in this template.
- There can be a slight delay (from seconds to minutes) for events to appear in Okta System Logs. Configure your flow's search window accordingly. 
