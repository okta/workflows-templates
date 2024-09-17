# Implement Backup of OIG Application Entitlements with Okta Workflows

## Overview

The Entitlement Management feature of Okta Identity Governance allows you to create, store, and manage application entitlements for the users in your Okta org. Entitlement Management ensures that users in an organization have the right permissions for each resource.

This template stores a copy of your entitlements to a Google Sheets document for backup purposes. You can run the flow on demand, or you can configure it to run periodically. You can monitor or troubleshoot changes to entitlements, or backup and automate responses to specific events.

## Prerequisites

Before you get started, ensure you have:

- Super admin access to your Okta tenant.
- Access to an Okta tenant with Okta Workflows enabled for your org.
- A Google account that you can connect to using the Google Sheets connector.

## Setup Steps

1. In your Google account, create a Google Sheets document.
1. In the new Sheets document, rename the main sheet (tab) to *Entitlements*.
1. Within the *Entitlements* sheet, create the following columns. These must be in the exact order and case:
    - `parentResourceOrn`
    - `parent.externalId`
    - `parent.type`
    - `applicationName`
    - `id`
    - `name`
    - `externalValue`
    - `description`
    - `multiValue`
    - `required`
    - `dataType`
    - `values` 
1. In Okta Workflows, open the **GetIndividualEntitlement** flow from the template.
1. Click the **Option** button on the **Google Sheets** card. 
1. Select **No** for the **Spreadsheet ID**. 
1. Select the Google Sheets document you previously created.
1. Select the *Entitlements* sheet (tab) within that document.
1. Click **Save**.

## Testing the Workflow Template

- Execute the **1.0 Pull Application List** flow. 
  > Admins can change the event to a **Scheduled Flow** to automate recurring backups of entitlements.
- Open the Google document and ensure that any applications with entitlements exist and their data is populated.
- Check the **Workflow API endpoint** flow for the events.

## Resources

- [Okta Entitlement Management](https://help.okta.com/okta_help.htm?type=oie&id=ext-entitlement-mgt)
