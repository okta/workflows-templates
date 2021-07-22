---
identifier: '53027f3f-2af7-40d0-9cd1-9384a5473a5c'
language: en
title: Suspicious Activity Reported Setup
---

<span id="SuspiciousActivityReportedSetup.xhtml"></span>

<span class="c1"></span>

# Overview

The Suspicious Activity Reported template provides an end user with the option to report unrecognized activity from an account activity email notification. When end users receive a security email notification, they can send a report by clicking Report Suspicious Activity. Once they review the activity, they can confirm and complete the report.  
    
Note the following:

* The link is only valid for 7 days after the email is sent and the action.
* The link expires after the user confirms suspicious activity.

<span class="c1"></span>

When a user reports suspicious activity, admins can enable specific actions and audit system logs events to obtain further
details about the activity reported.

## Prerequisites

1.  Enable Security Notification Emails in your Okta org. To enable this feature, under **Security Notification Emails**, navigate to **Security > General**. 
2. In order for end users to report suspicious activity, ensure that at least one of the following email notifications are enabled:

* MFA enrolled notification email
* MFA reset notification email

3. Configure Suspicious Activity Reporting. Navigate to **Security > General** and make sure **Report Suspicious Activity via Email** is enabled.

## Setup Steps

1. In Okta Workflows, click on **Connections**.
2. Create a new Slack Connection.
3. Update your ACME with your Okta org name next to the Syslog Event URL note.
4. Select your new Slack connection in the Send Message to Channel card and choose the Slack channel you would like to send the suspicious activity events to. If the channel is private, you will need to invite the Okta Workflows app to that channel.

## Test this Flow

1. Create a user in Okta and input an email address for the primary or secondary email attribute to which you will have access.
2. Login to your Okta org with the new user and enroll the user in a factor.
3. Check your email for an Okta notification that contains an alert that a multi-factor authenticator has been enrolled for this account.
4. Click on the **Report Suspicious Activity** button.
5. Navigate back to Okta Workflows where the Suspicious Activity Event flow is located and check the flow history for a successful completion.
6. Navigate to the Slack channel you specified and validate that a message containing the details of the Suspicious Activity Event was sent.

## Limitations & Known Issues

Refer to the [Okta Workflows System Limits](https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) for event hooks and Okta API rate limits.
