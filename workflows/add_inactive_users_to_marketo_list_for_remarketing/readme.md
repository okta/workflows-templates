# Add Recently Inactive Users to Marketo List for Remarketing 

## Overview

This template illustrates how Okta Workflows can be used with Marketo to re-engage your customers and drive more visits to your website. This template automatically maintains a list of customers who haven't signed in to Marketo recently. You can then use Marketo to set up a campaign to reengage these customers. 

This template runs each day at 9AM so your list of inactive Marketo customers is always up to date.

The steps covered by this template include: 
-   Create a list in Marketo so you can hold your inactive users in a new list instead of using an existing one.
-   Search for all Auth0 users that haven't successfully signed in over the past 60 days. 
-   Add these users to your Marketo inactive customer list.
-   Remove any users from your Marketo inactive customer list that have signed in.

## Prerequisites

Before you get started, here are the things you need:
-   Access to an Okta tenant with Okta Workflows enabled.
-   Access to an Auth0 tenant.
-   Access to a Marketo tenant.

## Setup Steps

### Okta Workflows Setup

1.  Install the template into your Workflows environment.
1.  You should see one main flow, which has a **Scheduled Flow** event card as the trigger event, and two helper flows. One helper flow is for adding users to a Marketo list and the other one is for removing users from a Marketo list.
1.  You should also see a table, which is used to track inactive users.
1.  If you haven't already, establish a connection to Auth0 in Workflows.
1.  Establish a connection to Marketo (if not already set up). To configure a connection see [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/marketo/overviews/authorization.htm).

### Customize the Template (Optional)

1.  Update the **Scheduled Flow** card to how often you want the flow to run.
1.  In the first **Assign** card, specify the list name and folder in Marketo where you want to store your inactive customers list. If the list doesn't exist, the flow creates it for you.
1.  Update the **Assign** card and set `days_inactive` to be the number of days that you want to wait before considering a customer inactive. These customers are added to your Marketo list. 
1.  Update the **Assign** card and set `days_inactive_before_obsolete` to be the number of days after which you consider a customer obsolete and not worth re-marketing.

## Testing this Flow

1.  Execute your flow in the Workflows console.
1.  Go to execution history for the flow and confirm that the flow executed successfully. 
1.  In Marketo, confirm that any inactive user found was added to the inactive users list.
1.  In Marketo, confirm that any no longer inactive user was removed from the inactive users list.

## Limitations & Known Issues

-  This template assumes that you have already created leads for all of your customers in Marketo. It uses `email` to identify the corresponding `lead` in Marketo.
