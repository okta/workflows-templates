# Generate Reports for Okta Realms

## Overview

This template generates a comprehensive report of all Okta Realms created within an Okta organization. It includes detailed information on user assignments to each Realm, providing a clear overview of user distribution and Realm configurations.

## Prerequisites

- Access to an Okta tenant with Okta Workflows and Okta Identity Governance enabled
- A configured Okta Realms connector

## Testing the Flow

1. **Execution:**
   - Execute the **1.0 Get all Realms** flow to generate the reports. You can run this flow on demand or on a regular schedule.
   - Check the **Execution History** tab to review the execution results and ensure that the flow ran as expected.

2. **Validation:**
   - Verify that the generated report includes detailed information about all Okta Realms and user assignments.
   - Cross-check the data with your Okta organization settings to confirm accuracy.

## Limitations & Known Issues

This template assumes that all necessary connections and permissions are correctly configured in Okta.

## Additional Information

For more details on configuring Okta Realms and the Okta Realms connector, refer to the [Okta Realms documentation](https://help.okta.com/okta_help.htm?type=oie&id=ext-realms) and the [Okta Realms Workflows documentation](https://help.okta.com/okta_help.htm?type=wf&id=ext-oktarealms).