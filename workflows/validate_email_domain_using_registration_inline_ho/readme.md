# Validate email domains during registration

## Overview

Okta inline hooks allow you to trigger custom processes at specific points within Okta process flows.

The flow in this template is called by an inline hook during the user self-registration process. It uses a Workflows table to enforce email domain validation. If the user's email domain isn't included in the Workflows table allowlist, the registration is denied with an informative error for the user.

## Prerequisites

- Access to an Okta tenant with Okta Workflows enabled.
- Enable the Self-Service Registration feature for your Okta org.
  - To configure self-service registration, see:
    - [Self-Service Registration](https://help.okta.com/okta_help.htm?type=oie&id=ext-about-ssr)
    - [Collect profile information and register users](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-pe-collect) 

## Procedure

### Configure the allowlist

1. Open the **Allowed domain list** Workflows table
2. To add domains to the allowlist, either:
    - Manually add domains to the table under the **Allowed Domains** column.
    - Click **Import** to import a CSV of allowed domains.
        - Map the correct CSV header to the **Allowed Domains** column when importing.

### Collect the Workflows Invoke URL

1. Open the **Validate Email Domains During Registration** flow and click the `</>` icon on the **API Endpoint** event card.
2. Copy the **Invoke URL**. You need this URL to configure the registration inline hook.

### Setup the registration inline hook

1. In the Okta Admin Console, go to **Workflow > Inline Hooks** and add a registration inline hook.
2. Paste the **Invoke URL** from the **API Endpoint** card into the URL field so that the inline hook points to the flow. Give the hook a useful name, for example, `Email Validation Hook` and click **Save**.

### Add the inline hook to the profile enrollment policy

1. In the Admin Console, go to **Security > Profile Enrollment** and open your self-service enrollment policy.
2. Edit the policy and in the **Use the following inline hook** dropdown list, select the inline hook you created.
3. Select the option to run the hook **When a new user is created** and save the policy.

## Testing

1. Go to your Okta tenant sign-in page and click **Sign Up**.
2. Try to register using an email domain that isn't in the allowlist table.
3. Your registration should be blocked with the error `Invalid domain. Please contact your admin.`
4. Try to register with a domain in the allowlist. Confirm that this attempt succeeds.

## Limitations and known issues

-   Keep in mind the Okta [Workflows system limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits).
-   This template doesn't address error handling.
-   Tables with under 1000 rows are supported in this use case.
