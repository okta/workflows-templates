
# Pre-enroll users in MFA before activation


## Overview

User activations typically allow the users to choose an MFA factor for enrollment the first time they login. To improve security, validate the user's identity before they login for the first time, users can be pre-enrolled in SMS MFA using the phone number from the profile pulled in from Active Directory or the HR system. This workflow will automate this process and verify that the user is the intended recipient to receive the activation to Okta to access company's resources.

## Before you get Started/Prerequisites

Before you get started you will need:



*   Access to an Okta tenant with Okta Workflows enabled for your org
*   Access to Gmail
*   Access to a phone with sms capability

## Workflow Setup Steps



1. Navigate to Directory > Groups and create two Groups within the Okta Admin Console. For example Group A and Group B. Navigate to the groups and save the group IDs in a notepad to use later. Ex. https://YOURDOMAIN.okta.com/admin/group/GROUP_ID
2. Navigate to Security > Multifactor and enable the required factors.
3. Under the Factor Enrollment tab, create two policies in this order:
   a. SMS Only Policy - Disable all factors and only leave SMS as "Required"
   b. All other factors Policy - Add other required/optional factors

   For both the policies, create rules with default values and Choose "Okta" for the condition to say that this will apply to when users are accessing the Okta        Dashboard.

4. Navigate to the Workflows Console, and click on the "Pre-enroll MFA" flow
5. Edit the "Group ID" attribute in the "Add User to Group" card and change it to the Group ID of Group A saved from Step 1.
6. Go back into the Workflow folder, and click on the "Add Other Factors" flow
7. Change the Group IDs for "Remove User from Group" to the Group ID of Group A and "Add User to Group" to the Group ID of Group B.


## Testing this flow


*   Ensure that both the flows are turned on.
*   Navigate to Directory> Profile Editor on the Okta Admin Console. Click on "Edit" for the Okta user profile
*   Click on "Add Attribute" and call it "mobileNumber" for testing. Change the user permission to "Read-write" and leave the rest to defaults
*   Navigate to Directory > People and click on "Add Person"
*   Create a test user with a secondary email address and a phone number in the format "+1-000-000-0000"
*   This should start the "Pre-enroll MFA" flow
*   Check your secondary email inbox for two emails - MFA enrolled and activation email.
*   Click on the Activation link to complete the activation process. You will be prompted to send a code to the number that was used to create the user.
*   Once activation is complete, the "Add other flow" kicks off and adds other optional factors to the user.
*   As the test user created, click on the profile on the top right corner and navigate to Settings to see other MFA options under "Extra Verification"


## Limitations & Known Issues



*   Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
*   When invoking HTTP endpoints consider any applicable rate limits of the SaaS application (or http endpoint) that you are invoking. You should almost always set up error handling on the card to retry periodically.
