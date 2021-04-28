
# Onboard and Offboard with Office365

## Overview

This page outlines a sample workflow template that contains three workflows:

An **Office 365 Staged Deactivation** flow: In this flow, once a user is removed from a specified Okta group:
* The users Office 365 account will be disabled immediately.
* An email to the users manager to that effect will be sent.
* After a specified delay, the user's Office 365 license will be removed.
* An email to the users manager to that effect will be sent.

An **Office 365 Activation** flow: Once a user is added to a specified Okta group:
* The users Office 365 account will be enabled immediately.
* The users previously assigned Office 365 licenses will be reassigned immediately.
* An email to the users manager to that effect will be sent.

A Store **All Microsoft License** flow: This flow stores the current Microsoft subscription licenses in a Okta Workflows table called Office 365 Licenses to be used in assigning the Microsoft license to the target user during the O365 Activation flow.

## Prerequisites

For this flow template in order to send an email to the manager on the creation of a user, an Office 365 Mail connection and an Office 365 Admin connection needs to be configured in addition to the Okta tenant connection. _You will need to have these connections created and authorized prior to installing the template.

You will also need Access to the Microsoft Office 365 Admin Portal as an admin user. [https://admin.microsoft.com/AdminPortal/](https://admin.microsoft.com/AdminPortal/)

## Setup Steps

### Office 365 Setup Steps

Create a manager user in the Office 365 tenant

1. Open the Microsoft Admin Center ([https://admin.microsoft.com](https://admin.microsoft.com)) and login as your .onmicrosoft.com administrator account.

2. Navigate to Users -> Active Users

3. Click on Add a User

4. Fill out the information for the following fields:

    * First name

    * Last name

    * Display name

    * Username

    * Username domain (you should select your email domain here not your .onmicrosoft.com domain here)

    * Password

5. Leave Require this user to change their password when they first sign in and Send password in email upon completion unchecked.

    Record the First name, Last name, Username, Username domain and Password somewhere for the manager user as you will need them later. _

6. Click Next

7. On the Assign Product licenses page ensure that Assign user a product license is checked. It should default to your subscription license for your tenant. Make sure that the license installed will create an Exchange mailbox so that the manager can receive email messages

8. Click Next

9. On the Optional settings page click Next

10. On the Review and finish page, click Finish Adding

Create a target user in the Office 365 tenant

1. In the Microsoft Admin Center ([https://admin.microsoft.com](https://admin.microsoft.com))  console that you should still be logged into

2. Navigate to Users -> Active Users

3. Click on Add a User

4. Fill out the information for the following fields:

    * First name
    * Last name
    * Display name
    * Username
    * Username domain (you should select your email domain here not your .onmicrosoft.com domain here)
    * Password

5. Leave Require this user to change their password when they first sign in and Send password in email upon completion unchecked.

6. Record the First name, Last name, Username, Username domain and Password somewhere for the target user as you will need them later. _

7. Click Next

8. On the Assign Product licenses page ensure that Assign user a product license is checked. It should default to your subscription license for your tenant.

9. Click Next

10. On the Optional settings page click Next

11. On the Review and finish page, click Finish Adding

### Okta Organization Setup Steps

Create the Okta group that will be used to trigger the Okta Workflows.

1. Login to your Okta tenant as a Super Administrator user.

2. Go to the Admin console in your Okta tenant

3. Navigate to Directory -> Groups

4. Click on Add Group

5. Type in Office 365 Assignments for the group name and the description

6. Click on Add Group

Create the Okta group that will be used to trigger the Okta Workflows in this template.

1. Navigate to Directory -> People

2. Click on Add Person

3. Enter the following information based on information that you recorded above in the Create a target user in the Office 365 tenant step. 
    * First name: use the First name that you recorded for target user
    * Last name: user the Last name that you recorded for the target user
    * Username: use the Username that you recorded for the target user +  \
    the Username domain that you recorded for the target user (ex. [Tammy.tester@example.com](mailto:Tammy.tester@example.com))
    * Primary email: this should be the same as the Username field
    * Password: Select Set by admin
    * Enter Password: the desired password for this user.  (for ease of testing this Okta workflow, make it the same password you recorded for this user in the Create a target user in the Office 365 tenant step.

4. Click the Save button

5. Enter the following information based on information that you recorded above in the Create a manager user in the Office 365 tenant step.
    * First name: use the First name that you recorded for manager user
    * Last name: user the Last name that you recorded for the manager user
    * Username: use the Username that you recorded for the manager user +  \@ + the Username domain that you recorded for the manager user (ex. [Terry.manager@example.com](mailto:Tammy.tester@example.com))
    * Primary email: this should be the same as the Username field
    * Password: Select Set by admin
    * Enter Password: the desired password for this user.  (for ease of testing this Okta workflow, make it the same password you recorded for this user in the Create a manager user in the Office 365 tenant step.
6. Edit the target user in Okta to add the manager

7. Navigate to Directory -> People

8. In the Search dialog start typing the name of your target user in Okta

9. Once the target user in Okta shows up in the search click on that user

10. Click on the Profile tab

11. Click on Edit

12. Scroll down to the Manager field

13. Put in the Okta username for the Okta manager user that you created in the step above.

14. Click Save.

### Okta Workflows Setup Steps

Install the template

Modify and run the Store all Microsoft Licenses workflow

1. Open the Store all Microsoft Licenses workflow

2. Change the name of the Okta group to use for the testing (if desired)

3. Run the Store all Microsoft License Workflow

4. Go to Tables in the Office 365 folder

    You will now see the subscription license model that you have assigned to your Microsoft 365 tenant along with the specified Okta group associated with it.

5. Navigate back to the Flows tab.

6. Modify the O365 Staged Deactivation Workflow

7. Open the O365 Staged Deactivation workflow

8. Leave the value of the Office Group as it already matches the Okta group that you created in the Create the Okta group step above that will be used to trigger the Okta Workflows.

9. Change the setup variables as desired:

    Delay Integer: The increment of time as specified by the Delay Interval Type that will transpire between the time the users Office 365 account is disabled and the users Office 365 licenses are removed.

    Delay Interval Type: The Delay Interval Type of time as specified by the Delay Integer that will transpire between the time the users Office 365 account is disabled and the users Office 365 licenses are removed. (Ex. if Delay Integer is set to 1 and Delay Interval Type is minute then there will be a delay of one minute.  The valid Delay Interval Types are: second, minute, hour, week, month, year.

10. After making changes to the O365 Staged Deactivation workflow click the save icon to save the changes.

11. Turn on the following workflows by clicking the On / Off button so that they are green

    * Clear Microsoft License Table
    * [Child] Store all Microsoft License
    * [Child] Clear Microsoft License Table
    * Store all Microsoft License
    * O365 Staged Deactivation


## Testing the Flow

1. Open the Store All Microsoft License flow and run that flow.

2. Observe the current Office 365 target user

3. Open and login to the Microsoft Office 365 [Admin Portal](https://admin.microsoft.com/AdminPortal/) as your Office 365 admin user.

4. Go to Users->Active Users

5. Click on the username for the test user that is a member of your Okta group.

6. Observe that the user has an Office 365 license assigned and is allowed to Sign In.

7. Deactivate the current Office 365 User

8. Remove the user from the specified Okta group.

9. Open the email mailbox for the manager user.

10. You should see an email message that the user removed from the Okta group specified has been disabled in Office 365.

11. If you return to the Microsoft Office 365 Admin Portal and refresh the page, then select that user that the user is not allowed to sign in. The user still has an Office 365 License assigned.

12. Then after the specified delay, in the default configuration that is one minute, the manager gets an email that the Office license for the target user has been removed.

13. If you return to the Microsoft Office 365 Admin Portal and refresh the page, sure enough the user targeted is unlicensed.

14. Activate the current Office 365 User

15. In the Okta Workflows console, turn on the O365 Activation flow.

16. Now go to the Okta Admin console.

17. We will reset the users Office 365 status. Put that same user back in the Okta specified group.

18. The manager will get an email that the user's Office 365 user has been enabled and license restored.

19. Sure, enough if you return to the Microsoft Office 365 Admin Portal and refresh the page, then click on the target user, you can see that the license has been restored and the user is allowed to sign in again.


## Limitations & Known Issues

**NOTE:** You will need to make sure the prerequisites are met and that you run the Store all Microsoft Licenses workflow

The scope of this workflow does not include creating Office 365 users, federating the Office 365 tenant with Okta for Single Sign On or turning on Office 365 provisioning with Okta.  
