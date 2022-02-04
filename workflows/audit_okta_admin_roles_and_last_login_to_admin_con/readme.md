# Audit Okta Admin Roles and Last Login to Admin Console

## Overview

Periodically auditing admin access to your Okta org can help to ensure
that users are assigned to the correct admin roles and to identify users
who may no longer need admin access based on inactivity. This template
identifies all admin users (users who are assigned to the Okta Admin
Console application) and writes their information--including admin role
assigned and last login to the Okta Admin Console--to a table.

## Prerequisites

## Before you get started, you will need:

-   Access to an Okta tenant with Okta Workflows enabled for your org
-   Two Okta API Scopes must be granted for the Okta Workflows OAuth
    application (see Setup Steps below).

## Setup Steps

1.  In the Okta Admin Console, view the application called “Okta
    Workflows OAuth” and click on the “Okta API Scopes” tab. Ensure that
    the scope titled “okta.logs.read” is granted. If it is not, grant
    the scope and re-authorize your Okta connector in the Okta Workflows
    console.
2.  In the Okta Admin Console, view the application called “Okta
    Workflows OAuth” and click on the “Okta API Scopes” tab. Ensure that
    the scope titled “okta.roles.read” is granted. If it is not, grant
    the scope and re-authorize your Okta connector in the Okta Workflows
    console.
3.  Import the flowpack into Okta Workflows.
4.  Make sure the Okta cards in both flows are configured to use your
    Okta org connector.
5.  In the flow titled “1 - Identify Okta Administrators”, configure the
    Scheduled Flow event to run at your desired frequency.
6.  In the flow titled “1 - Identify Okta Administrators” configure the
    List Users Assigned to Application to use the application called
    “Okta Admin Console”. This will give us a list of all admin users.

## Testing this Flow

This template is designed to run on a schedule, but you can test it
manually by clicking the “Test” button when viewing the “1 - Identify
Okta Administrators” flow in the console.

1.  Click the “Test” button.
2.  Wait for the flow to finish, then either review the results in the
    “AdminsOkta - Login History” table. Note that the table is cleared
    each time the flow is run.

## Limitations & Known Issues

-   Refer to the
    <a href="https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm&amp;sa=D&amp;source=editors&amp;ust=1637190095246000&amp;usg=AOvVaw08ttORajd4_d9qX2OxPvpL" class="c7">Okta Workflows System Limits</a>
     for event hooks and Okta API rate limits.
-   The Okta syslog maintains 90 days of history. If an administrator
    has not logged in within that time frame, that is indicated in the
    audit table.
-   The “limit” parameter on the API call to the /logs endpoint is set
    to 100. You may need to increase this value if you have a lot of
    admin users.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYxODY3OTE5OV19
-->