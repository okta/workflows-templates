# Sync Okta Group Membership with Office 365 Unified Groups

## Overview

This template syncs your Okta group membership with your Office 365 Unified Group using custom profile attributes and Okta Workflows. If you don't have an Office 365 Unified Group, you can create one with the included workflow and then manage the group membership using Okta groups.

## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled.

2. Configured Okta Connection. See the configuration steps for the [Okta connector](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta).

3. Configured Office 365 Admin Connection. See the configuration steps for the [Office 365 Admin connector](https://help.okta.com/okta_help.htm?type=wf&id=ext-office365admin-misc-authorization).

## Setup Steps

This workflow template consists of seven flows and two tables:

* **1.0 Okta Group Updated**: This flow executes when an Okta group profile attribute has been updated. It checks to see if the Okta group has the **emailEnabled** attribute set to **True**.

* **1.1 Add Okta User to Office 365 Group**: This flow iterates over the users assigned to an Okta group and adds those users to the corresponding Office 365 Group.

* **2.0 User Added to Okta Group**: This flow adds users in Office 365 Groups when a user is added to an Okta group.

* **3.0 User Removed from Okta Group**: This flow removes users from Office 365 Groups when a user is removed to an Okta group.

* **4.0 Okta Group Deleted**: This flow executes when an Okta group is deleted. It deletes the corresponding Office 365 Group.

* **\[UTIL\] Create Office 365 Group**: This flow creates an Office 365 Group and updates the email-enabled Okta group with the Office 365 Group ID.

* **\[UTIL\] Error Handling**: This flow handles errors encountered in the flow pack and writes them to a Workflows table.

* **Table - Okta Groups Synced with Office 365 Unified Groups**: This table is used to monitor Okta groups that sync with Office 365 Unified Groups and to delete the Office 365 Unified group when an Okta group is deleted.

* **Table - Errors**: This table is used to write error messages from the connector actions.

### Okta Admin Console Configuration

Add three extra Okta group profile attributes. These attributes allow Okta to sync Okta group membership with Office 365 Unified Groups.

1. Go to **Directory > Profile Editor**
1. Select the **Groups** tab.
1. Select your Okta group and add the following attributes:

> **Display Name** - Email
>
> **Variable name** - `email`
>
> **Data type** - string

>
> **Display Name** - Email Enabled
>
> **Variable name** - `emailEnabled`
>
> **Data type** - boolean

> **Display Name** - Office 365 ID  
>
> **Variable name** - `office_365_ID`
>
> **Data type** - string

### Okta Workflows Configuration

1. Enable all flows contained in the flowpack.
2. Ensure you have configured both the Okta Connector and the Office 365 Admin Connector.

## Testing

1. In the Okta Admin Console, create or choose an Okta group that you want to sync with an Office 365 Unified Group. Ensure that there is at least one user in that group.
1. Open the **Profile** tab for the Okta group that you want to sync with Office 365.
1. Enter the email address that you would like to create for your Office 365 Unified Group.
1. Set the **emailEnabled** profile attribute to **True**.
1. After you click **Save**, the **1.0 Okta Group Updated** flow is triggered.
1. Check the Flow History from **1.1 Add Okta User to Office 365 Group** and **\[UTIL\] Create Office 365 Group** to see the event results.

## Limitations & Known Issues

* Keep in mind the [Okta Workflows system limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits)
