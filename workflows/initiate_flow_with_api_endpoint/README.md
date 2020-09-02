# **Initiate Flow With API Endpoint** 


## <span style="text-decoration:underline;">Overview</span>

The Okta Workflow feature is a powerful tool to implement custom business logic. A popular integration is instead of creating an object directly into Okta (i.e. user, application or group ) with the Okta REST APIs, is to send the object request along with it’s JSON payload to Workflows. Then custom business logic such as checking existing objects in Okta or reaching out to a 3rd party to verify data can be accomplished. Based on the results of the dynamic logic, decisions can be made by Workflows providing distinct processing options.

The first step for implementation is creating a Parent Flow that accepts an API as it’s Action event. This example shows you how to configure this with proper security and element handling. 

We shall create a Bookmark Application integration for a new partner company that we are onboarding. Before creating the application object, Workflows will check for an existing object with the same value then gather existing application Id or create application object and report appId and all  results in the API Action response.


## Before you get Started / Prerequisites

Before you get started, here are the things you’ll need:



*   Access to an Okta tenant with Okta Workflows enabled for your org 


## Setup Steps



1. Select  parent flow titled “[Parent] Create Bookmark App”
    1. Make sure a connection is selected for the instances of the “Okta - Custom API Action” cards. This card is used to check and create the application object in your Okta tenant.
2. In the Action event card titled “ On Demain API Endpoint”  at the far left of the flow, click the “&lt;/>” link at the bottom right of the card.
    2. Check the radio button ‘Expose as Webhook”
    3. Copy the “Invoke URL” from the top of the popup up to but NOT including “?clientToken=&lt;xxxxxxxx>. Save this in a notepad
    4. Copy the “Client Token”. Save this in a notepad.
    5. These values shall be used by the calling party to initiate the operation.
3. Ensure that the flow is turned on.


## Testing this Flow

The easiest way to test a flow with an API Action event is to use POSTMAN



1. Open your POSTMAN console and bring up a new tab
    1. Choose POST action
    2. In the URL section insert the value you copied from the “Invoke URL” config.
    3. In the Headers section add the following key value pairs
        1. Accept: application/json
        2. Content-Type: application/json
        3. x-api-client-token: &lt;value copied from the “Client Token” config>.
    4. In the Body Section add the following payload
        4. Choose ‘raw’ data option, insert curly braces for JSON, add the following key value pairs.
        5. name: bookmark
        6. label: Discovery_test_app
        7. signOnMode: BOOKMARK
        8. requestintegration: false
        9. Url: http://okta.com
2. Hit the “Send” for the POSTMAN request.
3. View Flow History and verify it completed successfully.
4. Go to the Okta tenant Admin UI-> Applications -> Applications
    5. You should an application with the label “Discovery_test_app” 


## Limitations & Known Issues



*   None
