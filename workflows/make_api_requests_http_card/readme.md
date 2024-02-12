# Make API Requests with the HTTP Request Card


## Overview

In many organizations that integrate with web services, there is a requirement to be able to invoke a SaaS application (or on-premise API secured via an API gateway) secured Http(s) end-point.  This sample illustrates the use of the Okta Workflows HTTP Raw Request card for GET, POST operations with sample *Content-Type* of *json* and *x-www-form-urlencoded*. It also illustrates how to process JSON using a variety of Okta workflow cards. 

The template is the end result of working through the tutorials "Making API Requests" [Part One](https://learn.workflows.okta.com/tutorials/unauthenticatedapi-walkthrough/ ), 
[Part Two](https://learn.workflows.okta.com/tutorials/addbasicapi-walkthrough/) and [Part Three](https://learn.workflows.okta.com/tutorials/processjson-walkthrough/). The flow also illustrates additional cards using the [Postman Echo Service](https://docs.postman-echo.com/?version=latest) that is useful for debugging and troubleshooting. 

## Prerequisites

Before you get started, you will need:

1. Access to an Okta tenant with Okta Workflows enabled for your org 
 

## Setup Steps

1. In Okta Workflows, set up a new API connector:
    1. In the Admin Console, go to Workflow > Workflows console.
    1. On the Connections tab, click New Connection.
    1. Select API Connector.
        1. In the Description field, enter `HTTP PetStore`.
        2. Set Auth Type to Basic.
        3. For username, enter `admin` and for password, enter `secret`. 
            > Note: Because the actual API is not authenticated, the values don’t matter.
2. Configure Okta Workflows flows to use the connection setting you just created and the `Pets` Okta Workflows table:
  1. In "Pet Store API-start to test endpoint", choose the "Http Petstore" connection setting for all the five "Http Raw Request" cards. Turn the flow On.
  2. In "[Subflow 1.1] Create Row In Okta Tables" choose the Okta table `Pets` for the "Create Row" card. Turn the flow On.
    

## Testing these Flows

1. Run the "Pet Store API-start to test endpoint" with input parameter as follows:

    | Input parameter  | Value | 
    |:----------|:----------|
    | `createAPICallParametersDynamically` | `True`    | 
    | `url`    |(leave blank)| 
    |`ParamKey1`|(leave blank) |
    |`ParamValue1`| (leave blank)|
    |`ParamKey2`| (leave blank)| 
    |`ParamValue2`|(leave blank)|

    - Observe that the `Pets` Okta table that is a part of this template has three entries.
    - Review the Flow History for all the Http Raw Request Cards.
2. Run the "Pet Store API-start to test endpoint" again with input parameters as follows:

     | Input parameter  | Value | 
     |:----------|:----------|
     | `createAPICallParametersDynamically`    | `False`    | 
     | `url`    | `http://petstore-demo-endpoint.execute-api.com/petstore/pets` | 
     |`ParamKey1`| `type`|
     |`ParamValue1`|`Dog`|
     |`ParamKey2`|`page`| 
     |`ParamValue2`| `2`|
    - Observe that the `Pets` Okta table that is a part of this template has three additional entries same as the prior run (the order may be different).
    - Review the Flow History for all the Http Raw Request Cards.


## Limitations & Known Issues

1. Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) to limit the entries in the "Pets" Okta table. 
2. When invoking HTTP endpoints consider any applicable rate limits of the SaaS application (or http endpoint) that you are invoking. You should almost always set up error handling on the card to retry periodically. 
