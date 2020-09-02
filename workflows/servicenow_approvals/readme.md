# Workflows Template: ServiceNow Approvals

## Overview


In many organizations that use ServiceNow, a subset of access may require approvals. Maybe you have users that are provisioned birthright access when created but a specific group access needs to be approved before being provisioned. For these use cases you can get approvals using ServiceNow. 

## Before you get Started/Pre-requisites: 

Before you get started, you will need:
- Access to an Okta tenant with Okta Workflows enabled for your org 
- Create a free Personal Development Instance of ServiceNow at <https://developer.servicenow.com>. This template was built on the ServiceNow Paris Platform version. 



## Setup Steps in Okta Admin Console:

1. Create a target group named `Millenium Falcon Group` in Okta. 

2. Click into the Okta Group and note the groupId from the Url. 
    - For example, if the url is `https://.../admin/group/00gr85hfpc9W1bR4c0h7` the group Id is `00gr85hfpc9W1bR4c0h7`. Note the Group Id for your environment. We will use this value in the "Process Resolution" Okta workflow. 



## Setup Steps in Okta Workflows:


1. Set up ServiceNow Connection setting in Okta Workflows
	- [x] In the Username and Password fields, type your **admin** ServiceNow login credentials. In the Instance field, enter your ServiceNow subdomain value.You can find the Service Now subdomain value in the instance’s URL. For example in *https://dev57240.service-now.com/* the instance name will be *dev57240*.

2. Configure Okta Workflows flows to use the ServiceNow connection setting that you just created, the "Approval Requests" Okta Workflows table and the Group Id of the "Millenium Falcon Group":

| In Flow ..  |for Card ..  | you have to ..  |
|:----------|:----------|:----------|
"Trigger ServiceNow Approval"| "ServiceNow Create Incident"   | Choose the ServiceNow connection setting   |
| "Trigger ServiceNow Approval" | "Create Row in Approval Requests"   | make sure in Options it references the "Approval Requests" Okta table   |
|"Process Resolution"|"Search For Incident-Search Rows" | make sure in Options it references the "Approval Requests" Okta table |
|"Process Resolution"|"Update Incident-Update Row" | make sure in Options it references the "Approval Requests" Okta table |
|"Process Resolution"|"Okta Add User to Group"|update the GroupId to the value for your environment (from Step 2 of the "Setup Steps in Okta Admin Console section" above)|

   
 - Note: when you set the ServiceNow Connection setting in "Trigger ServiceNow Approval" for the "ServiceNow Create Incident" card, you may have additional inputs that now appear blank (such as Active, Activity Due, Actual End). - please uncheck these.

3. Turn on the "Trigger ServiceNow Approval" flow

4. Turn on the "Process Resolution" flow

5. Record the Endpoint setting for the "Process Resolution" flow

    - In the "Process Resolution" flow, for the "On Demand API Endpoint" card click on the `</>` icon
    - Choose the "Expose as Webhook" option for the "API Endpoint settings" configuration
    - Copy the "Invoke URL" value. You will need this later when you configure the **ServiceNow** **RESTMessage**. This will be something like <https://../api/flo/../invoke?clientToken=...>
 


## Setup Steps to configure the Personal Development Instance of ServiceNow: 

### Incidents Form Design


1.  Type **Incidents** in the Filter Navigator at the top left and
    adjust filter criteria to see a list of incidents. This is sample
    data that is pre-populated in the ServiceNow instance.

2.  Click on **Incidents** under the Self-Service category.

3.  Click on any Incident.

>
> We will be adding some fields to this type of incident. The fields can
> be added by clicking on the **hamburger icon** at the top left.


4.  Click on **Configure** and then click on **Form Design.**

5.  Underneath the Fields menu, scroll down to find **Resolution
    notes**. Drag the tile over to the Incident and drop it underneath
    **Watch List**.


6.  Do the same for **Resolution code**.

7.  Scroll up to find the **Approval** field and drag it underneath
    **On** **hold reason**.

8.  Click **Save** at the upper right of the web page.

9. Close the "form design browser" tab.

10. Back on the specific Incident tab, refresh the screen. You should now see the following additional fields on the Incident view: 
    - `Resolution Notes`
    - `Resolution code`
    - `Approval`


### Create a REST Message

1.  In the Filter Navigator type **REST Message** and click REST Message under Outbound. This is where we will be configuring the call back to Okta workflows.


2.  Click on **New** to create a REST Message.

3.  In the **Name** field, type **Okta Workflow Endpoint**. (Enter the name of the REST Message exactly as shown here - this is referenced by the ServiceNow Business Rule)

4.  In the Endpoint field, we will put in a dummy endpoint:
    <http://localhost.com/api>

5.  Click **Submit** to save your changes.

6.  Click on the **Okta Workflow Endpoint** REST Message. 

7.  Click on HTTP Request.

8.  Click **New**.

9. In the **Name** field, type **POST**.

10. From the **HTTP method** dropdown menu, select **POST**. Click **Submit**

11. Click in to the **HTTP Methods** > **POST** that you just created. You will now use the "Invoke URL" of "Process Resolution" that you recorded previously in the "Setup Steps in Okta Workflows>step 5". Add this Okta workflow endpoint in the **Endpoint** field. 


12. Click **Update**.

13. Click back into your **POST** HTTP Method. Choose the **HTTP Request** tab.

14. Under ** HTTP Headers**, hover over the **Insert a new row text** under Name and with your mouse double click to be able to add a http header.

15. Type in **Content-Type** and click the green check mark.


16. Under Value, double click with your mouse and type in **application/json**. Click on
    the green check mark.

17. Under HTTP Query Parameters, find the **Content** text box field. Paste the
    code from the `httpMethodPostContent.txt` file. This looks like this: 

	`{"incidentNumber":"${incidentNumber}", "incidentMetadata":"${incidentMetadata}","incidentState":"${incidentState}"}`

18. Click **Update**.

19. You will be sent back to the main REST Message screen. Click on the
    HTTP **POST** Method you just created nd make sure you are on the **HTTP Request** tab.

20. Scroll down to find **Variable Substitutions**.

21. Create three new Variable subsitutions `incidentMetadata`, `incidentNumber`,  `incidentState` :
    - `incidentMetadata`
        - Click **New**.
        - In the **Name** field enter `incidentMetadata`. 
        - Leave the other fields with the default values i.e. the Method is "POST", "Escape type" is set to "No escaping", "Application" is set to "Global" and the test value blank. Click "Submit" to save. 
    
    - `incidentNumber`
        - Click **New**.
        - In the **Name** field enter `incidentNumber`. 
        - Leave the other fields with the default values i.e. the Method is "POST", "Escape type" is set to "No escaping", "Application" is set to "Global" and the test value blank. Click "Submit" to save. 
    
    - `incidentState`
        - Click **New**.
        - In the **Name** field enter `incidentState`. 
        - Leave the other fields with the default values i.e. the Method is "POST", "Escape type" is set to "No escaping", "Application" is set to "Global" and the test value blank. Click "Submit" to save. 
    

22. Verify at this point you have three variable substitutions for **Method=POST**
- `incidentMetadata`
- `incidentNumber`
- `incidentState` 

23. Click on **Update** button to save the POST configuration. 
24. Click on **Update** at top right corner to save REST Message "Okta Workflow Endpoint"


### Create a Business Rule

1.  In the filter navigator, type **Business Rules** and choose **System Definition \> Business Rules** (Note: Do not choose Metrics \> Business Rules).


2.  Click on **New** to create a business rule.

3.  In the **Name** field, type **Okta Incident State Change to Resolved**.

4.  In the **Table** dropdown menu, select **Incident \[incident\]**.

5.  Check the box next to **Advanced**.

6.  Scroll down to the **When to run** tab.

7.  Check the box next to **Update**.

8.  Click on the **\-- choose field \--** dropdown menu and select
    **Incident state**.

9.  Click on the **\-- None \--** dropdown menu and select **Resolved**.

10. Click on the **Actions** tab,

11. Click on **\-- choose field \--** and select **State**. Click on
    **\-- None \--** and select **Resolved**.

12. Click on **\-- choose field \--** and select **Incident state**.
    Click on **\-- None \--** and select **Resolved**.


13. Click on the **Advanced** tab.

14. In the **Script** field, select all existing code and replace with the code from the `businessRuleOktaIncidentStateChangeToResolved.txt` file. This looks like:


	`(function executeRule(current, previous /*null when async*/) {`

	`var sm = new sn_ws.RESTMessageV2("Okta Workflow endpoint","post");`

	`//Might throw exception if message does not exist or not visible due`
	`to scope.`

	`sm.setStringParameter("incidentMetadata",current.short_description);`

	`sm.setStringParameter("incidentNumber",current.number);`

	`sm.setStringParameter("incidentState",current.approval);`

	`var response = sm.execute(); `

	`//Might throw exception if http connection timed out or some issue with sending request itself because of encryption/decryption of password.`

	`})(current, previous);`


15. Click **Submit**.

## Testing this flow
- In the Okta Admin console:

    - create a staged user `Hans Solo`
    - Activate `Hans Solo`
    - In Okta syslog you will see an entry that shows `Hans Solo` has been activated.

- In Okta Workflows

    - `Trigger ServiceNow Approval` flow history should show a flow instance.
    - A row is created in the "Approvals Request" Okta table with the ServiceNow Incident Number. Note the Incident Number so that we can find it easily in the ServiceNow console. 

- In ServiceNow console
    - In "Filter Navigator" type "Incidents"
    - Choose Self-Service">"Incidents"
    - In the filter expression (that is next to the "funnel" icon) click on "All" - this removes the filter and shows all Incidents.
    - In the "Search" - change to "Number" and put in the Incident Number referenced in the Okta "Approval Requests" table. Press the "Enter" key to execute the search for the specific Incident. 
    - Click into the specific Incident. 
    - In the Incident populate the fields as follows:

 | Incident field  | Value  | 
|:----------|:----------|
| Caller   | Choose any caller - this is a mandatory field  that has to be populated with a value  | 
| Resolution Notes   | Enter any text such as "Add to group" -  this is a mandatory field  that has to be populated with a value  |
| Resolution code | Choose any option such as "Solved (Permanently)" - this is a mandatory field  that has to be populated with a value|  
| Approval | Choose "approved" - this is a mandatory field and is checked within the flow logic|

- Click on the "Resolve" button at top right of the Incident view.

- In Okta Workflows

    - `Process Approval` flow history should show a flow instance.
    - The row is updated in the "Approvals Request" Okta table for the ServiceNow Incident Number. 

- In Okta Workflows

    - Check `Millenium Falcon Group` group membership is assigned to the user  `Hans Solo` in Okta. 

## Limitations & Known Issues

- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) to limit the entries in the Okta table and the api requests to the Okta Workflow Invoke URL endpoint. 
- The Okta table is not intended to be an audit log - instead use Okta syslog and ServiceNow logs.
- This approval flow uses ServiceNow Incidents rather than ServiceNow Self Service Requests that some organizations may prefer for approval requests.
- The template is intended to be adapted for real-world scenarios. Group Ids to be assigned may, for example, be looked up in Okta Tables rather than hardcoded etc.  
