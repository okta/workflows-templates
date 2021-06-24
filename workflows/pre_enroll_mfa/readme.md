
# Pre-enroll users in MFA before activation


## Overview

User activations typically allow users to choose and enroll in an MFA factor when they sign in for the first time. To improve security by validating the user's identity during sign-in, users can be pre-enrolled in the SMS factor using the profile phone number that was pulled from Active Directory or the HR system. This workflow will automate this process and verify that the user is authorized to receive an activation notice and can access their company's resources.

## Before you get Started/Prerequisites

Before you get started you will need:

*   Access to an Okta tenant with Okta Workflows enabled for your org
*   Access to Gmail
*   Access to a phone with SMS capabilities

## Set up Flows

1. Navigate to **Directory** > **Groups** and create two groups within the Okta Admin Console. For example, name them `Group A` and `Group B`. Navigate to the groups and save the group IDs in a notepad to use later. For example, https://YOURDOMAIN.okta.com/admin/group/GROUP_ID.
2. Navigate to **Security** > **Multifactor** and enable the required factors.
3. Under the **Factor Enrollment** tab, create two policies, in this order:
   a. SMS Only Policy: Disable all factors and only leave SMS as "Required"
   b. All other factors Policy: Add other required/optional factors

   For both the policies, create rules with default values. Choose **Okta** for the condition. By doing so, the condition will apply to when users are accessing the Okta Dashboard.

4. Navigate to the Workflows Console, and click the **Pre-enroll MFA** flow.
5. Edit the **Group ID** attribute in the Add User to Group card and change it to the group ID of Group A saved from Step 1.
6. Return to the Workflows folder, and click on the **Add Other Factors** flow.
7. Change the group IDs for **Remove User from Group** to the group ID of Group A and **Add User to Group** to the group ID of Group B.

## Testing this flow

1.  Ensure that both the flows are turned on.
1.  Navigate to **Directory** > **Profile Editor** on the Okta Admin Console. Click **Edit** for the Okta user profile.
1.  Click **Add Attribute** and rename it `mobileNumber` for testing. Change the user permission to "Read-write" and leave the rest to defaults.
1.  Navigate to **Directory** > **People** and click **Add Person**.
1.  Create a test user with a secondary email address and a phone number in the format `+1-000-000-0000`. This should start the Pre-enroll MFA flow.
1.  Check your secondary email inbox for two emails: MFA enrolled and the activation email.
1.  Click on the **Activation** link to complete the activation process. You will be prompted to send a code to the number that was used to create the user.
1.  Once activation is complete, the Add other Factors flow kicks off and and adds other optional factors to the user.
1.  Once the test user created, click on the profile on the top right corner and navigate to Settings to see other MFA options under **Extra Verification**.

## Limitations & Known Issues

*   Be mindful of [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
*   When you invoke HTTP endpoints, consider any applicable rate limits of the SaaS application (or HTTP endpoint). You should almost always set up error handling on the card to retry periodically.
