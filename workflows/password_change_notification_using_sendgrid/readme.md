# Password Change Notification Using SendGrid

## Overview

End user security is a major concern for all CIAM customers. Account takeover can be mitigated by notifying an end user when their password has changed,thereby alerting them in the event that it was performed without their knowledge. Branding this notification across multiple application brands is important. Workflows can act on a password change event and send a customized notice to the end user. The trigger event which initiates the workflows is a User Password Changed event on the Okta Identity Platform. This occurs whether the user initiates a self service password change or a password is set by administrative action. A customized HTML email template is built which shall substitute user and event context dynamically.

## Prerequisites

Before you get started, here are the things you’ll need:

* Access to an Okta tenant with Okta Workflows enabled for your Org.
* Configure Sendgrid Workflow Connector.

## Setup Steps

### Configure SendGrid

1.  Create a test Sendgrid Account if you do not already have one:
    https://signup.sendgrid.com/?utm\_source=nurture&cvo&utm\_medium=sggetademoformlv&utm\_campaign=sgdemoty
2.  This integration
    requires
     a Sendgrid APIkey with Full Access
    Permissions
    . This will be used to configure the Sendgrid connector in
    Workflows.
    https://sendgrid.com/docs/ui/account-and-settings/api-keys/
3.  This integration
    requires
     a Sender Authentication for a domain or a single sender. In this
    example, a Single Sender Verification is used.
    https://sendgrid.com/docs/ui/sending-email/sender-verification/
4.  This integration
    requires
     a Dynamic Transactional Template that supplies the formatting and
    the substitution variable for the email. The substitution variables
    will be filled with data passed in from Okta Workflows.
    https://sendgrid.com/docs/ui/sending-email/how-to-send-an-email-with-dynamic-transactional-templates/\#design-a-dynamic-transactional-template
    Sendgrid has both a graphical template design tool and a code based
    template design tool.
    T
    his example uses
    SendGrid’s
    code based design tool. Here
    is the Dynamic
     Transactional Template used for this example.

```<!DOCTYPE html>
<html>

<head>
	<title> </title>
</head>

<body>
	<div style="background-color: #f3f1e8; margin: 0;">
	<table align="left" border="0" cellpadding="0" cellspacing="0" style="font-family: 'proxima nova', 'century gothic', 'arial', 'verdana', sans-serif; font-size: 14px; color: #5e5e5e; width: 98%; max-width: 600px; float: none; margin: 0 auto;">
	<tbody>
	<tr align="middle">
	<td style="padding-top: 30px; padding-bottom: 32px;"><img height="37" src="https://op1static.oktacdn.com/fs/bco/4/fs0x6s84s6XMV0DNz0h7" /></td>
	</tr>
	<tr bgcolor="#FFFFFF">
	<td>
	<table bgcolor="#EDF3F8" cellpadding="0" style="width: 100%; font-size: inherit; line-height: 20px; padding: 32px; border: 1px solid; border-color: #f0f0f0;">
	<tbody>
	<tr>
	<td style="color: #5e5e5e; font-size: 22px; line-height: 22px;">Password Changed</td>
	</tr>
	<tr>
	<td style="padding-top: 24px;">Hi {{fullName}} ,</td>
	</tr>
	<tr>
	<td style="padding-top: 24px;">The password was changed for your account; {{email}} .</td>
	</tr>
	<tr>
	<td style="padding-top: 24px; font-size: 18px; font-weight: 600; color: #5e5e5e; line-height: 24px;"> Details </td>
	</tr>
	<tr>
	<td style="line-height: 24px;"> When: {{published}}
	<br /> From: {{city}} , {{state}}
	<br /> Performed by: {{performedBy}} </td>
	</tr>
	<tr>
	<td style="padding-top: 24px; font-size: 18px; font-weight: 600; color: #5e5e5e; line-height: 24px;"> Don't recognize this activity? </td>
	</tr>
	<tr>
	<td>Your account may have been compromised; we recommend reporting the suspicious activity to your organization. Please contact your system administrator immediately.</td>
	</tr>
	<tr>
	<td style="padding-top: 24px;">If you experience difficulties accessing your account, send a help request to your administrator.</td>
	</tr>
	<tr>
	<td style="padding-top: 24px;">The security of your account is very important to us and we want to ensure that you are updated when important actions are taken.</td>
	</tr>
	</tbody>
	</table>
	</td>
	</tr>
	</tbody>
	</table>
	</div>
</body>

</html>
```

### Configure Okta

1.  In Workflows Console Connections, create a Sendgrid connector using
    the APIkey created above.
2.  Select flow titled “\[Sendgrid\] Password Change Notification”
    *  Selector Connector for "Sendgrid
        Send Email
        " card
3.  Ensure that flow is turned on.

## Testing this Flow

The easiest way to test a flow is to perform a password change from the
Okta End User Dashboard

1.  Login into the Okta Dashboard with your test account
2.  Navigate to the Settings UI on the Dashboard.
3.  Perform a Change Password operation.
4.  Go to the email client for your test user and inspect notification
    email.

## Limitations & Known Issues

*   Keep in mind the Okta Workflows System Limits
    https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm
