# Send Email With Attachment

## Overview

This template demonstrates sending an email using Gmail with attachment
from Google Drive.

## Prerequisites

* Access to an Okta tenant with Okta Workflows enabled.
* Configured Okta connection. Steps to configure are posted at <a href="https://www.google.com/url?q=https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflow-connect-your-applications.htm%23Authenti&amp;sa=D&amp;source=editors&amp;ust=1635954653582000&amp;usg=AOvVaw1vfr-QDHjxpFkZyJZ4c_ol">https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflow-connect-your-applications.htm#Authenti</a>.
* Configured Gmail connector. Steps to configure are posted at <a href="https://www.google.com/url?q=https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/gmail/gmail.htm&amp;sa=D&amp;source=editors&amp;ust=1635954653583000&amp;usg=AOvVaw2Pm56pGWmgGTvtuy5XbTPO">https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/gmail/gmail.htm</a>.
* Configured Google Drive connector. Steps to configure are posted at <a href="https://www.google.com/url?q=https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/googledrive/googledrive.htm&amp;sa=D&amp;source=editors&amp;ust=1635954653583000&amp;usg=AOvVaw1W2fi11c3ZXDaF4nQhP03G" >https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/googledrive/googledrive.htm</a>.
* An Okta group called `Contractors` with users assigned to it.
* A PDF document in Google Drive to send as attachment.
      

## Setup Steps

This template sends all users in the Okta group `Contractors` an email with the latest copy of workplace health & safety guidelines (a PDF document). This template contains two flows:

* "Find users and load file": This Flow finds and loads a file from Google Drive, then finds all users in the Okta group `Contractors` and calls the Child flow for each user.
* "Send email with attachment": This is a Child Flow that sends a personalized email to each user
    with the file retrieved in the parent flow.  

### Find users and load file:
1.  Check the Okta connector
2.  In the Text Compose card, change the text to reflect the name of your PDF document.
3.  Check the Google Drive Card to ensure it is using the correct connection.
4.  Change the Google Drive Search Files card -&gt; Options -&gt; Parent Folder to the parent folder of the PDF document.

### Send email with attachment:
1. Check the Gmail card to ensure it is using the correct connection.
2. Turn both flows on.

## Testing

1.  Test the the flow by navigating to the "Find users and load file" Flow and clicking on the "Test" button".
2.  Users in Okta Group Contractors receive an email with attachment.

## Limitations & Known Issues

* Note that the screenshots in the document may change over time since the time of the recording. If they do, recognize that there may be changes, but focus on the key terms and proceed as best you can.
* Keep in mind the Okta Workflows System Limits <a href="https://www.google.com/url?q=https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm&amp;sa=D&amp;source=editors&amp;ust=1635954653587000&amp;usg=AOvVaw2THico_YMaAjkxL55wGz8P">https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm</a>.
* Error handling is not handled in this tutorial.
