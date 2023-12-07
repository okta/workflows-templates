# Intro to Lists and Helper Flows


## Overview

Much of the data you work with is presented as a list: a list of user objects, a list of applications objects, and so on. Okta Workflows allows you to process lists in a comprehensive manner, using helper flows to operate on each member of the list. 

There are several ways to process a list. Performing a discrete action on each item without returning anything to the parent flow is common. Another frequent use is keeping the cumulative output of each processed item that can be returned to the parent flow. See the Okta Workflows documentation for more details and examples of other list operations.

Helper flows are simply subroutines that exist as a separate flow, but can only be called from a parent flow. Helper flows are useful not only for the previously mentioned list processing, but for code reusability, team contributions, and code cleanup. 

Consider a scenario where you have multiple use cases implemented in Workflows. Several of these flows require email communication to managers and other stakeholders. You could use an **O365 Email** card in each flow with the necessary body formatting, recipient lists, and so on. Or you can create a **Send Email** helper flow that you call from any parent flow. Any needed changes are made once in the helper flow and are instantly available to all parent flows.

Similarly, imagine that you have a large team of contributors for your Workflow implementations. The "IT Development" team may maintain some of the business logic used by the "Process Automations" and "Accounting" groups. Each team could incorporate the business logic directly into their flow, but then they could be caught in a cycle of distracting changes and revisions. With a helper flow, one team can maintain the logic and others can call into it.

Lastly, a long complex flow can be difficult to visualize and fully comprehend. In this case, helper flows can be used to break out "chunks of related processing" to make the resulting parent flows easier to understand and maintain.

## Prerequisites

Before you get started, here are the things you need:

*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Access to a tenant for Slack or some other connector to output response

## Setup Steps

1. Select the parent flow titled **[Parent] List Example**
    1. Make sure that a connection is selected for the **List Users with Filter** card.
    1. The only input should be **Status**, with **Active** selected as the value.
1. Open the helper flow **[Helper -1] Iterate List** in a new tab. 
1. Open the helper flow **[Slack] Send Slack Message** in a new tab. 
1. On the **Slack - Send Message to Channel** card, edit the **Channel ID** field to a channel that exists in your Slack tenant. For example, the **#general** channel.
1. Scroll to the right and ensure that a connection is selected for the **Slack -Send Message to Channel** card. 
1. Open the helper flow **[Helper -2] Reduce List** in a new tab.
1. Turn on the parent, Slack, and helper flows.

    > Note: Slack is used to show an action on each processed list item and to show how common actions can be reused in a helper flow. Other Workflow connections such as O365 or GMail can be substituted.


## Testing these Flows

1. Go to the parent flow, and click **Test Flow** in the toolbar.
    1. Click Flow History and make sure that everything succeeded.
1. Confirm for the **[Parent] List example** parent flow:
    1. There was only a single execution of the flow.
    1. There are no return values for **List For Each**.
    1. The return value for **List Reduce** is a JSON object key/value of memo/&lt;number of active users in your Okta Org>.
    1. The output value **list_of_emails** is a list of text with the email addresses of the active users.
1. Go to the helper flows and select Flow History. 
1. For the **[Helper -1] IterateList** helper flow:
    1. You should see an execution for each ACTIVE user in your Okta Org.
    1. A message in the Slack Channel indicating that the user is active.
1. For the **[Helper -2] ReduceList** helper flow:
    1. You should see an execution for each ACTIVE user in your Okta Org.
    1. The returned **memo** value should be one higher than the input **memo** value.
1. Check the Flow History for the Slack flow. 
    1. You should see an execution for each ACTIVE user in your Okta Org. 
    1. Also check the Slack channel you specified for messages from this Workflow to confirm there are messages: `firstname lastname is ACTIVE`. 

    > Note: The parent flow uses a scheduled flow as the required action card. This is arbitrary. The functionality can be demonstrated using the Workflows **Test** feature and the scheduler.

## Limitations & Known Issues

* If you have many users (50k+), it's highly recommended that you break your **List Users** call into multiple groups of users. That could be individual groups (using the **List Group Members** card), or based on some type of unique category (like their office location).
*   If you have a high number of users and run the test repeatedly, you may hit rate limits when sending requests to Slack.
