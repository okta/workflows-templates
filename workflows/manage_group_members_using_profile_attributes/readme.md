# Workflows Template: Manage Okta Group Membership Based on Job Code or Profile Attribute Mapping

## Overview


In many organizations a set of Okta group memberships are determined based on Job Codes or more generally, by user profile attributes to implement Role-based access control (RBAC).  

To keep it simple, we will use the Okta profile attribute "Title" for job codes. Maybe you have users that have a title of "Engineer" and they have to be assigned to specific Okta Groups. When their title changes to "Manager" they have to be assigned to different Okta Groups. Then they get promoted to "VP" and they have other Okta group assignments. Okta table can store the mapping of the titles to groups. Any additional groups that are assigned to the user besides the groups listed in the Okta table are retained. 

## Before you get Started/Pre-requisites: 

Before you get started, you will need:
- Access to an Okta tenant with Okta Workflows enabled for your org 

## Setup Steps to configure the Okta Workflows: 

### Populate the Okta table "*Group Rules*"
- In the *Group Rules* Okta table populate the entries below. Choose the Okta Tables tab, click *Import* and select the csv file `groupRules.csv`
    

    | **functionRole** | **Group**  | 
    |:----------|:----------|
    | Engineer   | Group 3 | 
    | Manager  | Group 3    | 
    | Manager  | Group 2    | 
    | VP  | Group 3    | 
    | VP  | Group 2    | 
    | VP  | Group 1    | 
- Create the following three Groups in Okta (the names have to match the Group name entries in the Okta table)
    - Group 1
    - Group 2
    - Group 3

- Turn On the following flows
    - `[1.0] Fix Groups` - this is the key flow that calls the other flows. 
    - `[1.1] CreateGroupList` - this creates a list of the groups that the user should be a member of based on functionRole
    - `[s1.1.1] CreateListGroupsBasedOnUserAttribute` - this creates a cumulative group list for each functionRole list member. In this sample we are using just the title of the user. However, the logic allows for a list of functionRoles. 
    - `[1.2] Group Addition or Removal` - this adds or removes a specific user from a specific Okta Group
    - 
## Testing this flow
- Create a test user in Okta. Optionally, you can manually assign any groups to the test user.

    - Set the `Title` attribute of the user to `Engineer` (the title has to match the functionRole entries in the Okta table)
        - Run the `Fix Groups` flow; Enter the username of the test user you just created. 
        - The test user should be assigned `Group 3` 
    - Update the `Title` attribute of the user to `Manager`
        - Run the `Fix Groups` flow; Enter the username of the test user you just created. 
        - The test user should be assigned `Group 2` and `Group 3`
    - Update the `Title` attribute of the user to `VP`
        - Run the `Fix Groups` flow; Enter the username of the test user you just created. 
        - The test user should be assigned `Group 1` and `Group 2` and `Group 3`
    - Update the `Title` attribute of the user to `Engineer` 
        - Run the `Fix Groups` flow; Enter the username of the test user you just created. 
        - The test user should be assigned `Group 3` 


- Any additional groups that are assigned to the test user besides `Group 1`, `Group 2` and `Group 3` are unchanged. 



## Limitations & Known Issues

- Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm) to limit the entries in the Okta table, the flow memory limit and the Okta API rate limits. 
]
