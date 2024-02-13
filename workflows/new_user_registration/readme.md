# New User Registration


## Overview

In this template, the context of new user registrations is processed by customizing the branding, birthright enablement, and link to external systems for duplication verification and Preference Management. The External Check for existing users is implemented with an API stub. In an actual use case, a specific HTTP Connector would be configured along with the needed API Request JSON to match specific system requirements. Similarly, Preference Management is implemented with a stub, but can be substituted with an Okta Workflow built-in connector such as DataGrail or OneTrust in addition to any system that supports API communication.


## Prerequisites

1.   Access to an Okta tenant with Okta Workflows enabled for your org.
2.   Access to an email service. In this template, Office 365 Mail is used.
3.   You must configure the Office 365 Mail connector with a connection.
4.   Create an Okta group named "AcmeUsers".
5.   Create an API connector with the Auth for the mock API as none. The External API calls in this sample are using a mock API. 


## Setup Steps

1. Select flow: “Create_User_wExtCheck”
   1. Make sure a connection is selected for the instance of the “HTTP | Raw Request” card. This card is used to link to a mock external duplicate user check.
   2. In the Action event card titled “On Demand | API Endpoint”  at the far left of the flow, click the “&lt;/>” (Endpoint settings) link at the bottom right of the card.
      1. Check the radio button "Expose as Webhook”
      2. Copy the “Invoke URL” from the top of the popup up, but NOT including “?clientToken=&lt;xxxxxxxx". Save this in a notepad.
      3. Copy the “Client Token”. Save this in a notepad.
      4. These values shall be used by the calling party to initiate the operation.
   3. Make sure a connection is selected for instance of the "Okta | Create User" card. If it was not selected automatically, select the necessary connection manually.
2. Select flow: "[O365] Send Email HTML".
    1. Select Connection for "Office 365 Mail" card if it was not selected automatically.
3. Select flow: “[helper] process USA customer”
    1. Make sure a connection is selected for the instance of the “HTTP | Raw Request” card. This card is used to link to a mock external preference management system.
4. Select flow: “[helper] process CANADA customer”
    1. Make sure a connection is selected for the instance of the “HTTP | Raw Request” card. This card is used to link to a mock external preference management system.
5. Select flow: "[helper] Add User to Okta GroupName". 
    1.  Make sure a connection is selected for the instances of the “Okta” cards.If it was not selected automatically, select the necessary connection manually.
6. Ensure all these flows are turned on:
    * Create_User_wExtCheck
    * [O365] Send Email HTML
    * [helper] process USA customer
    * [helper] process CANADA customer
    * [helper] Add User to Okta GroupName


## Testing these Flows

The easiest way to test a flow is to send new user registration payload to Workflows using POSTMAN.

1. Open your POSTMAN console and bring up a new tab
    1. Choose POST action
    2. In the URL section insert the value you copied from the “Invoke URL” config.
    3. In the Headers section add the following key-value pairs
        * Accept: application/json
        * Content-Type: application/json
        * x-api-client-token: &lt;value copied from the “Client Token” config>.
    4. In the Body Section add the following payload
        * Choose ‘raw’ data option, insert curly braces for JSON, add the following key-value pairs.

```json
{
"email":"test.user1@mailinator.com",
"password":"Password@1",
"firstName":"test",
"lastName":"user1",
"countryCode":"US",
"hasOptedOutTracking":"false",
"hasOptedOutSolicit":"false"
}
```
**Note: The POSTMAN collection is also available from the [repo](https://github.com/okta/workflows-templates/blob/master/workflows/new_user_registration/WorkflowsDiscovery.postman_collection.json)**

2. Hit the “Send” for the POSTMAN request.
3. View Flow History and verify it was completed successfully.
4. Go to the Okta tenant Admin UI-> People.
5. Verify the test user exists with correct Group memberships and profile attributes.


## Limitations & Known Issues

*   There are no limitations or known issues, at this time.
