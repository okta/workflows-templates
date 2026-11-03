# Implementing XaaS for Bulk Device Import

## Overview

This template demonstrates how to use Anything-as-a-Source (XaaS) to import device records into Okta from a CSV file. The workflow downloads the CSV from Google Drive using the Google Drive - Download File card and stores the records in a temporary Workflows table. The workflow then processes those records by creating import sessions and handling bulk import requests. These imports are handled based on the number of records to import and the parameters outlined in the XaaS documentation.

The template includes a flow to import (create and update) devices, and an optional flow to delete them.

## Prerequisites

Before you get started, here are the things you need:

- Access to an Okta tenant with Okta Workflows and Okta Lifecycle Management enabled for your org
- Access to a Google Drive account to store the CSV file
- A CSV file of devices with the columns serialNumber, platform,
and displayName

## Setup Steps

1. Create and configure a Custom Identity Source using the instructions at Use Anything-as-a-Source. Make sure profile sourcing is enabled on the app. Copy the app's Application ID from the browser URL.
2. Grant the okta.identitySources.manage, okta.identitySources.read, and okta.apps.read scopes to the Okta Workflows OAuth app, then reauthorize your Okta connection in Workflows.
3. Set up a Workflows connection for Google Drive. See Authorization.
4. Upload your CSV to Google Drive and copy its File ID from the file's URL.
5. Go to the Implementing XaaS for Bulk Device Import folder and edit the Orchestrate Import from csv File flow. In the Assign card, enter your Application ID. In the Google Drive - Download File card, enter your File ID and select your Google Drive connection.
6. Make sure every Okta card uses your Okta connection and has your Custom Identity Source app selected.
7. Both entry flows are scheduled by default to run at 9:00 AM Pacific on the 1st of every month. Review the schedules before turning on the flows.
8. Turn on all flows in the folder.

## Testing this Flow

For testing, Okta recommends configuring this template in an Okta Preview environment.

1. Create a CSV with a few test devices, using serial numbers that don't already exist in your org.
2. Upload it to Google Drive and update the File ID in the Orchestrate Import from csv File flow.
3. Run the Import from csv (Create) flow.
4. To verify the results, open the Okta Admin Console. Go to Directory > Devices and search for one of your test serial numbers. Imports are processed in the background, so devices can take a few minutes to appear.

## Limitations & Known Issues

- Only one import session can be active at a time. Don't run the create and delete flows at the same time.
- The template uses each device's serial number as its externalId.
- To understand in depth how the Anything-as-a-Source process works, see the following Okta documentation: Use Anything-as-a-Source and Build an Anything-as-a-Source custom client integration.
