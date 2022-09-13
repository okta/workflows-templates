## Remotely Lock All Kandji Devices Based on Security Events

## Overview

IT Administrators want to make sure that all company-related devices can
no longer be accessed when an employee is offboarded. This template
offers an automated way to remotely lock all Kandji devices assigned to
a given user in Kandji when this user is suspended, deactivated, or
reports suspicious activity on their account.

## Prerequisites

1.  Access to an Okta tenant with Okta Workflows enabled.
2.  Access to a Kandji organization.
3.  <a href="https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflow-connect-your-applications.htm">Configured Okta connection.</a>
4.  <a href="https://support.kandji.io/support/solutions/articles/72000566084">Configured Kandji connection.</a>

## Setup Steps

1.  Navigate to each flow and ensure your Okta connector and your Kandji connector are associated with a valid connection. Once completed, enable each flow that is intended to be used.
2.  In order to execute the Manual Device Lock flow, delegated flows must be enabled for your org.
3.  In order to leverage the Suspicious Activity flow, you must have <a href="https://help.okta.com/en-us/Content/Topics/Security/suspicious-activity-reporting.htm">Report suspicious activity via email</a> enabled in your security settings.

## Testing

1.  Testing the User Suspended or User Deactivated flows will require changing the Okta user lifecycle state to suspended or deactivated. Once this action has been performed, check the flow history for the corresponding flow to ensure the app event was triggered and that the impacted user’s device was found and locked with the Kadji connector action.
2.  Testing the Report Suspicious Activity flow will require an admin or end-user to click on the link included in the Okta generated e-mail after an admin or end-user receives a security notification e-mail. Once the link is clicked, the admin can ensure the app event was triggered and that the impacted user’s device was found and locked with the Kadji connector action.
3.  Testing the Manual Device Lock flow will require an Okta admin to navigate to the Delegated Flow menu in the Okta Admin console which is located in Workflows \> Delegated Flow. Find the corresponding delegated flow and click the Run button. Once clicked, the Okta admin will then enter the Kandji user’s e-mail address to execute the flow. Once the inputs have been entered, navigate to the Workflows console and check the flow history for the Manual Device Lock flow to ensure the user’s device was locked.

## Limitations & Known Issues

- Keep in mind the <a href="https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm">Okta Workflows System Limits</a>
- Error handling is not handled in this tutorial  
