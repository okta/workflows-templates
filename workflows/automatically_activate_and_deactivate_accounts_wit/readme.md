# Automatically activate and deactivate Okta accounts and notify using Microsoft Teams

This template demonstrates how Okta Workflows can automatically activate and deactivate an Okta user account based on a start or end date stored in the Okta user's profile.

The template then sends out notifications using Microsoft Teams.

## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled.
1. Admin permissions to add user attributes for activation date and deactivation date.
1. A new Okta user account that isn't activated (the status is STAGED).
1. A configured Okta connection. See [Okta connector](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta) for configuration steps.
1. A configured Microsoft Teams connection. See [Microsoft Teams](https://help.okta.com/okta_help.htm?type=wf&id=ext-microsoftteams) connector for configuration steps.

## Setup Steps

1. In the Okta Admin Console, add a user. See [Add users manually](https://help.okta.com/okta_help.htm?id=ext-usgp-add-users)
1. Add two attributes to the user profile:
   1. **Account Activation Date** (account_activation_date)
   1. **Account Deactivation Date** (account_deactivation_date).
Both these attributes store the activation date and deactivation date in a MM/DD/YYY format.
1. **1A Find users to activate**: This flow runs daily and finds all users that need to be activated. Select the Okta connector and toggle the **Flow is OFF** switch to **Flow is ON**.
1. **1B Activate Account**: This helper flow activates the user account. This flow also triggers the flow for Microsoft Teams notification. Select the Okta connector, change the Teams Name and Channel Name and toggle the **Flow is OFF** switch to **Flow is ON**.
1. **2A Find users to deactivate**: This flow runs daily and finds all users that need to be deactivated. Select the Okta connector and toggle the **Flow is OFF** switch to **Flow is ON**.
1. **2B Deactivate Account**: This helper flow deactivates the user account. This flow also triggers the flow for Microsoft Teams notification. Select the Okta connector, change the **Teams Name** and **Channel Name** and toggle the **Flow is OFF** switch to **Flow is ON**.
1. **3 Send message to a channel in Microsoft Teams**: This flow sends a message to a specific channel in Microsoft Teams. Select the Microsoft Teams connector and toggle the **Flow is OFF** switch to **Flow is ON**.

### Testing

1. Create an Okta user account with the **Account Activation Date** profile attribute set for the current date and execute the **Find users to activate** flow.
1. Create another Okta user account with the **Account Deactivation Date** profile attribute set for the current date and execute the **Find users to deactivate** flow.
1. If done correctly, the team channel you configured receives notifications.

### Limitations & Known Issues

* Keep in mind the Okta [Workflows system limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits).
* This template doesn't cover error handling.
