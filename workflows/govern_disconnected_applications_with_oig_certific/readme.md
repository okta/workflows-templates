# Govern Disconnected Applications with OIG Certifications: IDA UAR Upload Process

Filename: README_UAR_Upload_Process.md
Version: 1.0.0
Date: June 15, 2026
Target System: Okta Identity Governance (OIG) & Okta Workflows

## 1. Overview

The UAR (User Access Review) Upload Process is an automation utility that streamlines access certifications. It lets admins provide a Google Sheet URL containing disconnected or raw app access dumps, and automatically constructs governed app data inside Okta.

The system builds corresponding entitlement frameworks from the data, seeds entitlement values, auto-provisions target user accounts to the mock apps, and assigns governance grants directly inside Okta Identity Governance (OIG).

Once the mock apps are created and users are assigned entitlements, campaigns can be run against those assignments in Access Certifications.

## 2. Prerequisites & Environment Setup

Before running the workflow, verify the following configuration states:

* Okta Identity Governance (OIG): Must be active with Entitlements management features enabled on the tenant.
* Google Sheets connector: Authorized account with read privileges to the targeted UAR import spreadsheets. Similar spreadsheet tooling will work.
* Slack connector: Configured with valid workspace scopes (`users:read`, `chat:write`) to dispatch completion and validation warnings to execution administrators. Similar communication tooling, including email, will work.
* Okta Workflows tables: A table named **Record Created Applications** must exist in the same folder. The workflow template provides this.

## 3. Spreadsheet Structure

The workflow expects a specific Google Sheet layout. An incorrect column order causes row-mapping errors.

Target Worksheet Tab Name: Sample csv template

| Column | Index | Field | Description |
|---|---|---|---|
| A | 0 | Application Name | Identifies the real-world tool target. |
| B | 1 | Username | Target identity login username inside Okta. |
| C | 2 | Email | Primary email identity locator. |
| D | 3 | Access Type | Maps directly to the OIG Entitlement Type. |
| E | 4 | Access Level | Maps directly to the OIG Entitlement Value definition. |

* Note: Row evaluation begins at index 1 (Row 2), treating Row 1 strictly as column headings.
* Note: The sheet name must be **Sheet1** due to limitations of the Google Sheets read API.

## 4. System Architecture & Component Flows

The workflow bundle consists of one main flow and six helper components:

**[Main] IDA UAR Upload Process**
- Trigger: Delegated Flow (invocable outside the Workflows admin console).
- Function: Receives the Google Sheet URL, parses out the spreadsheet ID, downloads rows, deduplicates metadata to derive distinct app profiles, orchestrates sequential downstream setups, and posts a confirmation direct message to the admin through Slack upon completion.

  **[1.0] Format Rows**
  - Function: Transforms row data. Evaluates row indexes, cleans inputs, and maps properties. Creates a combined string, `Access_Type>Access_Level`, used for matching multi-valued roles.

  **[1.1] IDA UAR Upload - Create Application**
  - Function: Provisions a SAML 2.0 placeholder app named using the pattern `Q1_2026_UAR_[Application Name]`. Automatically hides the app from mobile (iOS) and desktop app launchers, enables Governance parameters, and turns on native Entitlements.

    **[1.1.1] Opt in Application**
    - Function: Sends PATCH calls to the Okta Governance v2 endpoints to set the resource to `OPTED_IN` status.

  **[1.2] Create Entitlements and Entitlement Values**
  - Function: Queries the OIG framework for entitlement types matching the spreadsheet metadata. Inserts missing entitlement types and loads the target value dictionaries.

  **[1.3] Create Entitlement and Assign to Users**
  - Function: Finds target identities through Okta directory reads, links target user accounts to the mock app profiles for scope initialization, and creates entitlement grants through the `/governance/api/v1/grants` path.

## 5. Data Models (Workflows Storage)

Table Identifier: Record Created Applications

Purpose: Acts as a transaction ledger for auditing and automated environment cleanup.

| Property | Type | Description |
|---|---|---|
| App Name | Text | Programmatic label applied to the app. |
| App ID | Text | Unique Okta app ID. |
| Created Date | Text | ISO-8601 timestamp of when the loop executed. |
| Created By | Text | Okta user reference ID tracking the runtime user. |
| Created By Readable | Text | Alternate identity/display metadata for auditing logs. |
| Status | Text | Operational lifecycle phase of setup tracking. |
| Deleted Date | Text | Placeholder metadata column reserved for cleanup. |

## 6. Operational Runbook (Step by Step)

Follow these steps to run an import:

**Step 1: Document Alignment**
Ensure the raw access control dump matches the structure in Section 3. Name the targeted worksheet tab "Sample csv template."

**Step 2: Access the Workflows Console / Delegated Interface**
Locate `[Main] IDA UAR Upload Process` in the environment directory. If using the Delegated Flows launch widget panel, open the entry directly.

**Step 3: Parameter Input**
Paste the full URL into the "Google Sheet URL" prompt field. Example format:

```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID_HERE]/edit#gid=0
```

**Step 4: Execution Monitoring**
Trigger execution. Monitor the mapping counts in the history view. The workflow processes up to 10 rows concurrently to stay within API rate limits.

**Step 5: Verification & Auditing**
Upon successful execution, the workflow sends a Slack message with verification text similar to:

> "Hi, your upload of the application and assignments for [App Name] has completed..."

Cross-reference metrics by checking the Record Created Applications storage table to track the IDs generated across the run.

## 7. Exception Handling & API Rate Safeguards

The flow includes defensive error recovery procedures:

* **Try-catch wrappers**: Embedded inside blocks [1.1], [1.2], and [1.3]. When a user lookup doesn't match an existing target, the setup fails gracefully and writes an explicit assignment failure reason to the audit output without killing the execution.
* **Centralized error handler**: Connected directly to the "Workflow Error Handler" helper flow.
* **Resiliency parameters**: The Google Sheets and Okta OIG connectors implement automated rate-limit triggers configured to handle 429 exceptions through a 60-second to 180-second progressive backoff cycle, mitigating API exhaustion during execution loops.

## License Agreement

The license information for the assets associated with this flopack is in the [LICENSE](https://github.com/okta/workflows-templates/blob/master/workflows/automate_sso_application_creation/LICENSE.md) file.