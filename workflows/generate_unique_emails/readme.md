## Generate Unique Emails


### <span style="text-decoration:underline;">Overview</span>

To Onboard users in an organization, IT needs to generate unique Email for the end users. 

 
Generate unique Email : In this example uniqueness check is performed using different systems. You can pick the appropriate one for your organization.
1. Validate against O365 Proxy Addresses attribute for Organizations using O365
2. Validate against Google email aliases for Organizations using google mail
3. Validate the Proxy Address against Okta directly, if Okta is the master for provisioning users in the target mailSystem.
4. MultiDomains scenario
    
This flow follows the below logic.
1. Construct email with firstname.lastname@domain.com
2. Check in the email tenants for users starting with prefixes.
3. If already taken increment numbers at the end of lastname.

Example : John.doe@okta.com If there is second John.Doe then the logic will create John.Doe1@okta.com.
    
### <span style="text-decoration:underline;">Before you get Started / Prerequisites</span>
Before you get started, you will need:

1. Access to an Okta tenant with Okta Workflows enabled for your org
2. Access to Email tenant. An admin account is required if you want to test against O365 or Google.
 
           
### <span style="text-decoration:underline;">Setup Steps</span>

1. Import the Email workflow flopack in your workflow environment.
2. Inside the folder you should see 9 flows. Check for below main flows which triggers the emailGeneration based on your Domain and Mailsystem. 
    1. Okta-New-Email-Generation
    2. Google-Email-Generation
    3. O365-Email-Generation
    4. MultiDomain-Email-Generation
3. Depend on your email domain use one of the above flow. Only enable one of the above 4 flows.
4. Enable other subflows.
5. Establish the connections to the target apps inside the main workflow you choose, O365,GoogleApps and Okta.
6. Create a String array attribute in Okta called proxyAddresses.
7. Based on which ever flow you select from above in step 4, open the email-Generation flow and in the end add the ProxyAddresses attribute to the update card and map it as per screenshot below

![image](https://user-images.githubusercontent.com/14205843/91586593-74fe7780-e90a-11ea-99c0-77e2c9449cac.png)


8. If you use the Google-Email-Generation or O365-Email-Generation flow, open the flow in the AssignEmailDomain card and update your emaildomain. For example, if your o365 federated domain is jeykrish.com, use @jeykrish.com. 
9. If you use Okta-New-Email generation follow the below additional steps:
    1. Create a String-array attribute in Okta user profile called proxyAddresses	
    2. Populate the ProxyAddresses attribute from your AD domain or create a sample value as below
       ![image](https://user-images.githubusercontent.com/14205843/91468480-eecd2d00-e846-11ea-800d-2014eef108ae.png)
       
10. If you have multiple domains in your organization, use the MultiDomain-Email-Generation. To use the MultiDomain flow:
      
    1. Setup an attribute in Okta called brandId. You can have any attribute. This attribute is used to determine the mailDomain for the user. For example you can also use a company or something. In this example you can setup a brandID attribute in Okta profile
      
    2. In the Workflow open the multiDomain-Email-Generation flow. Click on the connections in the Read User card. Hit save. That should give the attribute list you can select. Select the brandID attribute you created.
      
    3. Map the brandID to the next card where we continue the flow only if it exists.  When you drag and drop select replace all when it pops up.
      
    4. Click on the Where Expression section in search table flow. Make sure the brandID is mapped there properly. Once all is good save the flow.
      
    5. Now go to table section and click on provisioning table and update the table as below example.
             ![image](https://user-images.githubusercontent.com/14205843/90940864-24949080-e3c5-11ea-875e-5ba3f8415238.png)
             
    6. In my example i have emailTenant represents different end point for validating Email uniqueness. If you just have O365 multiDomain you can remove this form table and go back to the flow to change the logic. Only if you have one single email tenant with multiple domains.  This could be multiple o365 tenants or single O365 tenant with multiple domains.
      1. Create a String-array attribute in Okta user profile called proxyAddresses	 
        For multiple o365 tenants with multiple domains:
                 1. If you have the above environment. Just go back to multidomain flow after completing step f. Change the if else logic
                 ![image](https://user-images.githubusercontent.com/14205843/91472543-77020100-e84c-11ea-942e-f1a1c02ac9d5.png)
                 2. For example you can use the change to brand domain instead of emailTenant. In that way based on the domain you can execute the logic.
                 ![image](https://user-images.githubusercontent.com/14205843/91472615-939e3900-e84c-11ea-9257-8edbedba8585.png)
                 3. Inside the else section make sure you create cards exactly like the one in If since all are flows executing in O365. Vice versa for google or Okta.
                 4. Make sure all connections are setup to the proper email Tenant.
      2. For a single O365 tenants with Multiple domains:
                 1. If you have this setup, use the O365-Email-Generation instead of MultiDomain.
                 2. Open the O365-Email-Generation flow and add the BrandID and search Table cards as per multiDomain flow. Remove the Assign Domain flow.


### <span style="text-decoration:underline;">Testing this Flow</span>

1. Create a user in Okta manually or using some import process. If you creating users manually and you want to use MultiDomain scenario, make sure you set the brandID as a required attribute in Okta profile, since this needs to be provisioned as part of create process. If you don't set this attribute as required, you wont be able to see this during create user.
2. Once user is created in Okta. That should trigger the workflow and generate unique email and update Okta with Primary Email address and ProxyAddress in ProxyAddress attribute.


### <span style="text-decoration:underline;">Limitations & Known Issues</span>
1. Okta workflows does not have any on-premise connector at this time for writing. So all the target should be accessible in public and shall be exposed as an API endpoint.
