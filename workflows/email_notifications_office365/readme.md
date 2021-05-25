# Send Email Notifications with Office 365


## Overview

This workflow sends an email notification with Office 365 when a user is suspended in Okta. It allows administrators to easily track user suspensions. This is a generic notifications template - you can easily swap out both the event or the email provider (to Gmail) based on your notifications use case. 


## Prerequisites

Before you get started, here are the things you will need:



*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Access to an account for Office 365 
*   Access to a user who can be suspended


## Setup Steps

Please follow these step-by-step instructions to set up this workflow. 



1. Open the parent flow titled “Send Email Notifications with Office 365”
2. In the “Send Email” card, update the “To” field with the email address you would like the email to be sent to.
3. Save your flow. Turn on your flow in the top toolbar.


## Testing this Flow

Please wait one minute after saving and turning on your Flow before you attempt to trigger it. It takes about one minute for an event hook to register after turning on a flow.



1. In the Admin Console, hover over “Directory” and click “People”
2. Select a user, and in their “More Actions” menu in the top right of your screen, click “Suspend”
3. In the Workflows console, click “Flow History” in the top left corner of your screen
4. Verify that each card of your Flow has a success check mark
5. Verify that you received the _User Suspended Notification_ email


## Limitations & Known Issues

There are no limitations or known issues, at this time.
