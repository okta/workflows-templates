# Okta Identity Governance - Access Certification Campaign Examples

## Overview

These example flows show you how to create Okta Identity Governance [Access Certification campaigns](https://help.okta.com/okta_help.htm?type=oie&id=csh-campaigns).

A campaign can target a particular resource, such as an app or group, or a particular set of users, with or without entitlements. 

The examples demonstrate how to use various reviewer types and [Okta Expression Language](https://help.okta.com/okta_help.htm?type=oie&id=ext-el-eg) (OEL) expressions.

## Prerequisites

Before you get started, here are the things you need:

- Super admin access to your Okta tenant
- A configured [Okta Realms](https://help.okta.com/okta_help.htm?type=wf&id=ext-oktarealms) connector
- Access to an Okta org with [Okta Identity Governance](https://help.okta.com/okta_help.htm?type=oie&id=ext-iga)
- Access to [Secure Partner Access](https://help.okta.com/okta_help.htm?type=oie&id=spa-overview)
- Ability to create test users, groups, and apps within Okta

## Okta OIG Access Certification example flows

The flows are organized according to the various campaign choices, along with a description for each example. 

### App Resource Campaigns

These are resource campaigns that review access to apps with or without app entitlements.

- **App Campaign | Manager Reviewer | User Expression for Realm | Entitlements**

This flow creates a resource campaign that reviews apps with entitlements. It selects a subset of users assigned to the targeted app using an OEL expression containing the `realmId`. 

The flow assigns the users' managers as the reviewers based on an OEL expression to locate the manager's username on the user's profile. This username is kept in an attribute called `managerId`.

- **App Campaign | Manager Reviewer | User Expression | Entitlements**

This flow creates a resource campaign that reviews apps with entitlements. It selects a subset of users assigned to the targeted app using an OEL expression. 

The flow assigns the users' managers as the reviewers based an OEL expression to locate the manager's username on the user's profile. This username is kept in an attribute called `managerId`.

- **App Campaign | User Reviewer Expression | Entitlements**

This flow creates a resource campaign that includes users assigned to a specific app. 

The flow dynamically looks up the reviewer field for the user being reviewed to determine the reviewer. If the OEL expression doesn't find a username, a fallback reviewer is identified. 

- **App Campaign | Group Reviewer | Entitlements**

This flow creates a resource campaign that includes users assigned to a specific app with entitlements. 

The flow dynamically looks up the reviewers that are a member of a group. 

- **App Campaign | Group Reviewer | User Expression Entitlements**

This flow creates a resource campaign that includes a subset of users assigned to a specific app by using an expression. 

The flow dynamically looks up the reviewers that are a member of a group. 

- **App Campaign | Group reviewer | Without Entitlements**

This flow creates a resource campaign that includes users assigned to a specific app without entitlements.

The flow dynamically looks up the reviewers that are a member of a group. 

- **App Campaign | Manager Reviewer | Without Entitlements**

This flow creates a resource campaign that includes a subset of users assigned to a specific app without entitlements. 

The flow dynamically looks up the `managerId` field on the user being reviewed to determine the reviewer. If no manager is assigned, then a fallback reviewer is identified. 

- **App Campaign | Multi Level Group & Manager Reviewers | Entitlements**

This flow creates a resource campaign that reviews an app with its entitlements. All users assigned to a specific app are in scope. 

The flow dynamically looks up the members of a group for the first reviewer. For the second reviewer, it finds the `managerId` attribute of the user being reviewed. 

If no users are found either in the group or in the `managerId` attribute, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level Group & Manager Reviewers | User Expression | Entitlements**

This flow creates a resource campaign that reviews an app with its entitlements. A subset of users assigned to a specific app are in scope.

The flow dynamically looks up the members of a group for the first reviewer. For the second reviewer, it finds the `managerId` attribute of the user being reviewed. 

If no users are found either in the group or in the `managerId` attribute, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level Group & Manager reviewers | User Expression | Entitlements | Recurring 3 Months**

This flow creates a resource campaign that reviews an app with its entitlements. A subset of users assigned to a specific app are in scope. 

The flow dynamically looks up the members of a group for the first reviewer. For the second reviewer, it finds the `managerId` attribute of the user being reviewed. 

If no users are found either in the group or in the `managerId` attribute, a fallback reviewer is identified for each. 

The flow is set to run every three months and includes an end date.

- **App Campaign | Multi Level Group & Manager reviewers | User Expression | entitlements | Recurring 45 days**

This flow creates a resource campaign that reviews an app with its entitlements. A subset of users assigned to a specific app are in scope.

The flow dynamically looks up the members of a group for the first reviewer. For the second reviewer, it finds the `managerId` attribute of the user being reviewed. 

If no users are found in the group or in the `managerId` attribute, a fallback reviewer is identified for each.

The flow is set to run every 45 days and has no end date.

- **App Campaign | Multi Level Group & Manager Reviewers | Without Entitlements**

This flow creates a resource campaign that reviews the app only. App entitlements aren't included. All users assigned to a specific app are in scope.

The flow dynamically looks up the members of a group for the first reviewer. For the second reviewer, it finds the `managerId` attribute of the user being reviewed. 

If no users are found in the group or in the `managerId` attribute, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level Group Reviewers | Entitlements**

This flow creates a resource campaign that reviews an app with its entitlements. All users assigned to a specific app are in scope. 

The flow dynamically looks up the members of a group for the first-level and second-level reviewers. 

If no users are found in either group, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level Group Reviewers | Without Entitlements**

This flow creates a resource campaign that reviews the app only. App entitlements aren't included. All users assigned to a specific app are in scope. 

The flow dynamically looks up the members of a group for the first-level and second-level reviewers.

If no users are found in either group, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level Group Reviewers | User Expression | Entitlements**

This flow creates a resource campaign that reviews an app with its entitlements. A subset of users assigned to a specific app are in scope, based on an expression.

The flow dynamically looks up the members of a group for the first-level and second-level reviewers.

If no users are found in either group, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level Manager & User Reviewers | User Expression | Entitlements**

This flow creates a resource campaign that reviews an app with its entitlements. A subset of users assigned to the specific app are in scope, based on an expression. 

The flow dynamically looks up the manager of the user being reviewed using an expression. A specific user ID is used as the second reviewer.

If no user is found based on the `managerId` attribute, a fallback reviewer is identified for the manager.

- **App Campaign | Multi Level Manager & User reviewers | Without Entitlements**

This flow creates a resource campaign that reviews the app only. App entitlements aren't included. All users assigned to the specific app are in scope. 

The flow dynamically looks up the manager of the user being reviewed using an expression. A specific user id is used as the second reviewer.

If no user is found based on the `managerId` attribute, a fallback reviewer is identified for the manager.

- **App Campaign | Multi Level User and Group Reviewers | Entitlements**

This flow creates a resource campaign that reviews an app with its entitlements. All users assigned to a specific app are in scope.

The flow dynamically looks up a user as the first reviewer and a group of users for the second reviewer. 

If no users are found in the group, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level User and Group Reviewers | Without Entitlements**

This flow creates a resource campaign that reviews the app only. App entitlements aren't included. All users assigned to a specific app are in scope.

The flow dynamically looks up a user as the first reviewer and a group of users for the second reviewer.

If no users are found in the group, a fallback reviewer is identified for each. 

- **App Campaign | Multi Level User Reviewers | Entitlements**

This flow creates a resource campaign that reviews an app with its entitlements. All users assigned to a specific app are in scope.

The flow dynamically looks up a user as the first reviewer and a user for the second reviewer. 

- **App Campaign | Multi Level User Reviewers | Without Entitlements**

This flow creates a resource campaign that reviews the app only. App entitlements aren't included. All users assigned to a specific app are in scope.

The flow dynamically looks up a user as the first reviewer and a user for the second reviewer. 

- **App Campaign | Reviewer User Expression | Without Entitlements**

This flow creates a resource campaign that includes users assigned to a specific app without entitlements. 

A specific person is assigned as the reviewer based on an expression.

- **App Campaign | User Reviewer | Entitlements**

This flow creates a resource campaign that includes users assigned to a specific app with entitlements.

The flow specifies a specific user as the reviewer.

- **App Campaign | User Reviewer | Without Entitlements**

This flow creates a resource campaign that includes users assigned to a specific app without entitlements.

The flow specifies a specific user as the reviewer.

---
### Group Resource Campaigns

These are resource campaigns that review access to groups.

**Group Campaign | Group reviewer | User Expression**

This flow creates a resource campaign that includes a subset of users assigned to a specific group using the Okta Expression Language.

The flow uses a group of people as the reviewers.

**Group Campaign | Group Reviewer | User Expression Based on `realmId`**

This flow creates a resource campaign that includes a subset of users assigned to a specific Okta group. An OEL expression that specifies all users within an Okta Realm is used to determine the users in scope.

The flow dynamically looks up the reviewers that are a member of a group.

**Group Campaign | Group Reviewer | Users Assigned**

This flow creates a resource campaign that includes users assigned to a specific Okta group.

The flow dynamically looks up the reviewers that are a member of a group. 

**Group Campaign | Resource Owner | Users Assigned**

This flow creates a resource campaign for all users assigned to a specific Okta group.

The flow dynamically looks up a specific group's owners as the reviewers. The group owners don't need to be the same group being reviewed.

**Group Campaign | User Reviewer**

This flow creates a resource campaign including all users assigned to a specific group.

The flow uses a specific user as the reviewer.

**Group Campaign | User Reviewer Expression**

This flow creates a resource campaign for all users assigned to a specific Okta group. 

A specific user is assigned as the reviewer based on an OEL expression. If this user isn't resolved, a specific fallback reviewer is used.

**Group Campaign | User Reviewer Expression | User Expression**

This flow creates a resource campaign of a subset of users assigned to a specific Okta group. 

A specific user is assigned as the reviewer based on an OEL expression. If this user isn't resolved, a specific fallback reviewer is used. 

An OEL expression is used to select the subset of users in a group. 

---
### User Campaigns

These are user campaigns that review user access to apps, groups, or both.

**Group of Users Campaign | Apps and Groups | Excluded Resources | User Reviews**

This flow creates a user campaign for a group of users. It includes all apps and groups assigned to a specific user, but excludes one app and one group. 

The flow also targets all other apps and groups assigned to the user, and has another user as the single reviewer.

**User Campaign | Apps and Groups | Excluded Resources | User Reviews**

This flow creates a user campaign that includes all apps and groups assigned to two individual users. 

The flow also targets all apps and groups assigned to the users, and has another user as the single reviewer.

**User Campaign | Apps and Groups | User Reviews**

This flow creates a user campaign that includes all apps and groups assigned to a specific user. 

The flow also targets all apps and groups assigned to the user, and has another user as the single reviewer.

**User Campaign | Apps | User Reviews**

This flow creates a user campaign that reviews apps. 

A specific user is assigned as the reviewer. 

**User Campaign | Groups Only | User Reviews**

This flow creates a user campaign that includes all groups assigned to a specific user. 

This flow has a single user as the reviewer.

## Testing the Flows

1. To execute a campaign based on the template type, run the flow with an app user or a group ID.
2. Go to the **Okta Identity Governance** menu and click **Access Certifications** to locate the newly created campaign.

### Other test considerations

- Make the flow a delegated flow so any Okta admin can execute the flow.
- Combine the flow with your existing flows based on event triggers.
- Make the flow a scheduled flow that runs periodically.
- Call the flow from other flows and supply the applicable inputs.

## Resources

- [Access Certifications](https://help.okta.com/en-us/content/topics/identity-governance/access-certification/iga-access-cert.htm)
- [Okta Identity Governance API](https://developer.okta.com/docs/api/iga/)