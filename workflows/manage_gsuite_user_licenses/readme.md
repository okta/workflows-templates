# Manage Google Workspace User Licenses

## Overview

This page outlines a workflows template that contains two workflows:

A **G Suite Staged Deactivation**: In this flow, once a user is removed from a specified Okta group:

* The user's G Suite account will be disabled immediately.

* An email to the user's manager to that effect will be sent.

* After a specified delay, the user's G Suite license will be removed.

* An email to the user's manager to that effect will be sent.


A **G Suite Activation**: Once a user is added to a specified Okta group:

* The user's G Suite account will be enabled immediately.

* The user's previously assigned G Suite licenses will be reassigned immediately.

* An email to the user's manager to that effect will be sent.


## Prerequisites

For this workflows template, to send an email to the manager on the creation of a user, a GMail connection and a G Suite Admin connection need to be configured in addition to the Okta tenant connection.

_You will need to have these connections created and authorized before installing the flow template._

Google G Suite will want to automatically assign licenses to new users in the G Suite tenant. You need to turn this off for Workflows to be able to add and remove licenses. To do this go to the [ G Suite Admin Console](https://admin.google.com/u/1/ac/home) and then click on Billing

Once in Billing, you will need to do two things:

1. 	Add a new license. For example, I chose the Android Management license as it is zero cost / free.

2. 	ONLY after you have added the additional license will you see the Licenses setting where you can turn it off license auto assignment for everyone.


Along with the connectors specified above you will need:

**_NOTE: If you use the G Suite Initialization flow outlined further down this page, steps 1 and 2 below will be created and done for you except for number 5. The initialization flow will not create G Suite users._**

1. 	An Okta group that will be used to trigger the workflow. No applications or directories should be assigned to this group.

2. 	An Okta User will be added and removed from the above Okta group as part of the demo.

3. 	A valid Okta user (username) should be populated in the manager field for this user to represent the user assigned as the manager to this user.

4. 	Both this user and the manager user should have a valid primary email address assigned to them and you need to have access to the email mailbox inbox for the manager user during the demo.

5. 	Both the target user and the manager user need to already exist in G Suite as this flow does not provide the G Suite accounts. The target user needs to have a valid G Suite License assigned to them before beginning the demo.

6. 	Access to the Google G Suite Admin Portal as an admin user. [https://admin.google.com/u/1/?hl=en](https://admin.google.com/u/1/?hl=en)


## Setup Steps

1. In Workflows find [Templates] button at the top of the page an click on it.

2. Find and select: "Manage G Suite User Licenses" flow.

3. Find and click on [Add template] button > and click on  [Add Template] in the  appeared pop-up. A "Manage G Suite User Licenses" folder is automatically added and the user is navigated there, once the flow is built.

4. Turn on the following flows:

    *   G Suite Store License flow
    *   [Helper] Delete Row from Table
    *   [Helper] Add License Row to Table

5. Open the G Suite Store License flow

6. Change the OktaGroupName variable value in the Assign card to the desired Okta group name that will be used to trigger the flow when a user is added or removed from this group.

7. Change the G Suite License to Assign variable value in the Assign card to the name of the G Suite license you wish to assign a user in the G Suite Activation flow.

8. Save the G Suite Store License flow.

9. Run the G Suite Store License flow.

10. Navigate to the Tables tab and select G Suite License table and ensure that one record exists.

11. If there are no records in the table, validate the value in the G Suite License to Assign - Assign a card to ensure that the name of the desired license is correct and rerun the flow if necessary.

12. Open the G Suite Initialization Flow.

13. Change the values for the G Suite target user.

    * Change the User Name field to match the email address of your existing G Suite target user. (The user that will have licenses removed or added to them)

    * Change the First Name, Last Name, and Password fields as desired for the target user that will be created.

14. Change the values for the G Suite manager user.

    * Change the User Name field to match the email address of your existing G Suite manager user. (The user that receives the email messages about the target user's licenses being removed or added.) This user must have a valid email inbox so you can check the email messages.

    * Change the First Name, Last Name, and Password fields as desired for the target user that will be created.

15. Change the Okta group name if desired.

    * Change the name of the Okta group to use for the demo. (if desired)

16. Save the G Suite Initialization Flow.

17. Run the G Suite Initialization Flow.

18. Open the G Suite Staged Deactivation workflow.

19. Change the setup variables as desired:
    * **Okta Group Name**: The name of the existing Okta group that will be used to trigger the G Suite Workflows. If you used the G Suite Initialization flow make sure the group name is the same as the one defined when you ran that flow.
    * **Delay in Minutes**: The increment of time as specified by the Delay Interval in minutes that will transpire between the time the user's G Suite account is disabled and the user's G Suite licenses are removed.

20. After making changes to the G Suite Staged Deactivation workflow click the save icon to save the changes.

21. Open the G Suite Activation workflow and change the Okta Group Name to match the Okta group that you defined in the G Suite Staged Deactivation workflow.
    * **Okta Group Name**:  The name of the existing Okta group that will be used to trigger the G Suite Workflows. Make sure this is the same group name you set in the G Suite Staged Deactivation flow.

22. Click the Save icon to save the changes.

23. Turn on both workflows by clicking the On / Off button so that they are green for the workflows below:
    * **G Suite Activation**
    * **G Suite Staged Deactivation**


## Testing these Flows

1. Open and login to the Google G Suite [ Admin Portal](https://admin.google.com/u/1/?hl=en) as your G Suite admin user.

2. Goto Directory -> Users.

3. Click on the username for the test user that is a member of your Okta group.

4. You will see that the user is allowed to Sign In.

5. Scroll to the bottom to show what licenses are assigned to the user.

6. Remove the user from the specified Okta group.

7. Open the email mailbox for the manager user.

8. You should see an email message that the user removed from the Okta group specified has been disabled in G-Suite.

9. If you return to the G Suite Admin Portal and refresh the page, then select that user, you'll see that user has been suspended by admin, but the user still has an G Suite License assigned.

10. Then after the specified delay, (in the default configuration that is one minute) the manager gets an email that the G Suite license for the target user has been removed.

11. If you scroll down the page after refreshing the page, sure enough, the user targeted is unlicensed.

12. Now we will reset the user's G Suite status. Put that same user back in the Okta specified group.

13. The manager will get an email that the user's G Suite user has been enabled and license restored.

14. Sure enough if you return to the G Suite Admin Portal and refresh the page, then click on the target user, you can see that the license has been restored and the user is allowed to sign in again.


## Limitations & Known Issues

**Additional limitation**: This does not work with cloud identity free licenses, since the license list pulls as empty in Okta if that is the only license assigned to a user. Works with G Suite Business license.
