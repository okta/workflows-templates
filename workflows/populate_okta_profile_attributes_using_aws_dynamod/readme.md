# Populate Okta profile attributes using AWS DynamoDB and Lambda

## Overview

At Okta, we see our customers deploy and build a broad range of customer-facing applications and user experience is top of mind for developers when building these applications. An important element of that is collecting user information. When developers avoid lengthy forms and overwhelming data capture as part of the onboarding process, users have a more seamless experience, right from the outset of using a new application.

But for various reasons like marketing and communication, we still need certain attributes populated on the users profile in Okta. The ideal situation is to be able to automatically update that information off-line after the respective account has been created, without the need for the user to manually input that data. Based on a value the user entered during registration, it is often possible to use that value to lookup associated values. Okta Workflows is the perfect tool for this use case.

This workflow demonstrates how a user's profile can be enriched with associated values that have been retrieved from an external table. In this instance, we will be using a simple Amazon Web Service (AWS) DynamoDB table and the retrieval of data will be facilitated by an AWS Lambda function. This workflow utilizes the AWS Lambda Connector to call the respective Lambda function. This use case is based on a user entered Zip Code which will be used to retrieve associated values like City, State and TimeZone.

The setup steps below include configuration of the AWS DynamoDB table and Lambda function. In order to maintain the focus on Okta Workflows, we have made the table and function setup as simple as possible.

## Workflow Summary

Here is a summary of the flows included in the flowpack:

**1.0 - Load Zip Table**

This flow is to be used only to populate the Zip Code data in the AWS DynamoDB table and is designed to only be run once.

This is the parent flow and is initiated manually via the workflow test facility. The flow will retrieve supplied Zip Code data from the workflow table, sample-zip-data. For each Zip Code record retrieved, the flow will call the helper flow, 1.1 - Create Zip Table Record.

**1.1 - Create Zip Table Record**

This is a helper flow and is called by the parent flow, 1.0 - Load Zip Table, for each Zip Code record. For each Zip Code record, the flow will call a pre-configured AWS Lambda function via the Okta Lambda Connector. The Lambda function will insert the passed Zip Code data into a AWS DynamoDB table.

**2.0 - Update User Profile**

This flow is initiated via an Okta - Create User event. The flow will start by retrieving the respective users profile, including the Zip Code attribute. If the Zip Code has been populated, the flow will format a read request and using the Lambda connector, will call the pre-configured Lambda function to retrieve the corresponding Zip Code record from the DynamoDB table. The response will then be parsed and the user's profile in Okta will be updated with the associated values including City, State and Time Zone.

## Before you Get Started / Prerequisites

Before you get started, here are the things you'll need:

- Access to an Okta tenant with Self Service Registration and Okta Workflows enabled
- Access to an AWS account and a basic knowledge of the AWS console

## Setup Steps

This section details the steps required to set up a sample DynamoDB table, Lambda function and the required Okta Workflow.

Please follow these step-by-step instructions to set up this workflow and required AWS components.

The setup steps will do the following:

1. AWS DynamoDB Setup - Create the Zip Code reference table
2. AWS Lambda Setup - Create required Lambda role and function
3. Okta Tenant Setup - Configure the self service registration form
4. Okta Workflow Setup - Import and configure supplied workflow template
5. Load DynamoDB Table - Load the Zip Code reference table with sample data

### Step 1 - AWS DynamoDB Setup

The following steps require access to an AWS account and a basic knowledge of the AWS console. Although AWS DynamoDB provides for many advanced configurations, this example is designed to only require the minimum basic settings.

#### Create DynamoDB Table

Log into the AWS console and select DynamoDB. When the DynamoDB console opens, perform the following steps:

1. Under the Tables menu, click the button to create a new table
2. Set the Table Name to ***Zips***
3. Set the Partition Key to ***_id***
4. Leave the Use Default Settings checkbox checked
5. Click Create

This will create the Zips table with the minimal settings required. Note
that if you change the table name and/or primary key name, then you will
need to update the respective Okta Workflow accordingly, as it expects
these names.

### Step 2 - AWS Lambda Setup

The following steps require access to an AWS account and a basic
knowledge of the AWS console. Although AWS Lambda provides for many
advanced configurations, this example is designed to only require the
minimum basic settings.

#### Create a IAM Policy and Role

The Lambda function will need permission to read and write to the DynamoDB. To provide this permission, we need to create a policy and role.

In the AWS console, select IAM and then select Policies. Create a new policy with the following JSON:

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "dynamodb:DeleteItem",
                    "dynamodb:GetItem",
                    "dynamodb:PutItem",
                    "dynamodb:Scan",
                    "dynamodb:UpdateItem"
                ],
                "Resource": "*"
            }
        ]
    }

Give the role a meaningful name. For example ***myDynamoDBPolicy***.

In the AWS console, select IAM and then select Roles and do the following:

1. Create a new AWS Service Role and select the Lambda use case. Then click next.
2. On the permissions page, search for the policy you just created. Attach that policy and click next and next again.
3. On the review page, give the role a meaningful name. For example ***myDynamoDBRole***. Then click create role.

#### Create Lambda Function

We are now going to create a Lambda function that will call the DynamoDB table using the role we created in the previous step. In the AWS console, select Lambda and follow these steps:

1. Once the Lambda console opens, click create function.
2. Select **Author from scratch** and give the function a meaningful name like ***myDynamoDBFunction***.
    1. Ensure the most recent Node.js version (eg 14.x) has been selected as the runtime.
    2. Under permissions, select the role that we created in the previous section. Then click create function.
3. When the function is created the code editor will open. On the environment menu in the left pane, select index.js. Replace the default code snippet with the sample Lambda function code included below.
4. Open the configuration tab and under General Configuration, give the function a meaningful description.
5. Click deploy. The sample code should be deployed without any errors.

#### Sample Lambda Node.js Code

    /**
     *   Provide an event that contains the following keys:
     * - operation: one of the operations in the switch statement below
     * - tableName: required for operations that interact with DynamoDB
     * - payload: a parameter to pass to the operation being performed
    */

    var AWS = require('aws-sdk');
    var dynamo = new AWS.DynamoDB.DocumentClient();

    exports.handler = function(event, context, callback) {
        var operation = event.operation;
        switch (operation) {
            case 'upload':
            for (var i = 0; i \< event.payload.length; i++) {
                event.payload\[i\].TableName = event.tableName;
                dynamo.put(event.payload\[i\], callback);
            }
            break;
        case 'create':
            console.log('Calling create operation ...');
            event.payload.TableName = event.tableName;
            var response = dynamo.put(event.payload, callback);
            console.log('Response=' + response);
            break;
        case 'read':
            event.payload.TableName = event.tableName;
            dynamo.get(event.payload, callback);
            break;
        case 'update':
            event.payload.TableName = event.tableName;
            dynamo.update(event.payload, callback);
            break;
        case 'delete':
            event.payload.TableName = event.tableName;
            dynamo.delete(event.payload, callback);
            break;
        case 'list':
            event.payload.TableName = event.tableName;
            dynamo.scan(event.payload, callback);
            break;
        case 'echo':
            break;
            callback(null, "Success");
        case 'ping':
            callback(null, "pong");
            break;
        default:
            callback('Unknown operation: ${operation}');
        }
    };

#### Test Lambda Function

Now that we have created the table and function, we can run a test to ensure AWS has been correctly configured. This should be completed successfully before moving to the next step.

To test your Lambda function, perform the following steps:

1. Open the AWS Lambda console and select the function you just created in the previous step.
2. Click the Test tab and select New event.
3. Replace the sample request with the JSON request included below.
4. Give the test a meaningful name and click Save changes
5. Finally, click the Invoke button to run the test. If successful, the execution result should have succeeded.

If the test succeeded, go to the DynamoDB console and open the Zips table. It should contain one record.

#### Sample Lambda Test JSON

    {
    "operation": "create",
    "tableName": "Zips",
    "payload": {
        "Item": {
            "_id": "99999",
            "latitude": "43.61481",
            "longitude": "-111.17998",
            "city": "Test City",
            "state": "XX",
            "state-name": "Test State",
            "population": "9999",
            "county": "Test County",
            "timezone": "America/Los_Angeles"
            }
        }
    }

### Step 3 - Okta Tenant Setup

In this step we are going to configure the Self Service Registration Form to accept a zip code as part of the registration process. In the administration console for your Okta tenant, go to Directory > Self-Service Registration and do the following:

1. At the top of the page, click edit and enable Self-Service Registration, if it has not already been enabled.
2. Ensure the setting **Add to Sign-In widget** has been ticked.
3. Under Registration Form Field, click Add Field and select the attribute zipCode. Give the attribute a meaningful name for Form Label. Leave the check box for Required unticked as this attribute can be optionally populated.
4. Click Save at the bottom of the page.

We will also need to navigate to Directory > Profile Editor and:

1. Select the default user type
2. Click the "i" next to the zipCode attribute to see more information
3. Change the user permission from "Hide" to "Read/Write".

This is necessary because the user is essentially writing to this attribute during the Self Service Registration process.

Now log out of Okta and go to the login screen for your Okta tenant. You should have a Sign Up link at the bottom of the login screen. Click the link and the registration form will be displayed. The form should contain a prompt to input a value for Zip Code. Do not proceed with a new registration at this point.

### Step 4 - Okta Workflow Setup

In this step we are going to set up the Lambda connector and the workflow template within the Okta workflow console.

Before we can create the workflow connector to Lambda, we need to generate an Access Key and an Access Secret in AWS. To do this, follow these steps:

1. Log onto the AWS console and select IAM. The IAM Management console will then open.
2. Select Users on the left menu and click Add User.
3. Give the user a meaningful name and enable the check box for Programmatic Access and click Next.
4. Under Set Permissions, select Attach existing policies directly.
5. Search for the role AWSLambda_FullAccess and attach it to this user.
6. Click next until the user creation process has been completed. At this point, the user's Access Key and Secret will be displayed. Take note of both values.

In the administration console for your Okta tenant, go to the Workflow menu and select the Workflows console. Once the workflows console opens, do the following:

1. Select Connectors from the top menu bar and then click New Connection.
2. Choose the Lambda connector and add in the Access Key and Secret from the previous step.
3. Select the applicable AWS region where you created the Lambda function. The connector will then validate the supplied credentials and if successful, the connector will display a green tick.

The connector is now ready to use in a flow.

We are now ready to import and configure the workflow template. In the workflow console, do the following:

1. Under the templates menu, select the User Data Enrichment template and click the Add template button. This will create a folder titled User Data Enrichment which contains three flows and one table.
2. Open the flow titled **1.1 - Create Zip Table Record**. Find the AWS Lambda card within the flow and update it to use the Lambda connector that was created in the previous step. Additionally select the correct Lambda function to be executed.
3. Open the flow titled **2.0 - Update User Profile**. Within this flow there are three Okta cards that need to be updated to use your local Okta connector. Additionally there is a Lambda card that needs to be updated to use your Lambda connector. Be sure to select the applicable Lambda function.
4. Using the On/Off toggle switch next to each flow, enable each flow. The toggle switch will turn green once the flow has been enabled.
5. Select the Tables tab within your folder and the table sample-zip-data will be displayed. Open the table and select Import. Now select the sample data that was included as part of this template. Once the import has been completed, the table should contain exactly one hundred records.

### Step 5 - Load DynamoDB Table

The supplied workflow template includes two flows that will load the DynamoDB table with sample data. These flows are:

- **1.0 - Load Zip Table (Parent flow)**
- **1.1 - Create Zip Table Record (Helper flow)**

These flows will read the data from the supplied Okta Workflow table ***sample-zip-data*** and load it into the DynamoDb table via the Lambda function.

To load the DynamoDB table with sample data, open the parent flow **1.0 - Load Zip Table** and click the Test button to run the flow. The workflow console will switch to the Flow History view and show that the flow is being executed. This process is not designed to be efficient as it uses the basic AWS setup. It will take a few minutes to complete. After completion, check the contents of the DynamoDB table via the AWS console. The table should contain 100 new records.

## Testing this Flow

This is how to test the flow:

1. From the sample data supplied in either the Okta table **sample-zip-data** or the populated DynamoDB table **Zips**, select a Zip Code to be used in the test. Note that if you use a code that is not in the sample data, then the workflow will not find the respective record and the user profile will not be updated with any associated zip data.
2. Open a new private window for your browser and go to your Okta tenant default sign on screen and click on the Sign Up link to open the registration form. Create a new user via the registration form and populate the Zip Code field with the value selected from step 1.
3. Once the user has been created, go back to the Administration Console and find the user that was just created via Directory > People and inspect the user's profile. The profile should have been enriched with the corresponding City, State and Time Zone for the Zip Code used for the test. Additionally you can inspect the Flow History related to the execution.

## Limitations & Known Issues

There are no limitations or known issues at this time.
