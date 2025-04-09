## OIG Access Request Conditions
  
## Overview

This template contains flows that programmatically create a type of Okta OIG V2 Access Request condition for default apps, groups, or entitlements based on access requests. 

### Default App Conditions

**Condition | Default App | Everyone** 

This flow creates a new condition within an app with default app access using an existing approval sequence. Once approved, the user has permanent access. The audience is everyone.  

**Condition | Default App | Group(s) Audience** 

This flow creates a new condition within an app using an existing approval sequence. Once approved, the user has permanent access. The audience is restricted to groups.


**Condition | Default App | Fixed Duration | Everyone Audience** 

This flow creates a new condition for access to an app using an existing approval sequence for a fixed duration (duration <= 90 days, 12 weeks, or 72 hours). The audience is everyone. 

**Condition | Default App | Fixed Duration | Group(s) Audience** 

This flow creates a new condition for access to an app using an existing approval sequence for a fixed duration (duration <= 90 days, 12 weeks, or 72 hours). The audience is restricted to groups.  

**Condition | Default App | Variable Duration | Everyone Audience** 

This flow creates a new condition for access to an app using an existing approval sequence for a variable duration (duration <= 90 days, 12 weeks, or 72 hours). The audience is everyone.

**Condition | Default App | Variable Duration | Group(s) audience** 

This flow creates a new condition within an app using an existing approval sequence for a variable duration (duration <= 90 days, 12 weeks, or 72 hours). The audience is restricted to groups.


**Generate Group List with ID** 

This flow is a helper flow that formats the group IDs correctly for the Conditions API call.

### Bundle-Based Conditions

**Create Bundle Condition | Fixed Duration | Everyone** 

This flow creates a new condition allowing users to request fixed duration access to entitlement bundles. This is supported for apps with entitlements. The audience is everyone. 

**Create Bundle Condition | Fixed duration | Grp Audience** 

This flow creates a new condition allowing members of groups to request access to entitlement bundles for a fixed duration (duration <= 90 days, 12 weeks, or 72 hours). This is supported for apps with entitlements. The audience is restricted to groups.

**Create Bundle Condition | Permanent Access | Everyone** 

This flow creates a new condition allowing users to request permanent access to entitlement bundles. This is supported for apps with entitlements. This audience is everyone. 

**Create Bundle Condition | Permanent Access | Grp Audience** 

This flow creates a new condition allowing members of a group to request permanent access to entitlement bundles. This is supported for apps with entitlements. The audience is restricted to groups.

**Create Bundle Condition | Variable Duration | Everyone** 

This flow creates a new condition allowing users to request variable duration (duration <= 90 days, 12 weeks, or 72 hours) access to entitlement bundles. This is supported for apps with entitlements. The audience is everyone. 

**Create Bundle Condition | Variable duration | Grp Audience** 

This flow creates a new condition allowing members of groups to request variable (duration <= 90 days, 12 weeks, or 72 hours) duration access to entitlement bundles. This is supported for apps with entitlements. The audience is restricted to groups. 

**Process Resources For Condition** 

This flow is a helper flow that formats bundles and group IDs correctly for the Conditions API call.

### Group Based Conditions

**Create Group Condition | Fixed Duration | Everyone** 

This flow creates a new condition allowing users to request access for a fixed duration (duration <= 90 days, 12 weeks, or 72 hours) to groups assigned to the target app. This isn't supported for apps with entitlements.  The audience is everyone. 

**Create Group Condition | Fixed duration | Grp Audience** 

This flow creates a new condition allowing users of a group to request acess for a fixed duration (duration <= 90 days, 12 weeks, or 72 hours) to groups assigned to the target app. This isn't supported for apps with entitlements. The audience is restricted to groups.

**Create Group Condition | Permanent Access | Everyone** 

This flow creates a new condition allowing users to request permanent access to groups assigned to the target app. This isn't supported for apps with entitlements. The audience is everyone.

**Create Group Condition | Permanent Access | Grp Audience** 

This flow creates a new condition allowing members of a group to request permanent access to groups assigned to the target app. This isn't supported for apps with entitlements. The audience is restricted to groups.

**Create Group Condition | Variable Duration | Everyone** 

This flow creates a new condition allowing users to request access for a variable duration (duration <= 90 days, 12 weeks, or 72 hours) to groups assigned to the target app. This isn't supported for apps with entitlements. The audience is everyone.  


**Create Group Condition | Variable duration | Grp Audience** 

This flow creates a new condition allowing members of a group to request access for a variable duration (duration <= 90 days, 12 weeks, or 72 hours) to groups assigned to the target app. This isn't supported for apps with entitlements. This audience is restricted to groups. 

## Prerequisites

Before starting, ensure that you have:

- Super admin access or Access Request Admin with view rights to app custom role to your Okta tenant.
- Access to an Okta tenant with Okta Workflows.
- Access to various users, groups, and apps and apps with entitlements within Okta.
- Okta Workflow connector set up.

## Setup Steps

1. Log into Okta Workflows and import the template.
2. Click save. 

## Testing the Workflow Template

1. Supply inputs for and run each flow to manage conditions. 

2. Go to the **Okta Identity Governance** menu and click the target app / Access Request sub tab to locate the newly created conditions.

## Other test considerations
- Make the flow a delegated flow so any Okta admin can execute the flow.
- Combine the flow with your existing flows based on event triggers.
- Make the flow a scheduled flow that runs periodically.
- Call the flow from other flows and supply the applicable inputs.

## Resources

- [Create a request condition](https://developer.okta.com/docs/api/iga/openapi/governance.requests.admin.v2/tag/Request-Conditions/#tag/Request-Conditions/operation/createResourceRequestConditionV2)
- [Okta Identity Governance API](https://developer.okta.com/docs/api/iga/)

