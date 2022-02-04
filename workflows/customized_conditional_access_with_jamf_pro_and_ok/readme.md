# Customized Conditional Access with Jamf Pro and Okta 
## Overview

Setup a fully customizable conditional access workflow for your Okta user based on their Apple devices compliancy.

 - Restrict access to any Okta application of your choice in real time
 - Use any kind of compliancy criteria available in Jamf Pro (encryption, OS version, antivirus status, etc)
 - This template has been configured for computer compliancy only but it can be adapted for mobile device compliancy as well
 - Useful if you want to restrict or limit Okta access to users with obsolete OS versions or unencrypted computers.

## Prerequisites
1. Access to an Okta tenant with Okta Workflows enabled.
2. Administrator access to a Jamf Pro instance.
3. A configured Okta Connection. To configure a connection see see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).
4. A configured Jamf Pro connection.

## Setup
### Okta Workflows Setup
1. Install the template into your Workflows environment.
2. Inside the folder you should see two flows, the main flow being "Check Jamf Computer Compliancy Group"
3. This main flow is triggered by a webhook, copy its invoke URL for later use
4. Establish the connections to the target apps inside all the flows
5. Enable all the flows

### Jamf Pro Setup
Integrating Okta with Jamf Pro as a cloud LDAP server isn't mandatory but it can help to make sure that users emails are matching between the two tenants.

1. Create a computer smart group with criterias defining what is a "non compliant" computer
2. In Jamf Pro settings > Webhooks, create a new webhook that will monitor group membership changes on the "non compliant" smart computer group
    1. Put the Workflows Invoke URL in the Webhook URL field
    2. Set Authentication type to None
    3. Set Content Type to JSON
    4. Set Webhook event as SmartGroupComputerMembershipChange
    5. Set the target smart computer group to the previously created smart group
3. Make sure you have Jamf Pro users assigned to computers
4. Please note that this workflow checks Jamf Pro users emails so make sure that all Jamf Pro users have email addresses equivalent to Okta users emails.

### Okta Admin Console Setup
1. Create a new Okta group that will gather all users considered as non compliant.
2. For each Okta application you want to involve in conditional access, do the following:
    1. In the Application Sign-On tab, add a new Sign On Policy rule.
    2. Give this rule a name.
    2. In the "Who does this rule apply to?" section, select "The following groups and users:"
    3. Select the Okta group created previously.
    4. In the Access section, set the access condition to "Denied."
    5. You can leave all other settings as default depending on your access policy.

## Testing this Flow
This workflow is only triggered when a computer joins or leaves the "non compliant" smart computer group. 

1. For testing purpose, you can either temporarily modify this smart group criteria or modify a test computer configuration to make it join the smart group.
2. Once a computer has joined the smart group, check the workflows history to confirm if they were both successful.
3. Check the Okta user group to see if a user has been automatically added to it
4. Log in to Okta as the test user to make sure it can't access restricted applications anymore.

## Limitations & Known Issues
- Keep in mind the Okta Workflows [System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
- Error handling is not addressed in this template.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg0MzUwODMwMyw0NTQwOTYwNDddfQ==
-->