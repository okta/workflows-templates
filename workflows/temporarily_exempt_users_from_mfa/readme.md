# <span class="c9">Temporarily exempt users from MFA</span>

## <span class="c2">Overview</span>

Employees often lose and replace their mobile phones. In order to provide temporary access to reset a secondary authenticator, users can be scoped to a less strict authentication policy until they have a device that allows them to comply with high assurance sign-on policies. This template will exempt an Okta user from MFA policies for a predefined period of time.

## <span class="c2">Prerequisites</span>

1.  <span class="c0">Access to an Okta tenant with Okta Workflows
    enabled</span>
2.  A configured Okta Connection. To configure a connection, see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).

## <span class="c2">Setup</span>

<span class="c0">This Workflow template consists of three flows and one table:</span>

<span class="c0"></span>

- <span class="c1">**1.0 User Added to MFA Exempt Group**</span><span
class="c0">: This flow will be triggered when a user is added to our
MFA Exempt Okta Group and then it writes to our MFA Exempt Table.</span>

<span class="c0"></span>

- <span class="c1">**2.0 Find Users to Remove from MFA Exempt Group**
</span><span class="c0">: This is a scheduled flow that searches our MFA
Exempt Table for users that have been added to the MFA Exempt table.</span>

<span class="c0"></span>

- <span class="c1">**3.0 Remove Users from MFA Exempt Group**</span><span
class="c0">: This is a helper flow that will be run to determine if a
user should be removed from the MFA Exempt group.</span>

<span class="c0"></span>

- <span class="c1">**MFA Exempt Table**</span><span class="c0">: This table
is used to log instances where an Okta user is added to the MFA Exempt
group. It is also queried to determine if the Okta user should be removed
from the MFA Exempt group.</span>

### <span class="c3">Okta Admin Console configuration</span>

### <span class="c1">Classic</span>

1.  <span class="c0">Create an Okta Group called “MFA Exempt Users.”
    This Okta Group will be used in our Authentication Sign On policy.
    </span>
2.  Navigate to **Security** > **Authentication** and select the **Sign On**
    tab. Click **Add New Okta Sign-on Policy**.
3.  <span class="c0">Name the policy and type in the “MFA Exempt Users”
    Okta group name in the **Assign to Groups** field. Click on **Update
    Policy** once completed.</span>
4.  Create a new rule within your MFA Exempt policy, name the policy and
    choose **Password** as your required authentication method.
    
### <span class="c1">Okta Identity Engine configuration</span>

1.  <span class="c0">Create an Okta Group called “MFA Exempt Users.”
    This Okta Group will be used in our Authentication Sign On policy.
    </span>
2.  Navigate from **Admin Console** : **Security** > **Global Session Policy**. Click **Add Policy**.
3.  <span class="c0">Name the policy and type in the “MFA Exempt Users”
    Okta group name in the **Assign to Groups** field. Click on **Create policy and add rule** 
    once completed.</span>
4.  Create a new rule within your MFA Exempt policy, name the policy and
    choose **Password** as your required authentication method.

### <span class="c3">Okta Workflows configuration</span>

1.  <span class="c0">Navigate to the flow labeled **1.0 User Added to MFA
    Exempt Group**. In the Branching - Continue If card, enter the Okta
    Group ID of the MFA Exempt Okta Group that was created in step 1
    above.</span>
2.  <span class="c0">Navigate to the flow labeled **3.0 Remove Users from
    MFA Exempt Group**.</span>
3.  <span class="c0">In the Branching - Continue If card, enter the
    amount of time (days) that you would like to allow the user to be
    exempt from MFA.</span>
4.  <span class="c0">In the **Remove User from Group** Group ID input field,
    enter the Okta Group ID of the MFA Exempt Okta Group.</span>

## <span class="c2">Test</span>

1.  <span class="c0">Add a user to the “MFA Exempt Users” Okta
    group.</span>
2.  <span class="c0">Navigate to the MFA Exempt Users Table and modify the **Date Added**
    value for the user that was added to the “MFA Exempt Users” Okta
    Group to a date that is outside the exemption time (days) that was
    defined in the initial configuration. A simple way to do this is to set the exemption
    time to 1 day and modify the “Date Added” value to a date in the
    past.</span>
4.  <span class="c0">Navigate to the **2.0 Find Users to Remove from MFA
    Exempt Group** flow and press the **Test** button.</span>
5.  <span class="c0">The user should be removed from
    the “MFA Exempt Users” Okta group.</span>

## <span class="c2">Limitations & Known Issues</span>

-   <span class="c0">Keep in mind the Okta Workflows [System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).</span>
-   <span class="c0">Error handling is not addressed in this template.
    </span>
