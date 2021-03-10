# Workflows Template: Manage AWS SSO Entitlements

## Overview

This page outlines a workflows template that contains six workflows:

**AWS Add Entitlements**:

* This flow adds entitlements (accounts and permission sets) to a user when they are added to an Okta group. The Okta group name matches the group ARN in AWS for ease of use. By selecting an instance, instance ARN, and account, the permission set for the AWS group can be assigned to a specific user.

**AWS Add Entitlements Table (parent)**: 

* This flow shows what is possible using a table. A table can be constructed to hold the ARN with their accounts and permission sets. It starts with an Okta user being added to an Okta group. The Okta group name matches the group ARN in AWS for ease of use. With a quick search through the table, all accounts and permission sets assigned to a group can be assigned to a user.

**AWS Add Entitlements Child Flow**: 

* This is the child flow associated with AWS Add Entitlements Table. It takes the passed in parameters of the user id, principal ARN, account, and permission set and assigns them to the user.

**AWS Remove User Entitlements**: 

* This flow removes all entitlements assigned to a user when they are removed from the Okta group. They will no longer have the accounts and permission sets associated with the specific group ARN they are removed from.

**AWS Remove Entitlements Table (parent)**: 

* This flow shows what is possible using a table. A table can be constructed to hold the ARN with their accounts and permission sets. It starts with an Okta user being removed from an Okta group. The Okta group name matches the group ARN in AWS for ease of use. With a quick search through the table, all accounts and permission sets assigned to a group can be unassigned from a user.

**AWS Remove Entitlements Child Flow**: 

* This is the child flow associated with AWS Remove Entitlements Table. It takes the passed in parameters of the user id/principal ARN and account and removes them from the user.

## Before you get Started/Pre-requisites:

Before you get started, here are the things you’ll need:
* Access to an Okta tenant with Okta Workflows enabled for your org 
* Access to a tenant for AWS SSO
* A user/group with the configurations listed in the AWS SSO Connector doc


## Setup Steps

Please follow the below step-by-step instructions to set up this workflow.

1. Update the AWS SSO connector cards to use your AWS connection.
    a. Fill out the Options on each card with the correct:
        i. AWS Region
        ii. AWS Instance ARN
        iii. AWS Account ID
2. Update the Okta connector cards to use your Okta connection.
3. Fill out the correct Group ARN on the Object and Continue If cards.
4. Update the user principal id to the correct Okta user value in case it’s a custom field.
5. If you are using the table, populate the table with your accounts, permission sets, and principal ARNs that you’ll use in these Workflows.


## Testing these flows

To these flows, please follow these steps:

1. Add a new user to an Okta group that is tied to AWS.
2. Open your flow and view Flow History.
3. You should see that the flow completed and the entitlements were assigned correctly.



## Limitations & Known Issues

The limitations for the AWS SSO connector can be found [here](https://help.okta.com/en/prod/Content/Topics/Workflows/connector-reference/awssso/awssso.htm "AWS SSO help documentation")