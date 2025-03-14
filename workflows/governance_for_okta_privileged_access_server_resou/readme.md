# Governance for Okta Privileged Access Server Resources Examples

## Overview
This solution represents Okta Privileged Access (OPA) objects as entitlements in Okta Identity Governance (OIG) within a sample app. It shows the contents of an OPA policy as an entitlement bundle so it can then be requested in OIG Access Requests. It also shows the mapping of users to OPA policies as entitlement bundle grants so that the access can be reviewed.

## Prerequisites

- Super admin access to your Okta tenant.
- Access to Okta Identity Governance.
- Access to Okta Privileged Access. 
    - At least one resource group is configured with the resource.
    - At least one policy is configured to access the resource.
- A configured Gmail Okta Workflows connector.
- A configured Jira Okta Workflows connector.
- A test app with governance enabled for OPA entitlement. 
    - Create a SAML/OIDC app with out of the box configuration and enable governance.

## Included Flows


### Read and store Okta Privileged Access Groups details

List of OPA Groups - This flow reads all the Okta Privileged Access groups details and stores them into a workflow table ("OPA Groups").

### Read and store Okta Privileged Access Policies details

#### List OPA Policies
This flow reads the Okta Privileged Access policy details (Labels and Shared Accounts) and stores them in these Workflows tables:
- OPA Labels
- OPA Vaulted Resource
- Policy Group details
- Policy Resource details

### Create Principals Entitlements

#### Principals Entitlement
This flow reads group information from the OPA Groups table and creates an entitlement for each group. 

### Create Infrastructure Access - Servers Entitlements

#### Infrastructure Access - Servers Entitlement
This flow reads labels from the OPA Labels table, and creates an entitlement for each label (note: label not actual server). 

### Create Shared Account Entitlements

#### Shared Account Entitlements
This flow reads labels from the OPA Vaulted Resourece table and creates an entitlement for each shared account.

### Create OPA policies as Entitlement Bundles

#### OPA Entitlement Bundles
This flow creates an entitlement bundle for each OPA policy, with the principals (groups), labels, and shared accounts as entitlements.

### Grant Entitlement Bundle as OPA policies

#### Grant Entitlement Bundle
This flow assigns an entitlement bundle to the users in the groups mapped to the policies. This allows you to see which OPA user is mapped to which OPA policy.

### Delegated Workflow for Entitlement Self Service

#### OPA Entitlement Request
This workflow is triggered upon user request for entitlement bundles. Add this workflow as an Access Request condition sequence.

### Configure Workflow to handle remediation

#### Access Certification Remediation
This workflow is triggered when an access reviewer revokes user access from the entitlement bundles.

## Testing the Flows

- Run the workflow and review the tables to verify the data.

- Configure self-service for the OPA entitlement bundle. 

- In the **Okta Identity Governance** menu, create Access Certifications to run a campaign for OPA entitlements.

## Additional Information

- [Okta Priviledged Access](https://help.okta.com/oie/en-us/content/topics/privileged-access/pam-overview.htm) - Help

- [Okta Priveleged Access](https://support.okta.com/help/s/product-hub/okta-privileged-access?language=en_US) - Support

- [Access Certifications](https://help.okta.com/en-us/content/topics/identity-governance/access-certification/iga-access-cert.htm) - Help

- [OPA API](https://developer.okta.com/docs/api/openapi/opa/)

- [IGA API](https://developer.okta.com/docs/api/iga/)

