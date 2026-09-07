# Okta Privileged Access - Resource Creation Automation

## Overview

This Okta Workflow creates the resources in Okta and Okta Privileged Access for managing [Universal Directory Service Accounts](https://help.okta.com/oie/en-us/content/topics/privileged-access/pam-okta-accounts.htm) with [Okta Privileged Access](https://www.okta.com/products/privileged-access/).

## Prerequisites

Before you get started, here are the things you need:

- An understanding of Okta Privileged Access Management resources and how to design and configure privilege access for an enterprise. See [Okta OPA Learning course](https://learning.okta.com/page/courses-all?#product-okta-platform_okta-privileged-access)
- Super Admin access to an Okta tenant with Okta Workflows enabled for your org
- PAM Admin access to Okta Privileged Access
- [Okta Workflows Connector Configured](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/okta/okta.htm)
- [Okta Privileged Access Connector Authorized](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/oktaprivilegedaccess/overviews/authorization.htm)
- [Google Sheets Connector Configured](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/googlesheets/googlesheets.htm) (this is optional for recording the resources created)
- Okta Identity Governance (OIG) Plan (for access request)

## How to Get the Okta Approval Sequence ID for a Request

To get the Okta approval sequence ID for an access request, you have a few options depending on whether you are working with the Okta API, Okta Workflows, or the Okta Admin Console.

### 1. Via the Okta API
You can use the **Request Sequences API** to list all approval sequences associated with a specific resource. 

Make a `GET` request to the following endpoint:
```text
GET /governance/api/v2/resources/{resourceId}/request-sequences
```
*   **`resourceId`**: The unique identifier of the resource in Okta instance ID format or ORN format. 
*   **Permissions**: Requires the `okta.accessRequests.condition.read` OAuth 2.0 scope and the `ACCESS_REQUESTS_ADMIN` admin role.

**Response:**
The API will return a JSON list of sequences. The sequence ID is found in the `id` field of the response:
```json
{
  "data": [
    {
      "id": "61eb0f06c462d20007f051ac",
      "name": "Manager approval",
      "description": "Manager approval required"
    }
  ]
}
```

### 2. Via Okta Workflows
You can use the Okta Identity Governance (OIG) connector. 

1. Add the **Read request condition** action card to your flow.
2. **Inputs**: Provide the **Resource ID** and the **Request Condition ID**. 
3. **Outputs**: The card will return the condition's details, including a field specifically called **Approval Sequence Id**. 

### 3. Via the Admin Console (URL)
If you just need to grab the ID quickly for a script or configuration, you can find it using the Okta Admin Console interface:

1. Sign in to the Okta Admin Console as a Super Admin or Access Requests Admin.
2. Navigate to **Applications** > **Applications** and select the relevant app, or go to **Security** > **Administrators** > **Governance**.
3. Click the **Access requests** tab.
4. Go to edit a condition and click **Change sequence** or **Select sequence**.
5. When you open or select the specific sequence, look at your browser's address bar. The URL will often contain the sequence ID at the end of the path (for example: `https://<your-subdomain>.okta.com/next/sequences/61eb0f06c462d20007f051ac`).

## Delete Resources (Optional)

The subfolder `1a. DeleteResources` contains two flows that will delete the last deployed resources. It is advised to leave these flows off and only use when necessary.

## Setup Steps

### Setup: Okta Workflows Connection

1. Add the following custom scope to the connector and grant it on the Okta Workflow App
   - `okta.accessRequests.condition.manage`

### Flow 1: 1. CreateOktaResources

**Setup:**
1. Set Okta Connections in Okta Cards

**Actions taken:**
1. Create Okta Group
2. Set owner for created group
3. Create Group Push mapping for group in OPA app
4. Create Access request
5. Enable Access request

### Flow 2: 2. CreateOPAResources

**Setup:**
1. Set OPA Connections in OPA Cards
2. Update Group names for the following group searches:
   - OPA Admin group name
   - OPA Resource Admin group name
   - Delegated Security Admins group name
3. Configure Google Sheet to write to (or delete card if not needed)

**Actions taken:**
1. Create Resource Group (with resource admins and delegate resource admins set)
2. Add delegated security admins to created resource group
3. Create Project for 1 Week Rotation
4. Create Project for 1 Year Rotation
5. Set 1 week rotation password setting
6. Set 1 year rotation password settings
7. Archive the configuration to a Google Sheet.


### Flow 3a: 91. DeleteOktaResources (Optional)

**Setup:**
1. Set Okta Connections in Okta Cards

### Flow 3b: 92. DeleteOPAResources (Optional)

**Setup:**
1. Set OPA Connections in OPA Cards

## Configuration Data Reference

Example values for the `OPAConfigurationData` table:

| Field | Example Value |
|-------|---------------|
| org | technology |
| teamAbbreviation | it |
| type | sa |
| oktaGroupDescription | Okta Privilege Access Group, which allows members access to the Technology IT service accounts, when they meet access conditions. Ticket-1235 |
| oktaGroupOwner | username (can be updated via Workflow logic to use group if required) |
| accessRequestConditionName | OPA Technology IT Service Accounts |
| approvalSequenceID | 68e02f2a830d123456 |
| costCentreGroups | oig-iam,oig-security (separated by a comma) |
| opaResourceGroupName | opa-technology-it-prod |
| opaResourceGroupDescription | Technology IT Resource for Okta Privileged Access |

## Testing this Flow

This is how a builder might test the flow. Here's what it will look like when it's working.

1. Fill out the `OPAConfigurationData` table using the reference values above
   - For `approvalSequenceID`, see [How to Get the Okta Approval Sequence ID for a Request](#how-to-get-the-okta-approval-sequence-id-for-a-request)
2. Run **Flow 1: CreateOktaResources**
3. Verify the Groups created in the Okta org, the access request, and the Group Push in the OPA app
4. Verify the Resource group and 2 projects created in the OPA application
5. (Optional) Run the delete flows from **Flow 3** to clean up resources

## Limitations & Known Issues

Due to current OPA API limitations:
- Unable to create an Okta Service account policy (must be done manually and assigned to the newly created service account)
- Unable to manage Okta Service Accounts in OPA (must be done manually)

## License Agreement

The license information for the assets associated with this flopack is in the [LICENSE](https://github.com/okta/workflows-templates/blob/master/workflows/okta_privileged_access_resource_creation_automatio/LICENSE.md) file.