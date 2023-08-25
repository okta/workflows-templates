# Implement Anything-as-a-Source with Personio and Okta Workflows

## Overview

This template demonstrates how to use Anything-as-a-Source (XaaS) to import records from Personio. The workflow requests records from Personio using the **Personio - List Users** card and stores the resulting list of records in a temporary Workflows table. The workflow then processes those records by creating import sessions and handling bulk import requests. These imports are handled based on the number of records to import and the parameters outlined in the XaaS documentation.

## Prerequisites

Before you get started, here are the things you need:

-   Access to an Okta tenant with Okta Workflows enabled for your org
-   Access to a Personio tenant

## Setup Steps

1. Create and configure a Custom Identity Source using the instructions at [Use Anything-as-a-Source](https://help.okta.com/en-us/Content/Topics/users-groups-profiles/usgp-use-anything-as-a-source.htm). This template functions as an API client for XaaS, as described in the **Synchronize data with a Custom Identity Source** section.
1. Set up a Workflows connection for Personio. See [Authorization](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/personio/overviews/authorization.htm)
1. Go to the **Implementing anything-as-a-source with Personio using Okta Workflows** folder and edit the **Orchestrate Import from Personio** flow. Ensure that the **Okta - List Users with Search** card uses your Okta connection. Also ensure that the **Personio - List Users** card uses the correct connection to Personio.
1. Edit the **XaaS Import Session Handler** and **XaaS Bulk Import Request Handler** flows to use the Okta connection on the Okta cards.
1. In the **Scheduled Flows** folder, edit both the **Import from Personio (Create & Activate)** and **Import from Personio (Deactivate & Delete)** flows. Update the **Scheduled Flow** event card in both flows to meet your requirements.
1. In the **Utilities** folder, change the **Create Import Session** and **Delete Import Session** flows so that the Okta cards use the correct connection.

## Testing this Flow

For testing, Okta recommends configuring this template in an Okta Preview environment. 

If you don't want to test a full import, you can request a small batch of records from Personio:

1. Go to the **Implementing anything-as-a-source with Personio using Okta Workflows** folder
1. Edit the **Personio - List User** card in the **Orchestrate Import from Personio** flow and add a small value for the **Record Limit** field. 
1. You can manually initiate an import. Go the **Scheduled Flows** folder and click **Test** in the **Import from Personio (Create & Activate)** flow. 
1. To verify the results, open the Okta Admin Console. Go to **Reports > Import Monitoring** and expand on the entry created by your test import.

## Limitations & Known Issues

-  To understand in depth how the Anything-as-a-Source process works, see the following Okta documentation: [Use Anything-as-a-Source](https://help.okta.com/en-us/Content/Topics/users-groups-profiles/usgp-use-anything-as-a-source.htm) and [Build an Anything-as-a-Source custom client integration](https://developer.okta.com/docs/guides/anything-as-a-source/).