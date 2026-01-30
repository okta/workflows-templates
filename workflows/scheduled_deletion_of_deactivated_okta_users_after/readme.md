# Scheduled Deletion of Deactivated Okta Users (after X Days)

## Overview

This template automates the identification and deletion of Okta users who have been in a deprovisioned status for a specified number of days (30 days by default). 

You can configure the schedule for the process. It uses the user's `statusChanged` attribute to determine eligibility for deletion. 

The main flow identifies the target users and streams them to a separate helper flow. Configure the helper flow to perform the user deletion action. This solution helps maintain your Okta environment by removing users who have remained deactivated beyond a defined retention period.  


## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled for your org. 


## Setup Steps

After installing this template, follow these steps to configure it: 

1. Configure the run schedule.
    - In the **Okta - Scheduled Flow** trigger card, set your desired `Interval` (such as daily or weekly), `Start Time`, and any other relevant scheduling parameters like timezone or days of the week. 
2. Set the deletion threshold (number of days) in the **Flow Control: Assign** card that defines the `daysToWaitBeforeDelete` variable. 
    - Modify the `value` field from the default 30 days to your desired number of days a user should remain in deprovisioned status before they're considered for deletion.

3. Configure the Okta connection in the **List Users with Search** card 

4. In the **Delete Deactivated Users after x Days - Helper** flow, delete the **Branching - Continue If** card after testing the flow.
This card stops the flow before the delete user action is performed. 


5. Activate the main scheduled flow and the deletion helper flow in the Okta Workflows console. 

## Testing this Flow

1. In your test Okta tenant, identify or create a few test users. Manually deactivate these test users. Note the date and time of deactivation. Ensure their `statusChanged` timestamps reflect these deactivation times. 

2. Temporarily set the `daysToWaitBeforeDelete` variable in the main flow to a small value that aligns with your test data.

3. Open the main scheduled flow and click the **Run** button. This executes the flow once immediately, ignoring its defined schedule, for testing purposes.

4. Check the execution history for the main scheduled flow. Verify it identified the correct test users. Check the execution history for your deletion helper Flow. Verify it was invoked for each identified user and that the deletion card executed successfully. 
5. In the Okta Admin Console, search for your test users to ensure that they're deleted. 

6. After successful testing, reset the `daysToWaitBeforeDelete` variable in the main flow back to your desired production value, such as 30 days. Ensure that the schedule is correctly set for production runs.

## Limitations & Known Issues
- Keep in mind the Okta Workflows system limits.
- Error handling isn't addressed in this template.
