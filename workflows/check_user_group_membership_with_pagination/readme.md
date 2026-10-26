# Check User Group Membership with Pagination

## Overview

This template checks whether an Okta user is a member of a specified Okta group while following every page returned by the Okta API. It is designed for users or groups whose membership lists can exceed the page size supported by a single API response.

The folder contains two helper flows:

- **1.1 Search With Pagination** accepts a user ID and an optional group ID. With both values supplied, it returns a group-membership result. With only a user ID, it returns that user's complete group-membership list.
- **1.2 Get Paginated List** calls the Okta API, follows the `rel="next"` link in each response, and combines the results from all pages.

## Prerequisites

- Access to an Okta tenant with Okta Workflows enabled.
- An Okta Workflows connection authorized to read users and groups.
- Okta user and group IDs for testing.

## Setup Steps

1. Import `workflow.flopack` into Okta Workflows.
2. Open **1.2 Get Paginated List**.
3. Configure the **Okta: Custom API Action** card to use an Okta connection with permission to read users and groups.
4. In the paginated (true) branch, locate the second **Text: Replace** card. Change its **look in** value from the example tenant URL to the base URL of your Okta tenant, such as `https://example.okta.com`. This converts Okta's absolute `rel="next"` link into the relative URL required by **Custom API Action**.
5. Save both helper flows and turn them on.
6. Call **1.1 Search With Pagination** from the flow that needs the membership check.

## Inputs and Results

### Membership check

Supply both inputs to **1.1 Search With Pagination**:

- `userID`: the Okta user ID.
- `groupID`: the Okta group ID.

The returned `GroupMembershipCheckT/F` value is `true` when the user appears in the complete paginated group-membership list. It is `false` when the membership is not found. A nonexistent group ID is therefore reported as `false` rather than distinguished from a valid group that does not contain the user.

### Retrieve all group memberships

Supply `userID` and leave `groupID` blank. The flow returns the user's complete paginated group-membership list.

If `userID` is blank, the flow returns an empty list and does not call the Okta API.

## Testing the Flows

1. Run the membership check with a valid user and a group that contains the user. Confirm the result is `true`.
2. Run it with a valid user and a group that does not contain the user. Confirm the result is `false`.
3. Run it with a valid user and leave `groupID` blank. Confirm the complete group-membership list is returned.
4. Run it with both inputs blank. Confirm the flow succeeds and returns an empty list.
5. Test with a user who belongs to more than 200 groups and select a group beyond the first page. Confirm the flow follows the `rel="next"` link and returns `true`.
6. In a smaller test tenant, pagination can also be exercised by temporarily reducing the `limit` value in both URL composition paths and restoring it to `200` afterward.

## Limitations and Known Issues

- An invalid or nonexistent user ID produces the 404 response returned by the Okta API.
- A `false` membership result means the requested membership was not found; the flow does not make an additional API request to verify that the group itself exists.
- The tenant base URL in the second **Text: Replace** card must be updated after import. If it is not, the first page succeeds but the next-page request fails because **Custom API Action** requires a relative URL beginning with `/`.
- The template does not add custom error-handling behavior for Okta API errors or rate limits.
