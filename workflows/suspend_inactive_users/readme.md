## Inactivity-based Suspension


### <span style="text-decoration:underline;">Overview</span>

In many organizations, access tends to proliferate for far longer than certain users require it. Maybe you’re working with a contractor who needs access to a single app, or offboarding policies break down for an ex-employee. All of a sudden, you realize that the user hasn’t logged in for months, and as part of a strong security posture, would like to suspend them until you’re notified that they do actually need access. 

This flow reads all active users in your environment, and if they haven’t logged in within the past 6 months (180 days), suspends them.   


### <span style="text-decoration:underline;">Before you get Started / Prerequisites</span>

Before you get started, you will need:



*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Active users
*   One of the active users needs to have not logged in for the past 180 days; if you don’t have a user with “inactivity”, you can simply edit the flow for a different date range (eg 5 minutes for a recently created user)


### <span style="text-decoration:underline;">Setup Steps</span>



1. Select the parent flow titled “Inactivity-based Suspension - Parent Flow” 
    1. Make sure a connection is selected for the “List Users with Filter” card. 
    2. The only input should be Status, with “Active” selected as the value. 
2. Open the child flow, “Inactivity-based Suspension - Child Flow” in a new tab. 
    3. Scroll to the right, and make sure a connection is selected for “Okta - Suspend User”. 
3. Turn both the parent and child flow on. 


### <span style="text-decoration:underline;">Testing this Flow</span>



1. Go to the parent flow, and click Test Flow in the toolbar. 
    1. Click Flow History and make sure everything succeeded. 
2. Go to the child flow and select Flow History. You should see an execution for each user in your org. 
3. For those Okta users that you expected to be suspended (e.g. they hadn’t logged in for longer than 180 days), go to your Okta console and confirm that they are suspended. 


### <span style="text-decoration:underline;">Limitations & Known Issues</span>



*   If you have a user that has never logged in (LastLogin = null), then the flow will fail. If you’d like to skip errors, you can replace the “List For Each” with “List For Each - Ignore Errors”. 
*   If you have a large number of users (50k+), we’d highly recommend breaking your List Users call into multiple groups of users. That could be individual Groups (using List Group Members), or based on some type of unique category (like their office location). 
