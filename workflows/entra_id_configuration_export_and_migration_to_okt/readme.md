# Entra ID Configuration Export & Migration to Okta

## Overview

This template contains flows for:
- Exporting app configuration from Entra ID. 
  - Data captured includes acs/redirect URL, Entity ID (for SAML Apps), and Group Assignments.
- Exporting Conditional Access Policies from Entra ID.
  - Data captured includes policy state, conditions, grant controls, and session controls.
- Configuring apps in Okta based on the data exported from Entra ID.
  - Creating an app in Okta (OIN, Custom SAML, Custom OIDC).
  - Creating the Assignment Group if it doesn't exist.
  - Assigning the group to the app. 

## Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows enabled for your org.
- Access to an Entra ID tenant to create new app registrations and assigning Graph API permissions.

## Setup Steps
### Entra ID
1. Register an app in Entra ID.
1. Provide the following permissions for the app:
   - Application.Read.All.
   - AppRoleAssignment.ReadWrite.All.
   - Policy.Read.All.
1. Grant admin Consent to the app.
1. Create a client secret for the app.
1. Copy the app (client) ID, client secret and OAuth 2.0 token endpoint(v2).

### Okta Workflows
1. Create a new API Connector Connection. 
   - Entra ID Connector with Auth Type None.
1. Update each of the flows having the API Connector card to the newly created connection.
1. Update the Okta connection to include okta.apps.manage scope if not already included. This is only needed if you plan to create apps in Okta from the exported Entra ID data.

## Testing this Flow

### Export app Data from Entra ID

1. Run the **1.0 Get EntraID app Information - Parent Flow**.
1. Provide the *AzureTokenEndPoint*, *ClientID*, *ClientSecret* captured as part of the Entra ID setup steps.
1. Once the flow completes the execution, validate the exported data in the **EntraID app Export Table** table.

### Export Conditional Policies from Entra ID

1. Run the **2.0 Get EntraID Conditional Access Policies - Parent Flow**.
1. Provide the *AzureTokenEndPoint*, *ClientID*, *ClientSecret* captured as part of the Entra ID setup steps.
1. Once the flow completes the execution, validate the exported data in the **EntraID Conditional Access Policies Export Table** table.

### Create apps in Okta

1. Open the **EntraID app Export Table** table and update the *Action* column for the apps you want to migrate to Okta.
1. Run the **3.0 Configure apps in Okta - Parent Flow**.
1. Once the flow completes the execution, validate that the apps whose action was set to migrate are created in Okta.

## Limitations & Known Issues

- The app migration flow provides a sample OIN app, such as Service Now, for migrating to Okta. It can be expanded to the other OIN Apps.
- Data captured from Entra ID in the tables are documented in the overview section but can be expanded as needed.
- Direct assignments to the app in EntraID aren't collected