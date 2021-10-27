<div>

<span class="c7"></span>

</div>

# <span class="c13">Send a Welcome Email to New User of an Application</span>

## <span class="c10">Overview</span>

A welcome email is the first impression that an organization makes on a new customer or employee. Welcome emails can deliver a special promotion code, provide information to enhance the user experience, or just send a friendly hello. This template demonstrates how a welcome email can be sent automatically to a new user.

## <span class="c10">Prerequisites</span>

1.  <span class="c7">Access to an Okta tenant with Okta Workflows
    enabled</span>
2.  A configured Okta Connection. To configure a connection, see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).
3.  A configured Gmail connection. To configure a Gmail connection, see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/gmail/overviews/authorization.htm).

## <span class="c10">Setup</span>

<span class="c7">In this template, a welcome email is automatically sent
out to users who gain access to Okta Workflows.This template can be modified to
meet your business needs.</span>

<span class="c6"></span>

1.  <span class="c7">Send a welcome email to Okta Workflow users: Set
    **Options** on the User Assigned to Application card to Okta Workflows
    by selecting the following:  
    - Application: `okta\_flow\_sso`  
    - Application Instance: `Okta Workflows`

2. Click **Save**.</span>

<span class="c6"></span>

<span class="c8">  

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 329.33px;">![](images/image2.png)</span>

<span class="c6"></span>

3.  <span class="c7">Check your Gmail connection in the Gmail Send Email
    card</span>.
3.  <span class="c7">Click **Save** to save the flow.</span>
4.  Toggle the **Flow is OFF** switch to **Flow is ON**.

## <span class="c10">Test</span>

1.  <span class="c7">Add an employee to Application Okta Workflows. Flow is automatically triggered.  
    </span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 329.33px;">![](images/image1.png)</span>

<span class="c6"></span>

2.  <span class="c7">Check Flow History.</span>
3.  The employee automatically receives a welcome email<span class="c7">.  
    </span>

<span class="c8">        </span><span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 529.50px; height: 211.29px;">![](images/image3.png)</span>

## <span class="c10">Limitations & Known Issues</span>

-   <span class="c0">The screenshots in this readme file may
    change over time. If they do, recognize that there may be changes, but focus on the key terms and proceed as best you can. </span>
-   Keep in mind the Okta Workflows [System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
-   <span class="c0">Error handling is not addressed in this template.
    </span>

<span class="c6"></span>
