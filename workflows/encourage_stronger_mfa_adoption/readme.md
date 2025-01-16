# Encourage stronger MFA adoption

This template encourages Okta end users to enroll a stronger factor with their account by monitoring the use of SMS as a factor and SMS factor enrollment.

## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled.
1. Configured Okta Connection. See the configuration steps for the [Okta connector](https://help.okta.com/okta_help.htm?type=wf&id=ext-okta)
1. Configured Okta Devices Connection. See the configuration steps for the [Okta Devices connector](https://help.okta.com/wf/en-us/content/topics/workflows/connector-reference/oktadevices/oktadevices.htm)
1. Configured Office 365 Mail connector. See the configuration steps for the [Office 365 Mail connector](https://help.okta.com/okta_help.htm?type=wf&id=ext-office365mail-misc-guidance). Other notification methods can be used with this template.

## Setup Steps

1. The **1. Monitor Registration of MFA factor** and **2. Monitor Usage of MFA factor** flows detect the enrollment and the use of SMS as a factor. No additional setup is needed for these flows.
1. The **3. Send email to user** flow sends an email to the user if they enrolled SMS as a factor, or use SMS as a factor in your Okta org.
1. The **4. Empty Messaged User Table** flow clears the stored user data that Okta leverages to notify end users about enrollment or use of SMS as a factor.

### Testing

1. Create a test Okta user account and enroll SMS as a factor to their profile. This action triggers the **1. Monitor Registration of MFA factor** flow and sends a notification email to the user.
1. Create an authentication policy that uses SMS as a factor and sign in the test user created previously. Use SMS as a factor when prompted. This triggers the **2. Monitor Usage of MFA factor** flow.

### Limitations & Known Issues

* Keep in mind the [Okta Workflows system limits](https://help.okta.com/okta_help.htm?type=wf&id=ext-workflows-system-limits).
* Error handling isn't handled in this tutorial.
