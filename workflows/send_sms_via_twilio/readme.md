# Send SMS via Twilio

## Overview

Within a workflow you may want to send a message, a pin, or any type of string data via SMS to a user. This flow was created to interface to the Twilio SMS service to enable workflows to accomplish this.

This flow is meant to be called as a subflow. The flow uses the rest api interface of the Twilio service. Components needed to send a Twilio sourced SMS message are passed into this flow as parameters. No other modification to the flow is needed.


## Prerequisites

Before you get started you will need:

-Twilio account

-Twillio account sid, auth token, Account Phone # (Send From #)

If you need to set up a Twilio account, see Setup Twilio Trial Account at the end of this document.


## Setup Steps

1. Create an API connector in the Okta Workflows console. 
    1. On the Connections tab, click New Connection.
    1. Select API Connector.
    1. In the Description field, enter `HTTP Twilio`.
    1. Set Auth Type to Basic.
    1. For the user name, paste in your Twilio Account sid
    1. For the password, paste in your Twilio auth token
1. Navigate to the imported flow SUB - Send SMS via Twilio
1. Scroll to the last card on the right HTTP Post
1. Click Connections at the top of the card
1. Select your new connection `HTTP Twilio`
1. Save the flow enabling “Save all data that passes through this Flow?”
1. Turn on Flow


## Parameters to pass into this subflow

1. SMS Phone # to send to - example: +12223335555
2. Message example: Please contact the IT department asap
3. Twilio Account SID 
4. Phone # to send from - example : +12223335551


## Testing these Flows

*   To test flow without a parent flow, just click the Test button while the SUB - Send SMS via Twilio workflow is open.
*   You will be prompted to fill in the parameters that would normally be passed from a parent flow. All parameters are required.
*   Click Run Test


## Limitations & Known Issues 

*   Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) 
*   When invoking HTTP endpoints consider any applicable rate limits of the SaaS application (or http endpoint) that you are invoking. You should almost always set up error handling on the card to retry periodically.


## Appendix

### Setting up a Twilio Trial Account

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio) 
2. Register for free account
3. You will need to verify your email address and sms phone number
4. Go to the Dashboard
5. Under Trail Number, click Request Number
6. You Send From # (Trial Number), Account SID, and Auth Token are now on this page to use above
