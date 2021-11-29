# Suspicious Activity Event Alerts PagerDuty

## Overview

Okta enables users to report an activity that they don’t recognize as
suspicious activity to their organization administrators. Investigating
the suspicious activity reported in a timely manner is critical for
preventing and deterring fraud. How can the reported suspicious activity automatically create an incident in PagerDuty for internal teams toinvestigate further? This template provides an example for automatically creating an incident in PagerDuty when suspicious activity is reported.

## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled.

2. Configured Okta Connection. Steps to configure are posted at <a  href="https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Workflows/workflow-connect-your-applications.htm%23Authenti&amp;sa=D&amp;source=editors&amp;ust=1638150140707000&amp;usg=AOvVaw39eOaxdDdIdFOjp5SxD95V"  class="c10">https://help.okta.com/en/prod/Content/Topics/Workflows/workflow-connect-your-applications.htm#Authenti</a>

3. Configured PagerDuty Connection. Steps to configure are posted at <a  href="https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Workflows/connector-reference/pagerduty/pagerduty.htm&amp;sa=D&amp;source=editors&amp;ust=1638150140708000&amp;usg=AOvVaw3JBwcqxolqs8QAgMqwyH9o"  class="c10">https://help.okta.com/en/prod/Content/Topics/Workflows/connector-reference/pagerduty/pagerduty.htm</a>

## Setup Steps

1. Configure Suspicious Activity Reporting. Navigate to **Security > General** and make sure **Report Suspicious Activity via Email** is enabled.

2. In order for end users to report suspicious activity, ensure that at
least one of the following email notifications are enabled: MFA enrolled notification email and/or MFA reset notification email.

3. In PagerDuty create a new service with name **Okta Suspicious User Activity Reported** and of integration type **Use our API directly**.

4. Configure the input parameters Workflows Table. The **adminURL** will be your Okta organization's URL (https://acme.okta.com or https://acme.oktapreview.com). The **Integration Key** will be obtained from Pager Duty for the service Okta Suspicious User Activity Reported.

5. Check the Okta and PagerDuty connections in the Flow

6. Enable the template flows.

## Testing
1. Users report an activity that they don’t recognize as suspicious activity to their organization administrators.

2. Test User clicks on the Report Suspicious Activity link embedded in the email to report suspicious activity to Okta Administrators.

3. New incident created in PagerDuty with a deep link to details about the activity inside Okta Admin Dashboard.

4. Deep link to Okta Administration Console for further investigating.

5. System Log filtered by reported user inside Okta Administration Console for further investigating.

## Limitations & Known Issues

1. Note that the screenshots in the document may change over time since the time of the recording. If they do, recognize that there may be changes, but focus on the key terms and proceed as best you can.

2. Keep in mind the Okta Workflows System Limits.

3. Error handling is not handled in this tutorial.