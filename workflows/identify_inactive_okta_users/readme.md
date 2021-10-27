# <span class="c14">Identify inactive Okta users</span>

## <span class="c12">Overview</span>

You can determine whether your Okta tenant has stale accounts that were otherwise missed by a manual deprovisioning process using specific criteria to identify inactive users. This task can then allow expensive application licenses, for example, to become available to other users. This template searches for all users in an Okta tenant whose last login date was before a certain date, and writes information about those users to a table in Workflows. The data in the table can be exported to a CSV file as a download, or as an attachment to an email for periodic reporting. An additional enhancement to this template can also be the suspension of inactive users.

## <span class="c14">Prerequisites</span>

1.  <span class="c0">Access to an Okta tenant with Okta Workflows
    enabled</span>
2.  A configured Okta Connection. To configure a connection, see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).

## <span class="c3">Setup</span>

### <span class="c9">Okta Admin Console configuration</span>

1.  <span class="c0">In the flow labeled **Identify
    inactive Okta users**, configure the Scheduled Flow card to run at the
    frequency you desire by clicking on the clock icon at the bottom of
    the card. Weekly is probably a reasonable frequency, though you may
    want to run it more or less often depending on your reporting
    needs.</span>
2.  Make sure that the <span class="c6">Okta - List Users with
    Search</span><span class="c0"> card has the correct Okta connection
    selected.</span>
3.  In the <span class="c6">Okta - List Users with Search</span><span
    class="c0"> card, specify the time window you want to report on by
    editing the **timeWindowDays** field. The card is already set to
    search for users who haven’t logged in within the past 30
    days.</span>
4.  <span class="c0">Make sure both flows are turned on.</span>

## <span class="c3">Test</span>

1.  Open the flow labeled **Identify inactive Okta users**
    and click the **Test** button at the top of the page.

    <span
    class="c6">Date & Time - Now</span> cards have been included before
    and after the <span class="c6">Okta - List Users with
    Search</span><span class="c0"> card. These are simply there to allow
    you to see how long it took the template to process all of your
    Active users.

    When the flow finishes, simply compare the start and
    finish times (the dates values of the cards). If you have 100,000 or
    more users in Okta, this template could take a few hours to run. You
    can verify that it is working by navigating to the **Tables** tab and
    opening the table labeled **Inactive Users**. As the template finds
    users who haven’t logged in within the time window you specified,
    new rows will appear in the table.</span>
2.  When the flow is complete, you can download the CSV file to share.
    Optionally, you could modify the flow labeled **Check Last Login date
    and add to table** to actually suspend inactive users by placing an
    <span class="c6">Okta - Suspend User</span> card at the very end (to
    the right of <span class="c6">Table - Create Row</span><span
    class="c0">) of the flow. Test the flow thoroughly first to ensure
    that it is working as expected.</span>

## <span class="c3">Limitations & Known Issues</span>

-   This template uses the **Stream all matching records** option of the
    <span class="c6">Okta - List Users with Search</span><span
    class="c0"> card. Streaming does not require pagination, and instead
    streams each matching record directly to the helper flow. Since we
    are iterating over all active users in the Okta org, this may take
    some time to run.
-   Also note that there is a limit to the number of
    rows a table can have (see System Limits below), so if you have an
    org with hundreds of thousands of users or more, using this template
    is not recommended without some enhancements to avoid system
    limits.</span>
-   Keep in mind the Okta Workflows [System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
-   <span class="c0">Error handling is not addressed in this template.
        </span>

<span class="c0"></span>
