# Generate Unique Emails


## Overview

To onboard users in an organization, the IT organization needs to generate unique email addresses for the end users. 
 
To generate unique email addresses: 
In this example, a uniqueness check is performed using different systems. You can pick the appropriate one for your organization.
1. For organizations using Office 365, validate against the Office 365 **Proxy Addresses** attribute.
2. For organizations using Google mail, validate against Google email aliases.
3. If Okta is the source for provisioning users in the target mail system, validate the proxy address against Okta directly.
4. A scenario using multiple domains.
    
This flow follows the pattern:
1. Construct the email address with `firstname.lastname@domain.com`.
2. Check in the email tenants for users starting with the prefix text.
3. If already taken, place an incremental number at the end of `lastname`.

As an example, for the `John.Doe@okta.com` email address, if a second `John.Doe` user is added, then the logic creates `John.Doe1@okta.com`.
    
## Prerequisites

Before you get started, you need:

1. Access to an Okta tenant with Okta Workflows enabled for your org
2. Access to an email tenant. An admin account is required if you want to test using Office 365 or Google.
           
## Setup Steps

1. Install the template into your Workflows environment.
2. Inside the folder you should see nine flows. Check for these main flows, which trigger the **emailGeneration** based on your domain and mail system. 
    1. **Okta-New-Email-Generation**
    2. **Google-Email-Generation**
    3. **Office365-Email-Generation**
    4. **MultiDomain-Email-Generation**
3. Depending on your email domain, enable one of these flows.
4. Enable the other helper flows.
5. Establish the connections to the target apps inside the main flow that you choose, whether it's Office 365, Google, or Okta.
6. Create a `String array` attribute in Okta called **proxyAddresses**.
7. Whichever flow you choose to work with, open the **email-Generation** flow and add the **proxyAddresses** attribute to the update card. Map it according to the following image:

![image](https://user-images.githubusercontent.com/14205843/91586593-74fe7780-e90a-11ea-99c0-77e2c9449cac.png)


8. If you use the **Google-Email-Generation** or **O365-Email-Generation** flow:
    1. Open the flow in the **AssignEmailDomain** card
    1. Update your **emaildomain**. For example, if your Office 365 federated domain is `jeykrish.com`, use `@jeykrish.com`. 
9. If you use the **Okta-New-Email-Generation** flow:
    1. Create a **String-array** attribute in your Okta user profile called **proxyAddresses**	
    2. Populate the **proxyAddresses** attribute from your Active Directory domain, or create a sample value:
       ![image](https://user-images.githubusercontent.com/14205843/91468480-eecd2d00-e846-11ea-800d-2014eef108ae.png)
       
10. If you have multiple domains in your organization, use the **MultiDomain-Email-Generation** flow. To use this flow:
      
    1. Set up an attribute in your Okta profile called **brandId**. This can be any attribute, the attribute is only used to determine the `mailDomain` for the user. For example, you can also use a company domain or company name.
      
    2. In the Workflow, open the **MultiDomain-Email-Generation** flow. Click the connections in the **Read User** card and click **Save**. That allows the attribute list to appear where you can select the various attributes on the user profile. Select the **brandID** attribute that you created.
      
    3. Map the **brandID** to the next card, where the flow continues only if the attribute exists. When you drag and drop the field, select **Replace all** when prompted.
      
    4. Click the **Where Expression** section in the search table flow. Make sure the **brandID** is mapped there properly and save the flow.
      
    5. Now go to the table section and select the provisioning table. Update the table:
             ![image](https://user-images.githubusercontent.com/14205843/90940864-24949080-e3c5-11ea-875e-5ba3f8415238.png)
             
    6. This example has **emailTenant** representing different end points for validating email uniqueness. If you only have an Office 365 domain, you can remove this from the table and go back to the flow to change the logic. Only use the **Multidomain** flows if you have one single email tenant with multiple domains. This could be multiple O365 tenants or a single O365 tenant with multiple domains.
      1. Create a **String-array** attribute in your Okta user profile called **proxyAddresses**. 	 
      2. For multiple O365 tenants with multiple domains:
            1. Change the **If/Else** logic:
            ![image](https://user-images.githubusercontent.com/14205843/91472543-77020100-e84c-11ea-942e-f1a1c02ac9d5.png)
            2. For example, you can use this to change to **brand** domain instead of **emailTenant**. In that way based on the domain, you can execute the logic:
            ![image](https://user-images.githubusercontent.com/14205843/91472615-939e3900-e84c-11ea-9257-8edbedba8585.png)
            3. Inside the **Else** section make sure you create cards exactly like the one inside the **If** section, since all are flows executing in O365. Similarly for Google or Okta.
            4. Make sure that all connections are set up to the proper email tenant.
      2. For a single O365 tenant with multiple domains:
            1. If you have this setup, use the **O365-Email-Generation** instead of **MultiDomain**.
            2. Open the **O365-Email-Generation** flow and add the **BrandID** and **Search Table** cards according to the **MultiDomain** flow. Remove the **Assign Domain** flow.


## Testing this Flow

1. Create a user in Okta manually or using an import process. If you create users manually and you want to use the **MultiDomain** scenario, you must set the **brandID** as a required attribute in the Okta profile. This has to be provisioned as part of the creation process. If you don't set this attribute as required, you won't see the email address when the user gets created.
2. After the user is created in Okta, the flow is triggered and generates a unique email address. The Okta profile is updated using the **Primary Email** address and the `ProxyAddress` in the **ProxyAddress** attribute.


## Limitations & Known Issues
Okta Workflows doesn't have an on-premises connector. 

All the target systems should be accessible in public and be exposed as an API endpoint.
