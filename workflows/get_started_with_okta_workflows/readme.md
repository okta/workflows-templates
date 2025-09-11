# Get started with Okta Workflows

## Overview

This template contains specially curated introductory flows to help new users get familiarized with building flows. Discover what you can do with Workflows, such as schedule tasks, connect different apps together, and automate identity processes.

## Prerequisites

Before you get started, you need:

- Access to an Okta tenant with Okta Workflows enabled.
- A configured Okta Connection. To configure a connection, see [Authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).

## Setup Steps

### Hello World
This flow is fully set up and ready to run. No additional configuration is required. 

You can use the **ON/OFF** toggle to activate the flow. 

### Get User Groups
You need a valid user id. A user's id can be found in the Admin Console by going to that user's profile. Go to **Directory** > **People** and select the user. The URL of the page contains the user id. 

### Identify inactive Okta users

1. In the **Identify inactive Okta users** flow, configure the **Scheduled Flow** card to run at the frequency you desire.  Click the clock icon at the bottom of the card. Okta recommends running the flow to run weekly, but you can configure it to run with whatever frequency meets your needs. 
2. Make sure that the **Okta - List Users with Search** card has the correct Okta connection selected.
3. In the **Okta - List Users with Search** card, specify the time window you want to report on by editing the **timeWindowDays** field. The card is already set to search for users who haven’t signed in within the past 30 days.
4. Make sure that both flows are turned on.

## Testing this Flow

### Hello world
When you click **Run** for this flow, the **Execution History** page shows the completed flow. The **Flow Control Assign** card should have the composed `Hello Workflows` text in that card's output field. 

### Get user groups
1. Fill in the user Id and run the flow.
2. Check the flow history.
3. The **Text Compose** card should list all the groups that the user is assigned to.

### Identify inactive Okta users
1. Open the flow and click the **Test** button at the top of the page.

    **Date & Time - Now** fucntion cards are included before and after the **Okta - List Users with Search** action card. These cards allow you to see how long it takes the template to process all of your active users.
    
2. When the flow finishes, compare the start and finish times (the dates values of the cards). 

    If you have 100,000 or more users in Okta, this template could take a few hours to run. To verify that it's working, go to the **Tables** tab and open the **Inactive Users** table. As the template finds users who haven’t signed in within the specified time window, it adds new rows to the table.
    
3. Optional: Modify the **Check Last Login date** flow to also suspend inactive users. Put the **Okta - Suspend User** card at the very end of the flow (to the right of **Table - Create Row**). Test the flow thoroughly to ensure that it's working as expected.

4. After the flow is complete, you can download a copy of the **Inactive Users** table as a CSV file. 

## Limitations & Known Issues

- The **Identify inactive Okta users** flow uses the **Stream all matching records option** of the **Okta - List Users with Search** card. Streaming doesn't require pagination. Instead, the card streams each matching record directly to the helper flow. Since the flow iterates over all active users in the Okta org, this may take some time to run.

- There's a limit to the number of rows a table can have.  IF your org exceeds this limit, using this template isn't recommended without some enhancements to avoid system limits. See [System Limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits).

- This template doesn't address error handling.