# Capture Device Security Events from VMware WS1

## Overview

This template listens to VMWare Workspace One security events to capture when a device is compromised or out of compliance.

This information can be used by Okta to determine which systems a user can access and their security level.

## Before you get Started / Prerequisites

Before you get started, you will need:

- Access to an Okta tenant with Okta Workflows enabled for your org
- Access to VMWare WorkspaceOne UEM as administrator
- An active user and managed device for test

## Setup Steps

Create an attribute, a group membership rule, and a group to track users with devices compromised or out of compliance:

1. Access the Okta admin dashboard (https://\<tenant>-admin.okta.com/admin/dashboard)
2. Create custom attribute:
    1. Go to **Directories \> Profile Editor**
    2. On the row User (default), click **Profile**
    3. Click **Add Attribute**
    4. Create an attribute to store the document signature date. For example:
        1. Type: String
        2. Display Name: Device Status
        3. Variable Name: deviceStatus
        4. Description: User Device Status
        5. User Permission: Read Only
3. Create group:
    1. Click **Directories \> Groups**
    2. Click **Add Group** and then follow the instructions to create a group for users who signed a contract. (i.e., Device Compromised)
4. Create a group rule:
    1. On the Groups page, click the **Rules tab**
    2. Create a rule to add users to the Under NDA group when the NDA
        signed date field is filled:
        1. Name: Device Compromised
        2. IF: user.deviceStatus contains "Compromised"
        3. THEN: Assign to Device Compromised
    3. Save and then Activate the Rule.

### Add the VMWare WorkspaceOne template

1. Click **Workflow** > **Workflows Console**
2. Click **Templates**
3. Open the **Capture Security Events from VMWare WorkspaceOne** template
4. Click **Add template**
5. A workflow folder named WebhookWorkspaceOne is imported.

### Configure the workflow

1. In the Workflows Console, click **Home**
2. Click **WebhookWorkspaceOne > WorkspaceOne.SecurityEvent** flow
3. Make sure a connection is selected for the **Read User**, **Update User**, and **Clear User Sessions** cards
4. On the **Update User** card, click the **Gear Icon (bottom right corner) > Choose Fields**
5. On the input section, select the field you set to store the document signature date (i.e., Device Status)
6. If not filled, enter "Device Compromised" as the device status
7. Save the flow
8. Click **Home > WebhookWorkspaceOne**
9. **Enable** both the **WorkspaceOne.SecurityEvent** and the **Util.AuthenticateWebhook** flows.
10. On the **WorkspaceOne.SecurityEvent**, click the **gear icon**, then click **API Access**.
11. Select **Expose as Webhook** and record the invoke URL *(You will need that to configure WorkspaceOne)*
12. Close the API endpoint settings pop-up, then click **Tables**.
13. Open the **WorspaceOne Webhook Config** table
14. Update and record the username and password fields, then click **Save**

    _**Note**: These credentials will be used by WorkspaceOne to authenticate the webhook notification in Okta._

### Configure WorkspaceOne UEM

1. Access WorkspaceOne UEM as Administrator.
2. Click **Groups and Settings**
3. Click **All Settings**
4. On the left menu, navigate to **System > Advanced > API > Event Notifications**
5. Click **Add Rule**
6. Enter the following data:
    1. **Name**: Okta Security Event
    2. **URL to Publish**: Paste the Invoke URL you got from Okta Workflows
    3. **Format**: JSON
    4. **Username**: Enter the username you defined on the Workflow table
    5. **Password**: Enter the password you defined on the Workflow table
    6. **Events**: select the following events:
        - Device Compliance Status Change
        - Device Compromised Status Change
7. Click **test connection** and confirm the test is successful.
8. Click **Save**

## Testing this Flow

1. In WorkspaceOne UEM, mark a test device as out of compliance.
2. Back in Okta, go to the **WorkspaceOne.SecurityEvent** flow and select Flow History. You should see an execution for the user.
3. Open the user profile in Okta. Confirm that the device status attribute is filled and that the user is a member of the **Device Compromised** group.
