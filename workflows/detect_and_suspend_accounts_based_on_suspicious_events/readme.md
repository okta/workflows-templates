# Detect and Suspend Accounts Based on Suspicious Events

## Overview

Automatically detects and suspends potentially compromised accounts by monitoring for three suspicious events occurring within a one-hour window: MFA factor updates, password resets, and logins from new IP addresses.

When all three events are detected within 60 minutes for the same user, the workflow automatically suspends the account and removes the tracking entry.

![Architecture diagram](screenshots/wf-chart.png)

## Prerequisites

### Okta

- Okta tenant with Workflows enabled
- Permissions to create Event Hooks
- Permissions to suspend users
- Okta Workflows OAuth app with required scopes:
  - `okta.users.read`
  - `okta.users.manage`

### Workflows Features

- API Endpoint capability (included)
- Workflows Tables (1 table included in import)

## Business Use Case

When an account is compromised, attackers typically follow a pattern:

1. **Reset the password** to lock out the legitimate user
2. **Update MFA factors** to maintain persistent access
3. **Login from a new IP address** (different geographic location)

This workflow detects this attack pattern in real-time and automatically suspends the account before significant damage occurs, allowing security teams to investigate.

### Key Features

- **Single flow architecture** - Economical design with one flow and one table
- **Automatic time-window tracking** - Uses 1-hour sliding window
- **New user exclusion** - Ignores accounts less than 7 days old (reduces false positives)
- **Dual format support** - Handles both New IP detection formats from Okta
- **Self-cleaning** - Automatically manages table entries

## Architecture

The workflow uses a single API Endpoint triggered by three Event Hooks. When any of the three monitored events occurs, the flow determines which event type it was, checks the tracking table, calculates the time window, and takes appropriate action based on whether all three events have occurred within one hour.

## Setup Steps

### Step 1: Import the Workflow

1. Download the `workflow.flopack` file
2. In Okta Workflows console, click **Flows**
3. Click the **three-dot menu** (⋮) in any folder
4. Select **Import**
5. Choose the downloaded `.flopack` file
6. Click **Import**

The workflow and table are now imported with all configurations.

### Step 2: Configure Okta Connection

The workflow requires an Okta connection with specific scopes:

1. Go to **Okta Admin Console** → **Applications** → **Applications**
2. Find **Okta Workflows OAuth** (created automatically when Workflows is enabled)
3. Click on the application
4. Go to **Okta API Scopes** tab
5. Ensure these scopes are granted:
   - `okta.users.read`
   - `okta.users.manage`
6. In **Workflows console** → **Connections**
7. Verify the **Okta** connection is active and working

### Step 3: Configure the API Endpoint

1. Open the imported flow
2. Click on the **API Endpoint** card (first card in the flow)
3. Note the **Invoke URL** (you'll need this for Event Hooks)
4. Configure security:
   - An Alias will be generated, along with a Secret (if selecting Client Credentials to secure the endpoint). You need to add these along with the invoke URL for the Event Hooks.

### Step 4: Create Event Hooks

Create three Event Hooks in Okta Admin Console, all pointing to the same API Endpoint.

#### Event Hook 1: MFA Factor Update

1. Go to **Workflow** → **Event Hooks** in Okta Admin Console
2. Click **Create Event Hook**
3. Configure:
   - **Name:** `Suspicious Activity - MFA Update`
   - **URL:** [Paste the API Endpoint Invoke URL]
   - **Authentication:** Client Secret (if chosen on the API Endpoint WF trigger card)
     - **Client Secret Name:** [Token Alias from Step 3]
     - **Client Secret:** [Token Secret from Step 3]
   - **Events:** Select `user.mfa.factor.update`
4. Click **Save & Continue**
5. Click **Verify** to test the connection (if required)

#### Event Hook 2: Password Reset

Repeat the above process with:
- **Name:** `Suspicious Activity - Password Reset`
- **URL:** [Same API Endpoint URL]
- **Authentication:** [Same credentials]
- **Subscribe to Events:** Select `user.account.reset_password`

#### Event Hook 3: New IP Detection

Repeat the above process with:
- **Name:** `Suspicious Activity - New IP`
- **URL:** [Same API Endpoint URL]
- **Authentication:** [Same credentials]
- **Subscribe to Events:** Select `user.session.start`

### Step 5: Activate the Workflow

1. In Workflows console, open the imported flow
2. Review all connections are valid (green checkmarks)
3. Click **Turn Flow On** (toggle in top-right)

The workflow is now active and monitoring events.

## How It Works

### Event Processing Flow

1. **Event Hook triggers** - One of three events occurs in Okta
2. **API Endpoint receives event** - Flow determines which event type
3. **User validation** - Checks if user is older than 7 days (skips new accounts)
4. **Table lookup** - Checks if user already has a tracking entry
5. **Time calculation** - Determines hours since last event for this user
6. **Branch logic:**
   - **If more than 1 hour elapsed:** Updates entry with new event, clears old events
   - **If less than or equal to 1 hour elapsed:** Updates entry with new event, checks if all 3 present
     - **All 3 present:** Suspends user and deletes table entry
     - **Not all 3:** Continues tracking

### Table Structure

The Workflows Table tracks suspicious activity with these columns:

| Column | Type | Purpose |
|--------|------|---------|
| rowId | Auto | Unique identifier (auto-generated) |
| updated | Auto | Last update timestamp (auto-generated) |
| username | Text | User's username (unique identifier) |
| passwordReset | Text | "Yes" if password reset detected, null otherwise |
| mfaReset | Text | "Yes" if MFA update detected, null otherwise |
| detectedNewIP | Text | "Yes" if new IP detected, null otherwise |

### New IP Detection Handling

Okta sends New IP information in two possible formatsc (json and string). The workflow handles both automatically.

### New User Exclusion

Users created less than 7 days ago are excluded from monitoring. This prevents false positives during legitimate onboarding activities where users naturally set up MFA for the first time, reset temporary passwords, and login from new locations.

## Testing the Workflow

### Test Individual Events

Event Hooks can be tested directly from Okta Admin:

1. Go to **Workflow** → **Event Hooks**
2. Select an Event Hook
3. Click **Preview** tab
4. Click **Deliver Request**
5. Check the Workflows Table to verify entry was created/updated

### Test Full Scenario

To verify complete functionality:

1. Create a test user (either have a test user older than 7 days or remove the "Continue If" card that skips new users temporarily)
2. Within 1 hour, trigger all 3 events:
   - Reset the test user's password
   - Update the test user's MFA factor
   - Generate a user.session.start event with New IP (or use Preview/test from Event Hook)
3. Verify the user is suspended in Okta
4. Verify the table entry for that user is deleted

**Important:** Always test with non-production user accounts.

## Limitations & Considerations

- **1-hour window is fixed** - Modifying the time threshold requires flow changes
- **New users excluded** - Accounts less than 7 days old are not monitored
- **Manual Event Hook setup** - Event Hooks must be created and configured manually
- **Single table cleanup** - Table entries persist for users with incomplete event sets (by design for continued tracking)

## Troubleshooting

### Workflow Not Triggering

- Verify all three Event Hooks are **Active** in Okta Admin
- Check Event Hook **Verification Status** is successful
- Ensure API Endpoint invoke URL matches exactly in all three hooks
- Verify authentication credentials (Client Secret) match between flow and hooks (if used)

### User Not Suspended

- Check Okta connection has required scopes: okta.users.read and okta.users.manage
- Verify the flow is **turned on**
- Check user is older than 7 days
- Review Workflows execution history for errors

### Table Not Updating

- Verify the Workflows Table was imported successfully
- Check table has correct column names

## Customization Ideas

This workflow can be extended to:

- **Add notifications:** Send Slack/email alerts when users are suspended by this workflow
- **Adjust time window:** Modify the 1-hour threshold to suit your security requirements
- **Add more events:** Monitor additional suspicious behaviors
- **Integrate with SIEM:** Send events to external security tools
- **Whitelist users:** Exclude specific users/groups from monitoring

## Author

**Vasilis Caraman**  
Specialist, Technical Account Manager  
Customer Success  
vasilis.caraman@okta.com  
**Okta**
