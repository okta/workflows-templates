# Trigger Automatic Notifications When All MFA Factors Are Reset

## Overview

Resetting all MFA factors can be triggered by a bad actor, human error or an IT administrator helping a customer. Timely notifications to enable internal teams to identify next steps is critical for improving security and reducing risk. This template demonstrates how internal teams can be automatically notified
when all MFA factors for a user are reset.

## Prerequisites

1.  Access to an Okta tenant with Okta Workflows enabled
2.  Configured Okta connection. Steps to configure are posted at [https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflow-connect-your-applications.htm#Authenti](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflow-connect-your-applications.htm#Authenti)
3.  Configured Slack Connection. Steps to configure are posted at [https://help.okta.com/en/prod/Content/Topics/Workflows/connector-reference/slack/slack.htm](https://help.okta.com/en/prod/Content/Topics/Workflows/connector-reference/slack/slack.htm).
   
## Setup Steps

In this template a message is automatically sent out to a Slack channel
when an "Okta User MFA Factor Reset All" event is triggered. This template can be modified to meet your business needs.

1.  Check the Slack connection and change the Slack Channel.
2.  Turn on the flow.

## Testing

1.  Create a test user in Okta using the [Okta dashboard](https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Security/mfa/mfa-reset-users.htm&amp;sa=D&amp;source=editors&amp;ust=1637191704457000&amp;usg=AOvVaw3KlJslpqFST8_5KQKi9wC9) or via the [Factors API](https://developer.okta.com/docs/reference/api/factors/).
2.  Reset all factors using the Okta Admin Console.

## Limitations & Known Issues

-   Note that any screenshots in the document may change over time since the time of the recording.
-   Keep in mind the Okta Workflows System Limits
    <a href="https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm&amp;sa=D&amp;source=editors&amp;ust=1637191704459000&amp;usg=AOvVaw1RY1AqSHmcKwrG3vHgA4ED" class="c0">https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm</a>
-   Error handling is not handled in this tutorial
