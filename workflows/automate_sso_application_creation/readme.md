# Automate SSO Application Creation

## Overview

This integration streamlines the process of creating applications in Okta by using ServiceNow (SNOW) as the front-end for approvals and Okta Workflows for backend automation.
It provides a self-service way for app owners to request and create secure and auditable Okta apps.

## Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows enabled for your org.
- Access to a ServiceNow tenant.
- An Application Access Request ID. See [Get started with Access Requests](https://help.okta.com/oie/en-us/content/topics/identity-governance/access-requests/ar-get-started.htm).
- The Integration Hub plugin in ServiceNow.

## Setup Steps

**Setup Steps in Okta Workflows**

1. Set up an Okta connection in Okta Workflows. See [Okta connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/okta/okta.htm).
2. Set up a ServiceNow connection in Workflows. See [ServiceNow connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/servicenow/servicenow.htm).
3. Set up a Gmail or Office 365 Mail connection. See [Gmail connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/gmail/gmail.htm) or [Office 365 connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/office365mail/office365mail.htm).
4. Create a new folder and import the template into your Workflows environment.
5. Configure the cards.
    - Update all Okta cards and SNOW cards with the correct connections that were set up in step 1 and 2 (if required).
        - *1. SSO App Create.*
            1. Else: SNOW connection for Custom API Action card.
        - *2a. SAML Create App.*
            1. Try: SNOW connection for Custom API Action.
            2. Try: Okta connection for Custom API Action.
            3. If/Else If Try: SNOW connection for Custom API Action.
            4. If/Else Else: SNOW connection for Custom API Action.
            5. If/Else Else: SNOW connection for Custom API Action.
            6. Try: Okta connection for Custom API Action.
            7. Try: SNOW connection for Custom API Action.
        - *2b. OIDC Create App.*
            1. Try: SNOW connection for Custom API Action.
            2. Try: Okta connection for Custom API Action.
            3. If/Else If: SNOW connection for Custom API Action.
            4. If/Else If Try: SNOW connection for Custom API Action.
            5. If/Else Else: SNOW connection for Custom API Action.
            6. If/Else Else: SNOW connection for Custom API Action.
            7. If/Else If: SNOW connection for Custom API Action.
            8. Try: SNOW connection for Custom API Action.
            9. Try, If Error: SNOW connection for Custom API Action.
        - *3. Group Assignment Flow.*
            1. Try: SNOW connection for Custom API Action.
            2. Try: Okta connection for Assign Group to Application.
            3. Try: SNOW connection for Update Task.
            4. Try, If Error: SNOW connection for Custom API Action.
            5. Try: SNOW connection for Custom API Action.
            6. Try: Okta connection for Custom API Action.
            7. Try, If Error: SNOW connection for Custom API Action.
            8. If/Else If Try: Okta connection for Custom API Action.
            9. If/Else If Try: SNOW connection for Update Task.
        - *4. Policy Assignment Flow.*
            1. Try: SNOW connection for Custom API Action.
            2. Try: Okta connection for Custom API Action.
            3. Try: SNOW connection for Custom API.
            4. Try, If Error: SNOW connection for Custom API Action.
        - *5. Comms*
            1. Gmail.
        - *Create Group*
            1. Okta connection for Custom API Action (API Call for Dupe).
            2. Okta connection for Create Group.
            3. If/Else If: Okta connection for Read User.
            4. If/Else If: Okta connection for Add User to Group.
            5. If/Else If: Okta connection for Custom API Action.
            6. If/Else If: SNOW connection for Update Task.        
6. Update Hard-Coded Values
    - **6.1. SAML & OIDC Application Creation**
        1. **2a. SAML Create App**
            - **Call Flow:** `policyID` — The authentication policy ID the app will be mapped to.
        2. **2b. OIDC Create App**
            - **Call Flow:** `policyID` — The authentication policy ID the app will be mapped to.
        3. **How to find the `policyID`:**
            - **Navigate:** Go to `Security` > `Authentication Policies` in the Okta Admin Console.
            - **Select:** Choose the specific policy you want to use (e.g., *2FA Phishing Resistant*).
            - **Identify:** The ID is the alphanumeric string at the end of the browser URL.
            - **Example:** If the URL is `.../admin/auth-policies/rst12345abcdefg`, the ID is `rst12345abcdefg`.
    - **6.2. Group Assignment Flow**
        1. **Group Assignment Flow**
            - **Text Compose:** Add *Application Access Request ID*.
        2. **How to find the Approval Sequence ID:**
            - **Navigate:** Go to `Identity Governance` > `Access Requests`.
            - **Tab:** Select the `Sequences` (or Request Types) tab.
            - **Click:** Enter the specific sequence built for these application access requests.
            - **Identify:** Check the browser URL address bar; the ID is the string following `/sequences/` or `/types/`.
            - **Example:** If the URL ends in `/sequences/aqw98765xyz`, the ID is `aqw98765xyz`.
7. Turn on all of the Okta Workflows.

**Setup Steps in ServiceNow**

# Okta Workflows & ServiceNow Integration Guide

## Phase 1: Import and Deployment
- **Download Source:** Download the Update Set XML file from the servicenow-okta-application-management folder: `sys_remote_update_set_[sys_id].xml`.
- **Import to ServiceNow:** Navigate to **Retrieved Update Sets** and import the XML file.
- **Preview & Address Errors:** Run a preview on the update set. You will encounter ** errors **; review and **Accept all** of them to proceed with the commit.
- **Set Application Scope:** Ensure your system's application scope is set to `Okta Workflows`.

## Phase 2: Connection Configuration
- **Configure Credentials:** Navigate to **Connections & Credentials** and locate the **Okta Workflows** configuration.
- **Create New Connection:** Establish a new connection using your specific workflow endpoint as the URL.
  - **Example URL format:** `https://[your-subdomain].workflows.okta.com/`
- **Authentication:** Configure the connection to use the **Client Token** as the authentication method.

## Phase 3: System Properties Setup
Navigate to the `sys_properties` table and update the following records with your specific environment values:

| Category | Property Name | Value to Provide |
| :--- | :--- | :--- |
| **Create Group** | `x_1647345_okta_w_0.iam.okta-workflow.create-okta-group.clientToken` | Client Token |
| **Create Group** | `x_1647345_okta_w_0.iam.okta-workflow.create-okta-group.workFlowId` | Workflow ID |
| **SSO App Create** | `x_1647345_okta_w_0.iam.okta-workflow.sso-onboarding.clientToken` | Client Token |
| **SSO App Create** | `x_1647345_okta_w_0.iam.okta-workflow.sso-onboarding.workFlowId` | Workflow ID |

## Phase 4: Final Configuration & Testing
- **Catalog Item Setup:** Navigate to the **"Create a new SSO integration to Okta"** Catalog Item and complete any remaining configuration requirements.
- **Validation:** Access the form via the **Service Portal** to perform an end-to-end test.

## Testing these Flows

1. Fill out the ServiceNow Application Form.
2. Have the request approved.
3. Open your flow and view Execution History.
4. Check the ServiceNow tickets for SCTASK updates and closures.
5. Check your Okta org for the new application and configuration.

## Limitations & Known Issues

- Okta Integration Network (OIN) Applications - these are still created via the Okta Admin Console GUI.
