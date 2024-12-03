# Implement Anything-as-a-Source with Workday and Okta Workflows

## Overview

This template demonstrates how to use an Anything-as-a-Source (XaaS) integration to import records from Workday.

The workflow requests Workday records using the **Workday - Search Workers** card and stores the resulting list of records in a temporary Workflows table. The workflow then processes those records by creating import sessions and handling bulk import requests. These imports are handled based on the number of records to import and the parameters outlined in the XaaS documentation.

## Prerequisites

Before you get started, here are the things you need:

-   Access to an Okta tenant with Okta Workflows enabled for your org
-   Access to a Workday tenant

## Setup Steps

1. Create and configure a Custom Identity Source using the instructions at [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-use-xaas).
    > This template functions as an API client for XaaS, as described in the **Synchronize data with a Custom Identity Source** section.
1. Set up an Okta Workflows connection for Workday. See [Authorization](https://help.okta.com/okta_help.htm?type=wf&id=ext-workday-misc-authorization).
1. In the Workflows Console, go to the **Implementing XaaS with Workday** folder and edit the **Orchestrate Import from Workday** flow. 
    1. Update the **Okta - List Users with Search** card to use your Okta connection. 
    1. Update the **Workday - Search Workers** card to use your connection to Workday.
    1. Edit the **XaaS Import Session Handler** and **XaaS Bulk Import Request Handler** flows to use your Okta connection for the Okta cards.
1. In the **Scheduled Flows** folder, edit the **Import from Workday** flow. Update the **Scheduled Flow** event card to meet your requirements.
1. In the **Utilities** folder, change the **Create Import Session** and **Delete Import Session** flows so that the Okta cards use the correct connection.

## Testing this Flow

For testing, Okta recommends configuring and running this template inside an Okta Preview environment. 

If you don't want to test a full import, you can request a small batch of records from Workday:
1. Go to the **Implementing XaaS with Workday** folder
1. In the **Orchestrate Import from Workday** flow, edit the **Workday - Search Workers** card. Add a small value for the **Record Limit** field. 
1. You can manually initiate an import. Go to the **Scheduled Flows** folder and click **Test** in the **Import from Workday** flow. 
1. To verify the results, open the Admin Console. Go to **Reports > Import Monitoring** and expand the entry created by your test import.

## Limitations & Known Issues

To understand how the Anything-as-a-Source process works, see the following Okta documentation: 
- [Use Anything-as-a-Source](https://help.okta.com/okta_help.htm?type=oie&id=ext-anything-as-a-source)
- [Build an Anything-as-a-Source custom client integration](https://developer.okta.com/docs/guides/anything-as-a-source/)