
# Bulk convert users to lite-users

## Overview

This template contains flows designed to automate the classification and management of Okta users as lite users. 

## Prerequisites

- Super admin access to your Okta tenant.
- A configured Okta connector
- Access to **Secure Partner Access**.

## Description

### What is a Lite User?

In Okta, users are classified as standard or lite. By default, all users created in the Admin Console are standard users. However, lite user classification is ideal for creating unique identifiers for business partners.

Key characteristics of lite users:
- **Authentication**: Lite users authenticate through external or social IdPs only. They can't authenticate with an Okta username/password or through Active Directory/LDAP delegated authentication.
- **App Assignment Limits**: Lite users can have up to five apps assigned, excluding Okta first-party apps.
- **Partner Administration**: Lite users are managed through the Partner Admin Portal. This requires them to belong to the appropriate partner realm.

### Included Flows

#### **Convert New Okta User to Lite User**
This flow automatically converts users to lite classification when they're created in Okta. It ensures that new users are ready for partner management.

#### **Update Group Members to Lite Users**
This flow identifies users in specified Okta groups and updates their classification to lite. It's ideal for bulk updates or when managing partner user groups.

## Requirements and Limitations

- Lite users must authenticate through configured external or social IdPs.
- Only users in the appropriate partner realm can be managed through the **Partner Admin Portal**.
- If an admin assigns more than five apps to a lite user, the assignment fails.
- The total app count is based on unique apps, regardless of the number of instances.

## Testing the Flows

- Test the "Convert New Okta User to Lite User" flow by creating a user in Okta and validate in the Okta Admin Console if the user classification has changed.
- Test the "Update Group Members to Lite Users" flow by an Okta group to make the user classification change to and run the flow.
- Verify lite user assignments in the **Partner Admin Portal**.

## Additional Information

- [Okta user classifications](https://help.okta.com/okta_help.htm?type=oie&id=lite-users)
