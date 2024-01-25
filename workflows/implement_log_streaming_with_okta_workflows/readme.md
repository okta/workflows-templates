# Implement log streaming with Okta Workflows

## Overview

This template focuses on implementing log streaming and Okta Workflows to capture specific event types from the Okta System Log. Log streaming enables the export of System Log events in near real-time to platforms like Amazon EventBridge or Splunk Cloud. You can use this functionality for monitoring suspicious activity, automating responses to specific events, or troubleshooting.

## Before you begin

Before starting, you need to have:

- Super admin access to your Okta tenant.
- Access to an Okta tenant with Okta Workflows
- An Amazon Web Services (AWS) account ID and the region information for your EventBridge target.
- Appropriate permissions in AWS to configure EventBridge for SaaS partner events.

## Setup steps

### Add an AWS EventBridge log stream in Okta

1. In the Okta Admin Console, go to **Reports > Log Streaming**.
1. Click **Add Log Stream** and select **AWS EventBridge**.
1. Enter the configuration details:
   - **Name**: Unique name for the log stream in Okta.
   - **AWS Event Source Name**: Unique identifier for Amazon EventBridge.
   - **AWS account ID**: Your 12-digit AWS account number.
   - **AWS region**: Select the closest AWS region to your target.
1. Click **Save**. 
1. Confirm that the log stream appears as **Active** on the **Log Streaming** page.

### Configure the Amazon EventBridge log stream in AWS

1. Go to **Amazon EventBridge** in the AWS console.
2. Under **Integration**, select **Partner event sources**.
3. Associate the log stream with an event bus and set permissions.
4. Create a rule in **Events > Rules** to match Okta events as per AWS documentation.

## Connect the log stream with Okta Workflows

1. Configure an Amazon EventBridge API destination in AWS with the flow **AWS EventBridge Workflows API Endpoint**
1. Copy the **Workflows API Endpoint URL**.
1. In the AWS console, go to **Amazon EventBridge > Integration > API destinations**.
1. Provide a name for your **API destination** (for example, `Workflows API endpoint`) and paste the **Workflows API Endpoint URL** into the **API destination endpoint** field. 
1. Select **POST** for your HTTP method and select the EventBridge connection you created previously.
1. Go to **Amazon EventBridge > Buses > Rules**. 
1. Create a rule and select the newly created **Okta Event** bus. 
1. Select **Rule with an event pattern** for the rule type.

    Here's an example of an event pattern from the Okta System Log that captures two events.
    ```
    {
      "detail": {
        "eventType": [
          "app.oauth2.token.grant.id_token", 
          "user.session.access_admin_app"
        ]
      }
    }
    ```

## Test the log stream

1. Perform some actions inside Okta to generate events.
1. Use the Amazon EventBridge rules to test event patterns and ensure that the events are properly captured and processed.
1. Check the Workflows API Endpoint flow for the events.

## Support and other resources

- [Okta log streaming documentation](https://help.okta.com/en/prod/okta_help_CSH.htm#ext_Log_Streaming)
- [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/)
- [Okta System Log API](https://developer.okta.com/docs/reference/api/system-log/)
