# Restart specific Apple mobile devices on a weekly basis using Jamf
## Overview
Apple Mobile Devices such as iPads can be used as shared devices in several occasions such as meeting room control panels, customer facing demo screens, cash machines, etc. Those iPads need to restart from time to time to install pending updates and Jamf Pro doesn't offer a native way to schedule such actions over time.

## Prerequisites
1. Access to an Okta tenant with Okta Workflows enabled.
2. Administrator access to a Jamf Pro instance.
3. A configured Okta Connection. To configure a connection see see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).
4. A configured Jamf Pro connection.

## Setup
### Okta Workflows Setup
1. Install the template into your Workflows environment.
2. Inside the folder you should see two flows, the main flow being "Restart Mobile Devices Weekly."
3. This main flow is triggered on a recurring basis, simply set the trigger time/date of your choice in the "Scheduled Flow" card.
4. Set the name of the Jamf Pro Device group that will be used for collecting devices IDs in the "Read Mobile Device Group" action card.
4. Establish the connections to the target apps inside all the flows.
5. Enable all the flows.

### Jamf Pro Setup
1. Create a new smart/static device group and select the devices to restart.
2. Name this group with the same name as defined in the Okta Workflows "Read Mobile Device Group" action.

## Testing this Flow
This workflow is triggered following the reccuring basis defined previously. It is possible to force a flow trigger by hitting the "Test" button in the flow.

1. Once the flow is triggered, Okta Workflows will collect IDs of all mobile device in the chosen device group.
2. An MDM command "Restart" will be sent to each device.
3. Check that the mobile devices are restarting as expected.
4. Alternatively, you can check in Jamf Pro that there is a "Restart" MDM command pending/complete in devices' management history.

## Limitations & Known Issues
- Keep in mind the Okta Workflows [System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
- Error handling is not addressed in this template.