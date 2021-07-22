Capture Phishing Events from GoPhish

# Overview
This template listens to phishing events captured by GoPhish
when a user opens a email phishing link or submits information or
credentials to a phishing page. This information can be used by Okta to
change login procedures and reset user credentials upon security events.

## Prerequisites 
Before you get started, you will need:
* Access to an Okta tenant with Okta Workflows enabled for your org
* Access to GoPhish as administrator
* An active user for test

 
## Setup Steps

Create an attribute, a group membership rule, and a group to track phished users.

1. Access the Okta admin dashboard
(https://<tenant>-admin.okta.com/admin/dashboard).
1. Create custom attribute: Go to **Directories** > **Profile Editor**.
1. On the row User (default), click **Profile**.
1. Click **Add Attribute**.
1. Create an attribute to store the date in which a user got phished. For example:
```
Type: String
Display Name: User
Phished Variable Name: userPhished
Description: User Phished
User Permission: Read Only
```

6. Change Source priority to **Inherit from Okta**.
7. Create group: Click **Directories** > **Groups**.
8. Click **Add Group** and then follow the instructions to create a group for users who signed a
contract (for example, User Phished).
9. Create a group rule: On the Groups page, click the **Rules** tab.
10. Create a rule to add users to the User Phished group
when the User Phished attribute is filled:
`Name: User Phished IF: Use Okta Expression Language (advanced) String.len(user.userPhished) \> 0
THEN: Assign to User Phished Save and then Activate the Rule.`

11. Add the GoPhish template: Click **Workflow** > **Workflows Console**.
12. Click **Templates**.
13. Open the **Capture Phishing Events from GoPhish** template.
14. Click **Add template**. A workflow folder named WebhookGoPhish is imported.
15. Configure the workflow: In the Workflow Console, click **Home**.
16. Click **WebhookGoPhish > GoPhish.SecurityEvent** flow.
17. Make sure a connection is selected for the Read User, Update User, and Custom API Action cards.
18. On the Update User card, click the gear Icon (bottom right corner).
19. Choose **Field**.
20. On the input section, select the field you set to store the phishing status (for example, User Phished). If not selected, drag the time
field from the API Endpoint card to the User Phished value.
21. Save the flow.
22. Click **Home > WebhookGoPhish**.
23. Enable both the **GoPhish.SecurityEvent** and the **Util.AuthenticateWebhook** flows.
24. On the GoPhish.SecurityEvent flow, click the gear icon, then click **API Access**.
25. Select **Expose as Webhook** and record the invoke URL. You will need that to configure GoPhish.
26. Close the API endpoint settings dialog, then click **Tables**.
27. Open the GoPhish Webhook Config table.  
28. Update and record the HMAC Secret, then click **Save**.  

**Note**: The HMAC secret will be used by GoPhish to authenticate webhook
calls to Okta, providing authentication and non-repudiation.

29. Configure GoPhish: Access GoPhish as Administrator.
30. Click **Webhooks > New Webhook**.
31. Update several data values: Enter a value for the **Name** field.
32. For **Okta URL**, paste the Invoke URL from Okta.
33. For **Secret**, paste the HMAC secreted defined in the workflow
table
34. For **Is Active**: Make sure it is selected.
35. Click **Save**.
36. To confirm the integration is working, click **Ping**. Expect to receive a success message.

## Test this Flow

1. In GoPhish, launch a new campaign for users you already have in Okta.
1. Open the link provided with the phishing email.
1. In Okta, go to the **GoPhish.SecurityEvent** flow and select **Flow History**. You should see an execution for the user.
1. Open the user profile in Okta.
1. Confirm that the phishing status attribute is filled and that the user is a member of the
User Phished group.
1. Optionally, submit the user credentials in the phishing page. Confirm the following:  
* The webhook is executed once again
* The user phishing status is updated
* The user receives an email requesting a password reset from Okta.
