# Scheduled Deactivation of Suspended Okta Users (after X Days)

## Overview

This Okta Workflows solution automates the process of deactivating Okta users who have remained in a *SUSPENDED* status for a specified number of days. This helps enforce user lifecycle policies by ensuring that users suspended for an extended period are moved to a deactivated state.  

The main flow runs on a configurable schedule and uses the user's `statusChanged` attribute to determine if they're eligible for deactivation. Identified users are then streamed to a dedicated helper flow, which is responsible for performing the actual deactivation action through an Okta API call. The helper flow includes a configurable safety check to prevent accidental deactivations during testing. 


## Prerequisites

Before you get started, you need:

1. Access to an Okta tenant with Okta Workflows enabled for your org. 


## Setup Steps

1. Install the template into your Workflows environment. 

2. Configure the run schedule.
    - In the **Okta - Scheduled Flow** trigger card, set your desired `Interval` (such as daily or weekly), `Start Time`, and any other relevant scheduling parameters like timezone or days of the week. 

3. Set the **Deletion Deactivation Threshold (Number of Days)** in the flow control.
    - Assign a card that defines the `numberofDays` variable. Modify the `value` field to the desired number of days a user should remain in *DEPROVISIONED* status before they're considered for deactivation.

4. Configure an Okta connection in the **List Users with Search** card.

5. Activate both the main scheduled flow and the deactivation helper flow. 

**Note**: In the **Deactivate Suspended Users after x Days - Helper** flow, the **Branching - Continue If** card stops flow before the deactivate user action is performed. After testing the flow, ensure that this card is deleted to ensure that user deactivation occurs. 


## Testing this Flow

1. In your test Okta tenant, identify or create a few test users. Manually suspend these test users. Note the date and time of suspension. Ensure their `statusChanged` timestamps reflect these deactivation times. 

2. Temporarily set the `numberOfDays` variable in the main flow to a small value that aligns with your test data.

3. Open the main scheduled flow and click the **Run** button. This executes the flow once immediately, ignoring its defined schedule, for testing purposes.

4. Check the execution history for the main scheduled flow. Verify it identified the correct test users. Check the execution history for your deactivation helper flow. Verify it was invoked for each identified user and that the deactivation card executed successfully.
 
5. In the Okta Admin Console, search for your test users to ensure that they're deactivated.

6. **Important**: After successful testing, reset the `numberofDays` variable in the main flow back to your desired production value (such as 30 days) to ensure that the schedule is correctly set for production runs.

## Limitations & Known Issues
- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-system-limits.htm).
- Error handling isn't addressed in this template.