Capture Phishing Events from GoPhish

Overview This template listens to phishing events captured by GoPhish
when a user opens a email phishing link or submits information or
credentials to a phishing page. This information can be used by Okta to
change login procedures and reset user credentials upon security events.
Before you get Started / Prerequisites Before you get started, you will
need: Access to an Okta tenant with Okta Workflows enabled for your org
Access to GoPhish as administrator An active user for test Setup Steps

Create an attribute, a group membership rule, and a group to track users
phished:

Access the Okta admin dashboard
(https://<tenant>-admin.okta.com/admin/dashboard) Create custom
attribute: Go to Directories \> Profile Editor On the row User
(default), click Profile Click Add Attribute Create an attribute to
store the date in which a user got phished. For example: Type: String
Display Name: User Phished Variable Name: userPhished Description: User
Phished User Permission: Read Only Change Source priority to Inherit
from Okta Create group: Click Directories \> Groups Click Add Group and
then follow the instructions to create a group for users who signed a
contract. (i.e., User Phished) Create a group rule: On the Groups page,
click the Rules tab Create a rule to add users to the User Phished group
when the User Phished attribute is filled: Name: User Phished IF: Use
Okta Expression Language (advanced) String.len(user.userPhished) \> 0
THEN: Assign to User Phished Save and then Activate the Rule.

Add the GoPhish template: Click Workflow \> Workflows Console. Click
Templates Open the Capture Phishing Events from GoPhish template Click
Add template A workflow folder named WebhookGoPhish is imported.

Configure the workflow: On the Workflow Console, click Home Click
WebhookGoPhish \> GoPhish.SecurityEvent flow Make sure a connection is
selected for the Read User, Update User, and Custom API Action cards On
the Update User card, click the Gear Icon (bottom right corner) \>
Choose Field On the input section, select the field you set to store the
phishing status (i.e., User Phished) If not selected, drag the time
field from the API Endpoint card to the User Phished value. Save the
flow Click Home \> WebhookGoPhish Enable both the GoPhish.SecurityEvent
and the Util.AuthenticateWebhook flows. On the GoPhish.SecurityEvent,
click the gear icon, then click API Access. Select Expose as Webhook and
record the invoke URL (You will need that to configure GoPhish) Close
the API endpoint settings pop-up, then click Tables. Open the GoPhish
Webhook Config table Update and record the HMAC Secret, then click Save
Note: The HMAC secret will be used by GoPhish to authenticate webhook
calls to Okta, providing authentication and non-repudiation.

Configure GoPhish: Access GoPhish as Administrator. Click Webhooks \>
New Webhook Enter the following data: Name: Okta URL: Paste the Invoke
URL from Okta Secret: Paste the HMAC secreted defined in the workflow
table Is Active: selected Click Save To confirm the integration is
working, click Ping. You should get a success message.

Testing this Flow

In GoPhish, launch a new campaign for users you already have in Okta.
Open the link provided with the phishing email. Back on Okta, go to the
GoPhish.SecurityEvent flow and select Flow History. You should see an
execution for the user Open the user profile in Okta. Confirm that the
phishing status attribute is filled and that the user is a member of the
User Phished group. Optionally, submit the user credentials in the
phishing page. Confirm if the webhook is executed once again, that the
user phishing status is updated, and that the user receives an email
requesting a password reset from Okta.
