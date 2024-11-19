# Enable a grace period for Identity Governance Access Certification

## Overview

During an access certification, some organizations might allow for revoke decisions. Some campaigns implement a grace period where end users retain access to the resource for a period before their access is revoked.

This template enables this configuration for a campaign, applying the revoke decision at a future date. The date is determined according to the number of days granted as a grace period.

## Prerequisites

Before you get started, here are the things you need:
- Access to an Okta tenant with Okta Identity Governance
- Access to an Okta tenant with Okta Workflows
- Add the following scopes: 
    - okta.governance.accessCertifications.manage
    - okta.governance.accessCertifications.read
    - okta.governance.accessRequests.manage
    - okta.governance.accessRequests.read

## Setup

### Okta Workflows Setup

1. Install the template into your Workflows environment.
1. Go to the `Configuration` table.
1. Add a row for each campaign that needs a grace period. For example, to enable a 15-day grace period for a new campaign, add a new row, and in the **Campaign Name** column, enter the value `Semi-Annual`. In the same row, enter `15` in the **Period in Days** column.

### Okta Identity Governance Setup

1. Sign in to the Okta Admin Dashboard.
1. Go to **Identity Governance > Access Certifications**.
1. Click **Create campaign** to create an access certification campaign.
1. Go through the **Create campaign** wizard. Use `Semi-Annual` as the **Resource campaign name**.

## Testing this Flow

1. Go to **Identity Governance > Access Certifications**.
1. Click the `Scheduled` tab, and click the `Semi-Annual` campaign.
1. To launch the campaign click **Actions > Launch**.
1. Revoke a resource:
    1. Go to the assigned reviewer's End-User Dashboard 
    1. Open the **Okta Access Certifications Reviews** application. 
    1. Go to **Pending Reviews** and choose the campaign. 
    1. Select a user and click **Revoke** to revoke a resource.
1. Return to the Okta Workflows console. The event information should be stored in the **Grace Period Events** table.

## Limitations & Known Issues

Workflows tables aren't optimized to store large amounts of data records. If the campaigns generate large amounts of entries, you might run up against the record limits for tables. See [Workflows System Limits](https://help.okta.com/wf/en-us/content/topics/workflows/workflows-system-limits.htm).
