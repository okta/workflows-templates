# Lock Apple Devices with Jamf upon user offboarding
## Overview
This workflow offers an automated way to remotely lock all Apple Devices assigned to a given user in Jamf Pro when this user is deactivated in Okta.

## Prerequisites
1. Access to an Okta tenant with Okta Workflows enabled.
2. Administrator access to a Jamf Pro instance.
3. A configured Okta Connection. To configure a connection see see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).
4. A configured Jamf Pro connection.

## Setup
### Okta Workflows Setup
1. Install the template into your Workflows environment
2. Inside the folder you should see three flows, the main flow being "Lock Devices When User Is Deactivated"
3. This main flow is triggered by an Okta Action "User Deactivated"
4. In the "Send Lock Command To Computer" helper flow, change the passcode that will be used for locking computers. It must be a 6 digits code and by default is set to 123456
5. In the "Send Lock Command To Mobile Device" helper flow, change the Lock Message to your need. The default one is "This device has been locked by your administrator."
4. Establish the connections to the target apps inside all the flows
5. Enable all the flows

### Jamf Pro Setup
Remark: Integrating Okta with Jamf Pro as a cloud LDAP server isn't mandatory but it can help to make sure that users emails are matching between the two tenants.

1. There is no additional Jamf Pro setup. Matching Jamf Pro and Okta usernames. 


## Testing this Flow
This workflow is only triggered when a user is deactivated in Okta. 

1. Deactivate a test user that has assigned devices in Jamf Pro.
2. Once the user has been deactivated in Okta, check that their assigned devices are being locked.
3. Alternatively, you can check in Jamf Pro that there is a "Lock Device" MDM command pending/complete in devices' management history.

## Limitations & Known Issues
- Keep in mind the Okta Workflows [System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
- Error handling is not addressed in this template.
