---
identifier: '53027f3f-2af7-40d0-9cd1-9384a5473a5c'
language: en
title: Suspicious Activity Reported Setup
---

<span id="SuspiciousActivityReportedSetup.xhtml"></span>

<span class="c7">Suspicious Activity Reported</span>

<span class="c1"></span>

<span class="c8">Overview</span>

<span class="c1">Suspicious Activity Reporting provides an end user with
the option to report unrecognized activity from an account activity
email notification. When end users receive a security email
notification, they can send a report by clicking Report Suspicious
Activity. Once they review the activity, they can confirm and complete
the report. Note the following:</span>

-   <span class="c1">The link is only valid for 7 days after the email
    is sent and the action.</span>
-   <span class="c1">The link expires after the user confirms
    suspicious activity.</span>

<span class="c1"></span>

<span class="c1">When a user reports suspicious activity, admins can
enable specific actions and audit system logs events to obtain further
details about the activity reported.</span>

<span class="c15"></span>

<span class="c8">Prerequisites</span>

1.  <span class="c10">Enable Security Notification Emails in your
    Okta org. To enable this feature, navigate to </span> <span
    class="c3">Security &gt; General</span> <span class="c10">, under
    </span> <span class="c3">Security Notification Emails</span> <span
    class="c1">.</span>
2.  <span class="c1">In order for end users to report suspicious
    activity, ensure that at least one of the following email
    notifications are enabled:</span>

-   <span class="c1">MFA enrolled notification email</span>
-   <span class="c1">MFA reset notification email</span>

3.  <span class="c10">Configure Suspicious Activity Reporting. Navigate
    to </span> <span class="c3">Security &gt; General</span> <span
    class="c10"> and make sure </span> <span class="c3">Report
    Suspicious Activity via Email</span> <span
    class="c1"> is enabled.</span>

<span class="c15"></span>

<span class="c8">Setup Steps</span>

1.  <span class="c1">In Okta Workflows, click on Connections. Create a
    new Slack Connection.</span>
2.  <span class="c1">Update your ACME with your Okta org name next to
    the Syslog Event URL note.</span>
3.  <span class="c10">Select your new Slack connection in the </span>
    <span class="c3">Send Message to Channel </span> <span
    class="c1">card and choose the Slack channel you would like to send
    the suspicious activity events to. If the channel is private, you
    will need to invite the Okta Workflows app to that channel.</span>

<span class="c15"></span>

<span class="c8">Testing this Flow</span>

1.  <span class="c1">Create a user in Okta and input an e-mail address
    for the primary or secondary e-mail attribute that you will have
    access to.</span>
2.  <span class="c1">Login to your Okta org with the new user and enroll
    the user in a factor.</span>
3.  <span class="c1">Check your e-mail for an Okta notification that
    contains an alert that a multi-factor authenticator has been
    enrolled for this account.</span>
4.  <span class="c1">Click on the Report Suspicious
    Activity button.</span>
5.  <span class="c1">Navigate back to Okta Workflows where the
    Suspicious Activity Event Flo is located and check the flow history
    for a successful completion.</span>
6.  <span class="c1">Navigate to the Slack channel you specified and
    validate that a message containing the details of the Suspicious
    Activity Event was sent.</span>

<span class="c15"></span>

<span class="c8">Limitations & Known Issues</span>

-   <span class="c10">Refer to the </span> <span class="c4"> [Okta
    Workflows System
    Limits](https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm&sa=D&source=editors&ust=1626128216262000&usg=AOvVaw0_GlANtign8G5tZNHCpoJH){.c16}
    </span> <span class="c1"> for event hooks and Okta API
    rate limits.</span>

<span class="c5"></span>
