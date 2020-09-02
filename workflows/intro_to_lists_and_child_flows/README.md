# **Intro to Lists and Child Flows**


## <span style="text-decoration:underline;">Overview</span>

Much of the data we are working with is presented as a list. Think of a list of user objects, list of applications objects, etc. Workflows allows you to process lists in a comprehensive manner leveraging Child Flows to operate on each member of the list.  There are a number of ways to process a list. Performing a discrete action on each item without returning anything to the Parent Flow is very common, as well as, keeping a cumulative output of each item iteration that can be returned to the Parent Flow. There are many other List operations. Check our in app documentation for details.

Child Flows are simply subroutines that exist as a separate flow but can only be called from a main or Parent Flow. Child Flows are very useful not only for the above mentioned List processing, but for code reusability, team contributions  and code cleanup.  

Envision that you have multiple use cases implemented in Workflows. Several of these flows require email communication to managers and other stakeholders. You could use an O365 Email Card in each flow with the necessary body formatting, recipient lists,etc. Or you can create a Send Email Child Flow that you call from the Parent. Any changes are made once in the Child Flow and are instantly available to all Parent Flows.

Similarly, imagine that you have a large team of contributors for your Workflow implementations. Some of the business logic may be maintained by Business Units and used by an Automations group. You could incorporate the logic directly into your flow, but you could be caught in a cycle of distracting changes and revisions. With a Child Flow, one team can maintain the logic and another can call into it.

Lastly, we all think our flows are easy to understand but a long complex flow can be difficult to visualize and fully comprehend. In this case, Child Flows can be used to break out ‘chunks of related processing’ making the resultant Parent Flows easier to understand and maintain.


## Before you get Started / Prerequisites

Before you get started, here are the things you’ll need:



*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Access to a tenant for Slack or some other connector to output response


## Setup Steps



1. Select the parent flow titled “[Parent] List Example”
    1. Make sure a connection is selected for the “List Users with Filter” card.
    2. The only input should be Status, with “Active” selected as the value.
2. Open the child flow, “[Child -1] Iterate List” in a new tab. 
3. Open the child flow, “[Slack] Send Slack Message” in a new tab. On the “Slack - Send Message to Channel” card, edit the “Channel ID” field to a channel that exists (i.e. “general”) in your Slack tenant.  
4. Scroll to the right, and make sure a connection is selected for “Slack -Send Message to Channel”. 
5. Open the child flow, “[Child -2] Reduce List” in a new tab.
6. Turn both the parent, Slack, and child flows on.

Note: Slack is used to show an action on each processed List item and to show how a common action can be implemented in a Child Flow for reusability. Other Workflow connections such as O365 or GMail can be substituted.


## Testing this Flow



1. Go to the parent flow, and click Test Flow in the toolbar.
    1. Click Flow History and make sure everything succeeded.
2. For the “[Parent] List example”  Parent Flow
    2. Single execution
    3. There will be no return values for ‘List For Each’
    4. The return value for “List Reduce” shall be a JSON object key/value of memo/&lt;number of active users in your Okta Org>
    5. The output value “list_of_emails” should be a list of text with the email addresses of the active users
3. Go to the child flows and select Flow History. 
4. For the “[Child -1] IterateList” Child flow
    6. You should see an execution for each ACTIVE user in your Okta Org.
    7. A message in the Slack Channel indicating that the user is active
5. For the “[Child -2] ReduceList” Child Flow
    8. You should see an execution for each ACTIVE user in your Okta Org
    9. The Return “memo” value should be incremented by 1 of the Input memo value.
6. Check the Flow History for the Slack flow.  
    10. You should see an execution for each ACTIVE user in your Okta Org.  
    11. Also check the Slack channel you specified for messages from this Workflow for messages in the format of:  _firstname  lastname_  is ACTIVE. 

Note: The Parent Flow has a Scheduled Flow as the required action card. This is arbitrary. The functionality shall be demonstrated using the Workflows ‘Test’ feature and the scheduler.


## Limitations & Known Issues

This is where you might note to the customer any known issues, edge cases, or gotchas as they think about using the flow in a real-life scenario. 



*   If you have a large number of users (50k+), we’d highly recommend breaking your List Users call into multiple groups of users. That could be individual Groups (using List Group Members), or based on some type of unique category (like their office location).
*   If you have a high number of users and run test repeatedly, you may hit rate limits when sending requests to Slack or it’s equivalent.