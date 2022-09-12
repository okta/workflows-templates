# Manage Access to Github Repo Based on Secure Code Warrior Assessment Status

## Overview

Use the Secure Code Warrior Okta Workflows connector to leverage Secure Code Warrior courses and assessments data within your flows. For example, you can validate the security competency of developers using an assessment before granting access to sensitive code repositories.

You can also use the connector to automate user creation and removal from the Secure Code Warrior platform. User management actions will require an **Admin API key**.

## Before you get Started / Prerequisites

Before you get started, here are the things you’ll need:

-   Access to an Okta tenant with Okta Workflows enabled for your org
-   Access to a tenant for Secure Code Warrior
-   A configured assessment within Secure Code Warrior

## Setup Steps

### Generate an API key ###

An API key is required to connect to the Secure Code Warrior Platform API and enable the use of the connector. Secure Code Warrior uses two types of API keys:

1. **Admin API keys** are Read-Write and are required to use the Create User and Delete User action cards.
2. **Reporting API keys** are Read-Only and can be used with all remaining action cards.

**NOTE:** Please contact Secure Code Warrior to enable Admin API keys.

To generate a key:

1. Log in to Secure Code Warrior with your Company Administrator account.
2. Go to Administration.
3. Click More > Edit Company.
4. Under Report API or Admin API, enter a label (for example, Okta Workflows Reporting Key), and click Generate Key. A dialog will appear that contains your API key.
5. Copy the API key to your clipboard.

### Setup Steps ###

When you add a Secure Code Warrior action card to a flow for the first time, you'll be prompted to configure the connection. This will enable you to connect to your Secure Code Warrior organisation, save your API key, and reuse the connection in new flows that include Secure Code Warrior action cards. To do this, please follow the following steps:

1. If you have not already done so, open the **Okta Workflows console** from the Okta Admin Dashboard.
2. From the **Connections page** or any Secure Code Warrior action card, click **New Connection**.
3. Provide a **Connection Nickname**. This is useful if you plan to create multiple connections to share with your team.
4. Paste your API key under **Your Secure Code Warrior API Key**.
5. Select your **Instance Region**.
6. Click **Create**.

### Configure the Workflow ###

1. Configure the Secure Code Warrior assessment ID used to determine a developer’s security proficiency.
    * The assessment ID can be found in the URL when viewing the assessment in your browser - e.g. https://portal.securecodewarrior.com/#/assessments/view/SCW_Assessment_ID
2. Add GitHub details such as the organization and the repository as a part of the setup.
3. Using the SCW action **Check Assessment Completion For User**, the workflow checks whether a developer has successfully passed a particular assessment.
4. If the desired course/assessment has been completed or a particular score achieved, then use the GitHub Connector to grant access to the repository. If the requirement is not met, a notification can be generated or another Okta workflow can be triggered to take appropriate action.

The above can be designed to run as a one-off, periodic, or continuous check so that it continues to only admit eligible developers into the secure workflow.

Some of the other possible SCW Connector Actions are:

- List Assessment Attempts For User - lists all attempts that a user has for a particular assessment
- Check Course Completion For User - determines if a user has completed a specified course
- List Course Enrollments For User - lists all enrollments that a user has for a particular course ID
- Custom API Action - to execute any API call other than what is possible through the available Action

## Testing this Flow

1. Admins may use an existing SCW Assessment or creating a new SCW Assessment, and then provide the SCW Assessment ID, Github Organization and repository in the **Flow Control Configuration** card.
2. Admins can execute this flow by assigning a user to the configured Okta application instance ID configured in the flow.
2. Navigate back to the flow and check the **Flow History** to determine if the flow executed successfuly.

## Limitations & Known Issues

-   This sample flow requires that the end-user's Okta username corresponds with their Github public e-mail address.