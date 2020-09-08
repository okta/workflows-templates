# Send Active Directory Credentials to Manager

### <span style="text-decoration:underline;">Overview</span>

Many organizations use Microsoft Active Directory to manage user credentials, also known as AD DelAuth. While Okta’s Active Directory integration allows for user provisioning, organizations need a solution to communicate the account credentials to the user. When onboarding new hires, companies may need to set up these accounts ahead of time. However, the user may not have system or email access until the day of joining. In these scenarios, companies can email the account credentials to the user’s manager with a one-time password. This template helps demonstrate how to identify users being added to Active Directory using Okta’s “User Assigned to Application” event, fetch their manager’s email address and send email notification. 

The flow leverages Okta’s Expire Password API is to set a one-time password using the tempPassword=true flag: 
https://developer.okta.com/docs/reference/api/users/?_ga=2.144064246.2110324271.1598044957-208344352.1593389880#expire-password

    
### <span style="text-decoration:underline;">Before you get Started / Prerequisites</span>

Before you get started, you will need:

1. Access to an Okta tenant with Okta Workflows enabled for your org 
2. Integration with Active directory and Active directory provisioning enabled. 
3. User profile in Okta with manager username or manager email address. 
4. Service mailbox that can be configured in Okta Workflows as the sender’s email address.



### <span style="text-decoration:underline;">Setup Steps</span>

1. Setup a connection to your Okta tenant. 
2. Setup a mail connection to O365 or google.
3. Select the “AD-Activation” flow from the folder.
4. In the event card, select the ‘options’ and choose the ‘active_directory’ application. Select the desired instance of Active Directory where the user will be  provisioned.
5. In the ‘Get Assigned User for Application’ card, select the ‘options’ and choose the Active Directory application name from the dropdown. 
6. Modify the email ‘Subject’ and ‘Body’ content that is configured using ‘Text-Compose’ cards, as needed. You can also construct the ‘Body’ in html format inside the ‘Text-Compose’ card. 
7. Populate the managerID in Okta user profile with proper manager Okta Username.
8. If you use O365 update the connection in the final O365 card. If you use Google remove the O365 card and add Gmail card and use sendEmail. 
9. Click Save. Be sure to select “Save All Data”.
10. In the top toolbar of the Workflow console, toggle the “Flow is OFF” switch to “ON”.


### <span style="text-decoration:underline;">Testing this Flow</span>

1. Create a new user in your Okta tenant and add the user to the AD provisioning group.
2. Open your flow and view Flow History. You should see a successful flow run.
3. Validate the manager’s email. They should have received a notification along with the user’s one-time password.


### <span style="text-decoration:underline;">Limitations & Known Issues</span>
1. Okta workflows does not have any on-premise connector at this time for writing. AD Provisioning will be through Okta.
