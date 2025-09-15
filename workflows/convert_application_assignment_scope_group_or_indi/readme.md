# Convert Application Assignment Scope (GROUP or INDIVIDUAL)

## Overview

This template allows administrators to change an app assignment for a specific user to either GROUP or INDIVIDUAL (USER) scope. This is useful when you need to modify whether a user's access is derived from group memberships or assigned directly to them as an individual. For example, you might initially assign an app to a user individually for testing and later want to transition their access to be managed through group rules, or vice versa.

Note: The flexibility of this template allows for conversion to either GROUP or USER scope. Ensure that the correct logic or configuration is applied as per the following setup steps to achieve your desired outcome. 

## Prerequisites

Before you get started, here are the things you need: 
- Access to an Okta tenant with Okta Workflows enabled for your org.

- The `userID` of the Okta user whose app assignment you want to convert, and the `applicationID` (or `appID`) of the app in Okta. The user must be added to a group that has this app assigned.

## Setup Steps

After installing this template, follow these steps to configure and customize the flow for your needs: 

1. Open the installed flow and add inputs such as `userID` and `applicationID`.

2. Configure the Okta connection in the **Okta: Custom API Action** card within the flow. This card is responsible for making the change in your Okta tenant. 

3. Determine and configure target scope logic. In the installed flow, locate the **Okta: Custom API Action** card and change its `Body` input by dragging the output from the **Object: Construct** card. If you want to update the app assignment scope from INDIVIDUAL to GROUP, drag the **Object: Construct Group** card scope field into the **Okta: Custom API Action** card body field.
   
## Testing this Flow

1. Manually run the flow. 
2. Verify the execution history and check that all steps were completed successfully.
3. Inspect the **Okta: Custom API Action** card's outputs to check for a success status code (200 OK).
4. Go to the Admin Console and navigate to the app.
5. Check the assignments for the user you tested with.
6. Verify that the assignment scope has changed to what you intended (GROUP or USER). 

## Limitations & Known Issues
- Keep in mind the Okta Workflows System Limits.
- Error handling isn't addressed in this template.