# Get started with Okta Workflows

## Overview

This template contains specially curated introductory flows to help new users get familiarized with building flows. Discover what you can do with Workflows: schedule tasks, connect different apps together, and automate identity processes.

## Prerequisites

Before you get started, you need:

- Access to an Okta tenant with Okta Workflows enabled.
- A configured Okta Connection. To configure a connection, see [Okta connector Authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta-misc-authorization).
- A configured Gmail connection. To configure a Gmail connection, see [Gmail connector Authentication](https://help.okta.com/okta_help.htm?type=wf&id=ext-gmail-misc-authorization).

## Setup Steps

### Hello World
This flow is fully set up and ready to run. No additional configuration is required. 

You can use the **ON/OFF** toggle to activate the flow.

### Send welcome email to Okta Workflow users
This flow automatically sends a welcome email to users who are granted access to Okta Workflows.

1. Double-click the **Send welcome email to Okta Workflow users** flow to open it in the Flow builder view.
1. On the **Okta** **User Assigned to Application** card, click **Choose Connection**. Select the Okta connector that you created in the **Prerequisites** section.
1. Click the **Options** button on the **User Assigned to Application** and select the following options: 
    - **Use App Instance ID?**: `No`
    - **Application**: `okta_flow_sso`
    - **Application Instance**: `Okta Workflows`
1. Click **Save**.
1. On the **Gmail** **Send Email** card, click **Choose Connection**. Select the Gmail connection that you created in the **Prerequisites** section.
1. Click **Save** at the top of the page to save the flow.
1. Click **Flow is OFF** and use the toggle to change **Flow is OFF** to **Flow is ON**.

You can modify any part of this flow to meet your business needs.

### Identify inactive Okta users
This flow demonstrates how Okta Workflows can provide value by helping to free up expensive app licenses. It searches for any active user in Okta whose last sign-in date is before a specific time and then captures the user's details in a Workflows table.

1. Double-click the **Identify inactive Okta users** flow to open it in the Flow builder view.
1. Click the clock icon at the bottom of the **Okta** **Scheduled Flow** card.
1. Set the desired frequency for the flow to run. Running this flow weekly is reasonable, although you may want to run on a different schedule depending on your reporting needs. For the testing phase, select a time that is approximately 10 minutes away and set the **Timezone** to your local zone.
1. Click **Options** on the **Tables** **Clear Table** function card, and confirm that the `Inactive Users` table is selected. This table is included as part of the template. 
    - If that table isn't shown, click the **Table** input field and use the **Select table** dialog to go to where the table was imported. Click the table name to select it and then click **Choose** to confirm.
1. Click **Save** to confirm the table selection.
1. On the **Okta** **List Users with Search** action card, click **Choose Connection** and select the Okta connector that you created in the **Prerequisites** section.
1. On the **Okta - List Users with Search** card, click the **timeWindowDays** field to specify the time window that you want to report against. This is the number of days since the user's last successful sign-in action. The card is already set to search for users who haven't signed in within the past 30 days.
1. Click **Save** at the top of the page to save the flow.
1. Click **Flow is OFF** and use the toggle to change **Flow is OFF** to **Flow is ON**. This button now displays a countdown time indicating when the flow is next scheduled to run.

The **Identify inactive Okta users** flow calls the **[Helper Flow for 3]: Check Last Login date and add to table** flow to calculate if the user record indicates that the user has signed in during the requested time period. 
1. Back on the main **Flows** page, click the **[Helper Flow for 3]: Check Last Login date and add to table** flow to open it in the Flow builder view.
1. Click **Options** on the **Tables** **Create Row** function card, and confirm that the `Inactive Users` table is selected. This is the same table referenced by the **Identify inactive Okta users** parent flow. 
    - If that table isn't shown, click the **Table** input field and use the **Select table** dialog to go to where the table was imported. Click the table name to select it and then click **Choose** to confirm.
1. Click **Save** to confirm the table selection.
1. Click **Save** at the top of the page to save the flow.
1. Click **Flow is OFF** and use the toggle to change **Flow is OFF** to **Flow is ON**.    
    > Helper flows must be active for the parent flow to run successfully.

## Testing these flows

### Hello World
When you click **Run** for this flow, the **Execution History** page shows the completed flow. The **Flow Control** **Assign** card should have the composed `Hello Workflows!` text in that card's output field.

### Send welcome email to Okta Workflow users
1. In your **Okta Admin Console**, go to **Applications > Applications** and click the **Okta Workflows** app. 
1. Assign a test employee to the **Okta Workflows** app. This automatically triggers the flow.
1. Return to your **Okta Workflows Console** and click the **Execution History** page in this flow.
1. The **Execution History** page should show that the flow ran successfully. The **Send Email** card in the history should show the composed email in the card's output fields.
1. Confirm that the employee automatically received the welcome email.  

### Identify inactive Okta users
1. Open the **Identify inactive Okta users** flow and click **Run** at the top of the page.

    **Date & Time** **Now** function cards are included before and after the **Okta** **List Users with Search** action card. These cards allow you to see how long it takes the template to process all of your active users.
1. When the flow finishes, compare the start and finish times (the date values of the cards). 
    > If you have 100,000 or more users in Okta, this template could take a few hours to run. To verify that it's working, go to the **Tables** tab on your **Flows** page and open the `Inactive Users` table. As the template finds users who haven't signed in within the specified time window, it adds new rows to the table.
1. After the flow is complete, you can download a copy of the `Inactive Users` table as a comma-separated values (CSV) file. Go to the **Tables** tab on your **Flows** page and click the `Inactive Users` table. After the table appears, select **Export** to download the CSV file. 

1. Optionally, you can choose to suspend any inactive users in your Okta org:
    1. Open the **[Helper Flow for 3]: Check Last Login date and add to table** flow.
    1. Click **Add app action** at the end of the flow (after the **Table** **Create Row** function card). 
    1. Select the **Okta** connected app and then choose **Suspend User** card.
    1. Drag the **userId** field from the **Tables** **Create Row** card to the **ID or Login** input field of the **Suspend User** card. 
    1. Test the flow thoroughly first to ensure that it's working as expected.



## Limitations & Known Issues

- The **Identify inactive Okta users** flow uses the **Stream all matching records** option for the **Okta** **List Users with Search** action card. Streaming of records doesn't require pagination. Instead, the card streams each matching record directly to the helper flow. Since the flow is iterating over all active users in your Okta org, this may take some time to run.

- Tables have a limit of 100,000 rows (see [System Limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits)). If your Okta org has more than 100,000 users, you need to include some search filtering in the inactive users flow to avoid hitting the system limits.

- Review the Okta Workflows [System Limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits) for other potential restrictions.

- This template doesn't address error handling.