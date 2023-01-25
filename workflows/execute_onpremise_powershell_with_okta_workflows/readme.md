---
identifier: 831a3ea7-6ff0-4013-a7a7-ea7601467b13
language: en
title: Execute On-Premise PowerShell with Okta Workflows
---

<span id="ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml"></span>

# <span class="c31">Execute</span> <span class="c31"> On-Premise PowerShell</span> <span class="c16 c31 c35"> with Okta Workflows</span>

<span class="c26 c16"></span>

<span class="c16 c26"></span>

------------------------------------------------------------------------

## <span class="c22 c16"></span>

## Overview

<span class="c0">Microsoft PowerShell is used for many different use
cases, from system management, networking, Windows, and identity. With
regards to Identity Management, PowerShell is commonly used as part of
the joiner, mover, and leaver processes to manage Microsoft
Technologies, and for a small subset of use cases, it performs
on-premises operations such as creating an Exchange mailbox.</span>

<span class="c0"></span>

<span class="c0">With Okta, you can execute PowerShell on-premises with
a combination of Okta Workflows + Azure Automation. Azure Automation
delivers a cloud-based automation service that supports automation
across Microsoft Azure, on-premises non-Azure, and hybrid
environments.</span>

<span class="c0"></span>

<span class="c34">This guide gives</span> <span class="c0"> IT
administrators what they need to incorporate PowerShell execution into
the user’s lifecycle from the Okta Identity Cloud.</span>

## Before you get started

<span class="c0">For this particular use case, PowerShell will set the
log-on hours locally on the Windows Server. You can make any necessary
changes to invoke your own PowerShell and deliver any other use case
that requires the execution of a PowerShell on-premises.</span>

#### <span class="c31">Pre-requirements</span>

1.  <span class="c8">Install Microsoft PowerShell 7 as described </span>
    <span class="c18">
    <a href="https://www.google.com/url?q=https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view%3Dpowershell-7&amp;sa=D&amp;source=editors&amp;ust=1624896848558000&amp;usg=AOvVaw3SF3rRRsYSqSRgEYFpplwk" class="c12">here</a>
    </span> <span class="c0"> on a Windows server. </span>

<!-- -->

1.  <span class="c0">The configuration and screenshots captured were
    taken from a Windows Server 2016 DataCenter on AWS configured as an
    AD Domain Controller, using Microsoft PowerShell
    7.3.0-win-x64.msi.</span>

<!-- -->

2.  <span class="c0">Azure Automation is only available through a
    subscription plan.</span>
3.  <span class="c0">During the step-by-step instructions a particular
    naming convention is used when creating the objects at Microsoft
    Azure, if by any reason you use a different naming convention, make
    the appropriate changes in all of the commands and references.
    Otherwise the solution will not be able to link back to the objects
    you are creating.</span>

## <span class="c22 c16">Step-by-Step instructions</span>

### <span class="c16 c23">Create a new Automation Account</span>

1.  <span class="c8">Log-in to </span> <span class="c18">
    <a href="https://www.google.com/url?q=https://portal.azure.com&amp;sa=D&amp;source=editors&amp;ust=1624896848561000&amp;usg=AOvVaw0EaArFLb30LNnf6fBJkrxP" class="c12">https://portal.azure.com</a>
    </span> <span class="c0"> </span>
2.  <span class="c8">In the Microsoft Azure portal search for “</span>
    <span class="c5">Automation Accounts</span> <span
    class="c0">”.</span>

<span class="c0"></span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 103.68px;">
<img src="./images/image2.png" style="width: 384.00px; height: 103.68px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c8 c16 c21"></span>

3.  <span class="c8 c21">Click on “</span> <span class="c5 c21">+
    New</span> <span class="c8 c21">” to add a new automation
    account.</span>

<span class="c0"></span>

4.  <span class="c8">Name the new Automation Account “</span> <span
    class="c5">OktaPowershellAutomationAccount</span> <span
    class="c8">”</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 336.00px; height: 341.60px;">
<img src="./images/image48.png" style="width: 336.00px; height: 341.60px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

5.  <span class="c8">Click “</span> <span class="c5">Create new</span>
    <span class="c0">” below the Resource group drop down</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 150.00px;">
<img src="./images/image65.png" style="width: 240.00px; height: 150.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

6.  <span class="c8">Name the resource group </span> <span
    class="c8"> “</span> <span
    class="c5">OktaPowershellLogAnalyticsResourceGroup</span> <span
    class="c0">” and click OK. </span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 170.40px;">
<img src="./images/image51.png" style="width: 240.00px; height: 170.40px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

<span class="c0"></span>

<span class="c0"></span>

<span class="c0"></span>

<span class="c0"></span>

7.  <span class="c8">Confirm that “</span> <span class="c5">Create Azure
    Run As account</span> <span class="c0">” is set to Yes.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 116.40px;">
<img src="./images/image71.png" style="width: 240.00px; height: 116.40px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

8.  <span class="c8">Click “</span> <span class="c5">Create</span> <span
    class="c0">” to create your new automation account.</span>
9.  <span class="c8">It may take a minute before your new automation
    account is created, once you receive confirmation you will be able
    to see it in the “</span> <span class="c5">Automation
    Accounts</span> <span class="c0">” list.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 186.00px;">
<img src="./images/image11.png" style="width: 240.00px; height: 186.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

### <span class="c23 c16">Create a new Log Analytics Workspace</span>

<span class="c0">In order to use Azure Automation Runbooks on-premises,
we will need to set up a Log Analytics Workspace. This is a service in
Azure that provides monitoring and logging for the various Azure
services. </span>

<span class="c0"></span>

1.  <span class="c0">In the Azure Portal search for Log Analytics
    Workspaces.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 133.66px;">
<img src="./images/image86.png" style="width: 480.00px; height: 133.66px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

2.  <span class="c8">Click “</span> <span class="c5">+ New</span> <span
    class="c0">” to add a new log analytics workspace.</span>

<span class="c0"></span>

3.  <span class="c8"></span> <span class="c8">Select the resource group
    </span> <span
    class="c5">OktaPowershellLogAnalyticsResourceGroup</span> <span
    class="c8"> that we created at step 6 for </span> <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.5vfe02tkctah" class="c12">Create a new Automation Accounts</a>
    </span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 307.94px;">
<img src="./images/image32.png" style="width: 480.00px; height: 307.94px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

4.  <span class="c8">Name the log analytics workspace “</span> <span
    class="c5">OktaPowershellLogAnalyticsWorkspaceName”</span> <span
    class="c8">.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 305.72px;">
<img src="./images/image44.png" style="width: 480.00px; height: 305.72px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

5.  <span class="c8">Click “</span> <span class="c5">Review +
    Create</span> <span class="c0">”. This will not yet create the new
    log analytics workspace, but will allow you to review the
    configuration.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 305.72px;">
<img src="./images/image50.png" style="width: 480.00px; height: 305.72px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c5 c16 c32"></span>

6.  <span class="c8">Once the validation is finished, you should see a
    confirmation and now you can click “</span> <span
    class="c5">Create</span> <span class="c0">” to finish the creation
    process.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 406.15px;">
<img src="./images/image78.png" style="width: 480.00px; height: 406.15px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

<span class="c0"></span>

7.  <span class="c0">After you click create the deployment process will
    start, once complete you should see similar information.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 206.03px;">
<img src="./images/image63.png" style="width: 480.00px; height: 206.03px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

### Create a new “Application Insight<span class="c23 c16">”</span>

<span class="c0">In order to use Azure Automation Runbooks on-premises,
we will need to set up Application Insight. This is a service in Azure
that collects, analyzes, and acts on telemetry data from your Azure and
on-premises environments. </span>

<span class="c0"></span>

1.  <span class="c8">In the Azure Portal search for “</span> <span
    class="c5">Application Insights</span> <span class="c8">”</span>
    <span class="c0">.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 111.36px;">
<img src="./images/image40.png" style="width: 384.00px; height: 111.36px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

2.  <span class="c8">Click “</span> <span class="c5">+ New</span> <span
    class="c0">” to add a new application insight.</span>
3.  <span class="c8"></span> <span class="c8">Select the resource group
    </span> <span
    class="c5">OktaPowershellLogAnalyticsResourceGroup</span> <span
    class="c8"> that we created at step 6 for </span> <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.5vfe02tkctah" class="c12">Create a new Automation Accounts</a>
    </span>

<span class="c0"></span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 311.04px;">
<img src="./images/image20.png" style="width: 384.00px; height: 311.04px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

4.  <span class="c8">Name the log analytics workspace“</span> <span
    class="c5">OktaPowershellApplicationInsights”</span> <span
    class="c8">.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 310.40px;">
<img src="./images/image15.png" style="width: 384.00px; height: 310.40px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

5.  <span class="c8">Select the log analytics
    workspace group </span> <span
    class="c5">OktaPowershellLogAnalyticsWorkspaceName</span> <span
    class="c8"> that we created at </span> <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.vwn26oxu2rcl" class="c12">Create a new Log Analytics Workspaces</a>
    </span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 301.06px;">
<img src="./images/image66.png" style="width: 384.00px; height: 301.06px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c5 c16 c32"></span>

6.  <span class="c8">Click “</span> <span class="c5">Review +
    Create</span> <span class="c0">”. This will not yet create the new
    log analytics workspace, but will allow you to review the
    configuration.</span>

<span class="c0"></span>

7.  <span class="c8">Once the validation is finished, you should see a
    confirmation and now you can click</span> <span
    class="c5">"Create</span> <span class="c8">” to finish the creation
    process.</span>

<span class="c0"></span>

8.  <span class="c0">After you click create the deployment process will
    start, once complete you should see similar information.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 203.08px;">
<img src="./images/image3.png" style="width: 480.00px; height: 203.08px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

### <span class="c23 c16">Configure the Windows Server machine</span>

<span class="c8">Log-on to your Windows Server, and run the following
commands in the Microsoft PowerShell 7 window.</span>

<!-- -->

1.  <span class="c8">“</span> <span class="c5">Install-Module AZ
    -Force</span> <span class="c8">”</span> <span class="c0"> (depending
    on the machine this may take a few minutes).</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 200.45px;">
<img src="./images/image27.png" style="width: 384.00px; height: 200.45px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

2.  <span class="c8">“</span> <span class="c5">Connect-AZAccount</span>
    <span class="c8">”</span> <span class="c8"> (</span> <span
    class="c8">Complete the sign in operation at the browser
    window</span> <span class="c0">)</span>



    *  <span class="c5 c10">Note:</span> <span class="c8 c10 c27"> You need
    to use an account that has a Microsoft Azure subscription.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 215.81px;">
<img src="./images/image85.png" style="width: 384.00px; height: 215.81px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

<span class="c0">Once authenticated you should see the following
message.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 432.00px; height: 181.25px;">
<img src="./images/image76.png" style="width: 432.00px; height: 181.25px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

3.  <span class="c0">Set the resource id into a variable</span>


    *  <span class="c5 c16 c32">$AAResourceID = (Get-AzResource
    -ResourceType "Microsoft.Automation/automationAccounts" -Name
    "OktaPowershellAutomationAccount").resourceid</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 432.00px; height: 238.54px;">
<img src="./images/image6.png" style="width: 432.00px; height: 238.54px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

4.  <span class="c0">Set the workspace resource id into a
    variable</span>



    *  <span class="c5 c16 c32">$WSResourceID = (Get-AzResource
    -ResourceType "Microsoft.OperationalInsights/workspaces" -Name
    "OktaPowershellLogAnalyticsWorkspaceName").resourceid</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 432.00px; height: 238.54px;">
<img src="./images/image9.png" style="width: 432.00px; height: 238.54px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c5 c16 c25"></span>

<span class="c5 c16 c25"></span>

<span class="c5 c16 c25"></span>

5.  <span class="c8">Link the account id and workspace id</span>

    *  <span class="c5 c16 c32">New-AzDiagnosticSetting -ResourceId $AAResourceID -WorkspaceId $WSResourceID -Name service</span>

6.  <span class="c8">Execute the following command:</span>

    *  <span class="c5 c16 c32">Register-AzResourceProvider -ProviderNamespace "Microsoft.OperationsManagement"</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 435.51px;">
<img src="./images/image87.png" style="width: 384.00px; height: 435.51px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

7.  <span class="c0">Execute the following command:</span>

    *  <span class="c5">Set-AzOperationalInsightsIntelligencePack
    -ResourceGroupName OktaPowershellLogAnalyticsResourceGroup
    -WorkspaceName OktaPowershellLogAnalyticsWorkspaceName
    -IntelligencePackName "AzureAutomation" -Enabled $true</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 260.68px;">
<img src="./images/image19.png" style="width: 480.00px; height: 260.68px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

8.  <span class="c0">Back in the Azure portal, we will download the
    agent from our workspace to the Windows Server. </span>

<span class="c0"></span>

9.  <span class="c8">Navigate to the “</span> <span class="c5">Log
    Analytics Workspace”</span> <span class="c5">.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 115.79px;">
<img src="./images/image25.png" style="width: 384.00px; height: 115.79px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0">.</span>

10.  <span class="c8">Select the “</span> <span
    class="c5">OktaPowershellLogAnalyticsWorkspaceName</span> <span
    class="c0">” from the list.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 192.00px; height: 181.37px;">
<img src="./images/image69.png" style="width: 192.00px; height: 181.37px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

11.  <span class="c8">On the left-pane, search for “</span> <span
    class="c5">Agent management</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 192.00px; height: 189.64px;">
<img src="./images/image59.png" style="width: 192.00px; height: 189.64px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

12. <span class="c0">Download the version that matches the Windows
    Server you are currently using. Select either the 64 bit or the 32
    bit version of the Agent. </span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 168.96px;">
<img src="./images/image34.png" style="width: 384.00px; height: 168.96px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

13. <span class="c8">Save the </span> <span class="c5">Workspace
    ID</span> <span class="c8"> and </span> <span class="c5">Primary
    key</span> <span class="c0">, we will use that information
    later.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 180.18px;">
<img src="./images/image75.png" style="width: 480.00px; height: 180.18px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

14. <span class="c0">Once the download is complete, execute the Agent
    Setup (MMASetup-\*\*\*\*.exe), click “Next >”.</span>
15. <span class="c8">Select “</span> <span class="c5">Select Connect the
    agent to Azure Log Analytics (OMS)</span> <span class="c0">”, click
    “Next >”</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 220.21px;">
<img src="./images/image67.png" style="width: 288.00px; height: 220.21px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

16. <span class="c8"> Use the </span> <span class="c5">Workspace
    ID</span> <span class="c8"> and </span> <span class="c5">Primary
    </span> <span class="c5">Key</span> <span class="c8"> that</span>
    <span class="c0"> we copied on step 11, click “Next >”.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 293.12px;">
<img src="./images/image10.png" style="width: 384.00px; height: 293.12px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

17. <span class="c8">Select the Microsoft Update option that best suits
    your organization and continue until the installation is
    complete.</span>
18. <span class="c8">When the agent is installed, the “</span> <span
    class="c5">HybridRegistration.psd1</span> <span class="c8">”
    PowerShell module gets copied to the agent</span> <span
    class="c0"> installation folder.</span>
19. <span class="c8">On a Windows PowerShell navigate to “C:\\Program
    Files\\Microsoft Monitoring Agent\\Agent\\AzureAutomation\\</span>
    <span class="c5">\<version></span> <span
    class="c0">\\HybridRegistration\\”, your version might be different
    from the one used during the creation of this document.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 186.67px;">
<img src="./images/image81.png" style="width: 624.00px; height: 186.67px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

20. <span class="c8">Then execute the following command on Windows
    Desktop PowerShell </span> <span class="c5">not</span> <span
    class="c0"> MicrosoftPowerShell 7:</span>

    *  <span class="c0">Import-Module .\\HybridRegistration.psd1</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 110.67px;">
<img src="./images/image55.png" style="width: 624.00px; height: 110.67px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c8 c13 c16"></span>

<span class="c8 c16 c13"></span>

21. <span class="c0">Back at Microsoft Azure portal, search for
    automation accounts.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 103.68px;">
<img src="./images/image2.png" style="width: 384.00px; height: 103.68px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

22. <span class="c8">Select “</span> <span
    class="c5">OktaPowershellAutomationAccount</span> <span
    class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 186.00px;">
<img src="./images/image11.png" style="width: 240.00px; height: 186.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

23. <span class="c8">In the Search field, type </span> <span
    class="c5">keys</span> <span class="c8"> and select “</span> <span
    class="c5">Keys</span> <span class="c0">” from the pane.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 336.00px; height: 220.27px;">
<img src="./images/image70.png" style="width: 336.00px; height: 220.27px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

24. <span class="c8">Take note of the </span> <span class="c5">primary
    access key</span> <span class="c8">, and </span> <span
    class="c5">URL</span> <span class="c0">, we will use this
    information to run a PowerShell command.</span>
25. <span class="c8">Go back to your Windows Server machine, and open
    notepad. From the following command replace </span> <span
    class="c5">\<URL> </span> <span class="c8">and </span> <span
    class="c5">\<Primary_access_key></span> <span class="c0"> with the
    information we copied on step 22.</span>

    *  <span class="c8 c13">Add-HybridRunbookWorker –GroupName
    OktaPowershellLogAnalyticsResourceGroup -EndPoint "</span> <span
    class="c5 c13">\<URL></span> <span class="c8 c13">" -Token "</span>
    <span class="c5 c13">\<Primary_access_key></span> <span
    class="c8 c13">"</span>

<!-- -->

26. <span class="c0">Now, on a Windows Desktop PowerShell</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 528.00px; height: 176.98px;">
<img src="./images/image83.png" style="width: 528.00px; height: 176.98px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

27. <span class="c0">Execute the command you built on step 23.a.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 528.00px; height: 148.62px;">
<img src="./images/image62.png" style="width: 528.00px; height: 148.62px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

### <span class="c23 c16">Configure Runbooks + Webhooks</span>

1.  <span class="c0">Back at Microsoft Azure portal, search for
    automation accounts.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 103.68px;">
<img src="./images/image2.png" style="width: 384.00px; height: 103.68px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

2.  <span class="c8">Select “</span> <span
    class="c5">OktaPowershell</span> <span
    class="c5">AutomationAccount</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 186.00px;">
<img src="./images/image11.png" style="width: 240.00px; height: 186.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

3.  <span class="c8">In the Search field, type </span> <span
    class="c5">runbooks</span> <span class="c8"> and select “</span>
    <span class="c5">Runbooks</span> <span class="c0">” from the
    pane.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 253.44px;">
<img src="./images/image23.png" style="width: 384.00px; height: 253.44px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

4.  <span class="c8"> Click “</span> <span class="c5">+ Create a
    runbook</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 210.00px;">
<img src="./images/image30.png" style="width: 480.00px; height: 210.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

5.  <span class="c8">Enter a name for the runbook “</span> <span
    class="c5">OktaPowerShell</span> <span class="c8">” and choose
    “</span> <span class="c5">PowerShell” </span> <span class="c0">as
    the Runbook type.</span>
6.  <span class="c0">Click “Create”.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 302.40px;">
<img src="./images/image18.png" style="width: 240.00px; height: 302.40px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

7.  <span class="c8">You should automatically be taken to the “</span>
    <span class="c5">Edit PowerShell Runbook</span> <span class="c8">”
    UI, if you already see the below screen you can jump to </span>
    <span class="c8">step 11.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 219.32px;">
<img src="./images/image22.png" style="width: 480.00px; height: 219.32px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

8.  <span class="c8">Go back to your “</span> <span
    class="c5">OktaPowershellAutomationAccount</span> <span class="c8">”
    at “</span> <span class="c5">Automation Accounts</span> <span
    class="c0">”.</span>
9.  <span class="c8">In the Search field, type </span> <span
    class="c5">runbooks</span> <span class="c8"> and select “</span>
    <span class="c5">Runbooks</span> <span class="c8">” from the pane,
    select the newly created “</span> <span
    class="c5">OktaPowerShell</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 214.45px;">
<img src="./images/image24.png" style="width: 384.00px; height: 214.45px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

10. <span class="c0">Click “Edit”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 219.32px;">
<img src="./images/image28.png" style="width: 480.00px; height: 219.32px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

11. <span class="c8">Copy and paste the shell script below into the
    UI</span> <span class="c0">.</span>

<span class="c0"></span>

<span
id="ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#t.6fe2011f9d999b179b05583e5f65e1ada09cc9e1"></span>
<span id="ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#t.0"></span>

<table class="c46">
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd c36">
<td class="c44"><p><span class="c8 c16 c13">## Title:           setlogonhours.ps1</span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13"># First things first</span></p>
<p><span class="c8 c16 c13"> param (</span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13">        [Parameter(Mandatory=$true)]</span></p>
<p><span class="c8 c16 c13">        [object] </span></p>
<p><span class="c8 c16 c13">        $WebhookData </span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13">     )</span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13">  Import-Module ActiveDirectory</span></p>
<p><span class="c8 c16 c13">if (-not (Get-Module ActiveDirectory)){</span></p>
<p><span class="c8 c16 c13">}</span></p>
<p><span class="c8 c16 c13">Import-Module Microsoft.PowerShell.Utility</span></p>
<p><span class="c8 c16 c13">if (-not (Get-Module Microsoft.PowerShell.Utility)){</span></p>
<p><span class="c8 c16 c13">}</span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13">## Example 1 logon hours // 7:00 a.m. – 7:00 p.m. Monday – Friday, and 7:00 a.m. to 6:00 p.m. Saturday</span></p>
<p><span class="c8 c16 c13">[byte[]]$hours1 = @(0,0,0,0,224,255,1,224,255,1,224,255,1,224,255,1,224,255,1,224,255)</span></p>
<p><span class="c8 c16 c13"> </span></p>
<p><span class="c8 c16 c13">&lt;#</span></p>
<p><span class="c8 c16 c13">Each day of the week has 3 blocks. Each block is 8 hours.</span></p>
<p><span class="c8 c16 c13">Segment 1: 6pm-2am; Segment 2: 2am-10am; Segment 3: 10am-6pm</span></p>
<p><span class="c8 c16 c13">Note: I am in CST. These segments may be mapped to different timeframes if you are in a different time zone.</span></p>
<p><span class="c8 c16 c13">Each 1 hour block in the GUI represents 1 bit in a binary octet, but reversed order. Thus, a decimal value of 7 (binary value of 00000111) would equate to the first three hours of a segment. If the 7 were in segment 3 it would equate to 10am-1pm.</span></p>
<p><span class="c8 c16 c13"> </span></p>
<p><span class="c8 c16 c13">Example:</span></p>
<p><span class="c8 c16 c13"> </span></p>
<p><span class="c8 c16 c13">[byte[]]$hours = @(</span></p>
<p><span class="c8 c16 c13">    255,255,255, #Sun, 6pm previous day to 6pm present day</span></p>
<p><span class="c8 c16 c13">    255,255,255, #Mon</span></p>
<p><span class="c8 c16 c13">    255,255,255, #Tue</span></p>
<p><span class="c8 c16 c13">    255,255,255, #Wed</span></p>
<p><span class="c8 c16 c13">    255,255,255, #Thu</span></p>
<p><span class="c8 c16 c13">    255,255,255, #Fri</span></p>
<p><span class="c8 c16 c13">    255,255,255  #Sat</span></p>
<p><span class="c8 c16 c13">)</span></p>
<p><span class="c8 c16 c13">#&gt;</span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13">if ($WebhookData){</span></p>
<p><span class="c8 c16 c13">    $inObject = ConvertFrom-Json -InputObject $WebhookData.RequestBody</span></p>
<p><span class="c8 c16 c13">    $memberSamAccountName = $inObject.member </span></p>
<p><span class="c8 c16 c13">    write-output $memberSamAccountName</span></p>
<p><span class="c8 c16 c13">}</span></p>
<p><span class="c8 c16 c13">Get-ADUser -Identity $memberSamAccountName </span></p>
<p><span class="c8 c16 c13">Set-ADUser -Identity $memberSamAccountName -Replace @{logonhours = $hours1}</span></p>
<p><span class="c8 c16 c13">Write-Host "Setting Example 1 logon times for $member"</span></p>
<p><span class="c8 c16 c13">           </span></p>
<p><span class="c8 c16 c13"> </span></p>
<p><span class="c8 c16 c13"></span></p>
<p><span class="c8 c16 c13">Get-ComputerInfo</span></p></td>
</tr>
</tbody>
</table>

<span class="c0"></span>

<span class="c10 c37">Note:</span> <span class="c26 c10 c40"> The code
above could be replaced by ANY code that uses SamAccountName to identify
the user and perform some particular operation, from creating a local
mailbox to populating the proxyAddress attribute.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 373.33px;">
<img src="./images/image79.png" style="width: 624.00px; height: 373.33px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

12. <span class="c8">Click “</span> <span class="c5">Publish</span>
    <span class="c0">” to publish your new code.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 287.26px;">
<img src="./images/image84.png" style="width: 480.00px; height: 287.26px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

13. <span class="c8">Click “</span> <span class="c5">Yes</span> <span
    class="c0">” to proceed and publish the code.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 74.58px;">
<img src="./images/image56.png" style="width: 480.00px; height: 74.58px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

14. <span class="c8">After publishing, In the Search field, type </span>
    <span class="c5">webhooks</span> <span class="c8"> and select
    “</span> <span class="c5">Webhooks</span> <span class="c0">” from
    the pane.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 195.69px;">
<img src="./images/image35.png" style="width: 480.00px; height: 195.69px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c8 c10 c13">A webhook allows an external service (in our
case Okta Workflows) to start a particular runbook in Azure Automation
through a single HTTP request. Microsoft reference on webhooks is
</span> <span class="c18 c10 c13">
<a href="https://www.google.com/url?q=https://docs.microsoft.com/en-us/azure/automation/automation-webhooks&amp;sa=D&amp;source=editors&amp;ust=1624896848618000&amp;usg=AOvVaw3oobZA2A6XBUXS--06aQqa" class="c12">here</a>
</span> <span class="c8 c10 c13">.</span>

<span class="c0"></span>

15. <span class="c8">Select “</span> <span class="c5">+ Add
    Webhook</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 110.03px;">
<img src="./images/image72.png" style="width: 480.00px; height: 110.03px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

16. <span class="c8">Select “</span> <span class="c5">Create new
    webhook</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 216.00px;">
<img src="./images/image80.png" style="width: 240.00px; height: 216.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

17. <span class="c8">Name your new Webhook as “</span> <span
    class="c5">OktaPowershellOnPremiseWebhook</span> <span
    class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 192.00px; height: 242.82px;">
<img src="./images/image26.png" style="width: 192.00px; height: 242.82px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

18. <span class="c5">Copy and paste the URL</span> <span class="c8"> for
    later use, </span> <span class="c8 c10">you won’t be able to
    retrieve this URL after clicking OK</span> <span class="c0">.</span>
19. <span class="c8">Click “</span> <span class="c5">OK</span> <span
    class="c0">”.</span>
20. <span class="c8">Select “</span> <span class="c5">Configure
    parameters and run settings</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 240.00px; height: 218.40px;">
<img src="./images/image43.png" style="width: 240.00px; height: 218.40px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

21. <span class="c8">Provide “</span> <span
    class="c5">\[EmptyString\]</span> <span class="c0">” as the
    WEBHOOKDATA</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 192.00px; height: 256.00px;">
<img src="./images/image16.png" style="width: 192.00px; height: 256.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

22. <span class="c8">Select “</span> <span class="c5">Hybrid
    Worker</span> <span class="c0">” for the Run Settings.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 192.00px; height: 272.73px;">
<img src="./images/image58.png" style="width: 192.00px; height: 272.73px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

23. <span class="c8">Choose “</span> <span
    class="c5">OktaPowershellLogAnalyticsResourceGroup</span> <span
    class="c0">” as the Hybrid Worker group</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 192.00px; height: 272.73px;">
<img src="./images/image46.png" style="width: 192.00px; height: 272.73px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

24. <span class="c8">Click “</span> <span class="c5">OK</span> <span
    class="c0">”.</span>
25. <span class="c8">Click “</span> <span class="c5">Create</span> <span
    class="c0">”.</span>

<span class="c0"></span>

### <span class="c23 c16">New App Registration</span>

<span class="c8">In order to monitor the output of the Azure Automation
Jobs, we need to create an App Registration.</span>

1.  <span class="c8">In the Azure Portal, search for “</span> <span
    class="c5">App Registrations</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 96.48px;">
<img src="./images/image82.png" style="width: 288.00px; height: 96.48px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

2.  <span class="c8">Click “+ </span> <span class="c5">New
    registration</span> <span class="c0">”.</span>
3.  <span class="c8">Name the new application “</span> <span
    class="c5">OktaPowershellAzureADAppRegistration</span> <span
    class="c0">”.</span>
4.  <span class="c0">Select the supported account types according to
    your security policies.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 135.14px;">
<img src="./images/image42.png" style="width: 480.00px; height: 135.14px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

5.  <span class="c0">The redirect URI will be one of the two options
    below, depending on the Okta environment you are using:</span>

<!-- -->

1.  <span class="c8">Okta Preview: </span> <span class="c18">
    <a href="https://www.google.com/url?q=https://oauth.workflows.oktapreview.com/oauth/httpfunctions/cb&amp;sa=D&amp;source=editors&amp;ust=1624896848624000&amp;usg=AOvVaw0X19DYq3NXyaHIOYDlKv2k" class="c12">https://oauth.workflows.</a>
    </span> <span class="c42 c37">
    <a href="https://www.google.com/url?q=https://oauth.workflows.oktapreview.com/oauth/httpfunctions/cb&amp;sa=D&amp;source=editors&amp;ust=1624896848625000&amp;usg=AOvVaw0E1QGGpfak5G1__mbmIG8s" class="c12">oktapreview</a>
    </span> <span class="c18">
    <a href="https://www.google.com/url?q=https://oauth.workflows.oktapreview.com/oauth/httpfunctions/cb&amp;sa=D&amp;source=editors&amp;ust=1624896848625000&amp;usg=AOvVaw0E1QGGpfak5G1__mbmIG8s" class="c12">.com/oauth/httpfunctions/cb</a>
    </span>
2.  <span class="c8">Okta Production: </span> <span class="c18">
    <a href="https://www.google.com/url?q=https://oauth.workflows.okta.com/oauth/httpfunctions/cb&amp;sa=D&amp;source=editors&amp;ust=1624896848626000&amp;usg=AOvVaw34-V5bagHJj8YHAIujx-az" class="c12">https://oauth.workflows.</a>
    </span> <span class="c37 c42">
    <a href="https://www.google.com/url?q=https://oauth.workflows.okta.com/oauth/httpfunctions/cb&amp;sa=D&amp;source=editors&amp;ust=1624896848626000&amp;usg=AOvVaw34-V5bagHJj8YHAIujx-az" class="c12">okta</a>
    </span> <span class="c18">
    <a href="https://www.google.com/url?q=https://oauth.workflows.okta.com/oauth/httpfunctions/cb&amp;sa=D&amp;source=editors&amp;ust=1624896848626000&amp;usg=AOvVaw34-V5bagHJj8YHAIujx-az" class="c12">.com/oauth/httpfunctions/cb</a>
    </span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 141.78px;">
<img src="./images/image64.png" style="width: 480.00px; height: 141.78px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

6.  <span class="c8">Click “</span> <span class="c5">Register</span>
    <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 143.26px;">
<img src="./images/image17.png" style="width: 480.00px; height: 143.26px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

7.  <span class="c8">After registering, In the Search field, type
    </span> <span class="c5">api permissions</span> <span
    class="c8"> and select “</span> <span class="c5">API
    Permissions</span> <span class="c0">” from the pane.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 146.88px;">
<img src="./images/image47.png" style="width: 288.00px; height: 146.88px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

8.  <span class="c8">Select “</span> <span class="c5">API
    Permissions</span> <span class="c8">”, click “</span> <span
    class="c5">+ Add a permission</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 250.49px;">
<img src="./images/image37.png" style="width: 384.00px; height: 250.49px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

9.  <span class="c8">Click “</span> <span class="c5">Azure Service
    Management</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 178.04px;">
<img src="./images/image49.png" style="width: 480.00px; height: 178.04px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

10. <span class="c8">Select the </span> <span
    class="c5">user_impersonation</span> <span
    class="c0"> permission.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 279.60px;">
<img src="./images/image12.png" style="width: 480.00px; height: 279.60px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

11. <span class="c8">Click “</span> <span class="c5">Add
    permissions</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 276.92px;">
<img src="./images/image13.png" style="width: 480.00px; height: 276.92px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

12. <span class="c8">Click “</span> <span class="c5">Grant admin consent
    for \<YourOrganization></span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 145.48px;">
<img src="./images/image21.png" style="width: 480.00px; height: 145.48px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

13. <span class="c8">Click “</span> <span class="c5">Yes</span> <span
    class="c0">” to grant consent for the requested permissions.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 68.68px;">
<img src="./images/image73.png" style="width: 480.00px; height: 68.68px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 145.48px;">
<img src="./images/image45.png" style="width: 480.00px; height: 145.48px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

14. <span class="c8">In the Search field, type </span> <span
    class="c5">certificates & secrets</span> <span class="c8"> and
    select “</span> <span class="c5">Certificates & Secrets</span> <span
    class="c0">” from the pane.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 181.44px;">
<img src="./images/image41.png" style="width: 288.00px; height: 181.44px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

15. <span class="c8">Click “</span> <span class="c5">New client
    secret</span> <span class="c0">” to create a new secret for the
    app.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 350.69px;">
<img src="./images/image60.png" style="width: 384.00px; height: 350.69px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

16. <span class="c8">Add a description, “</span> <span class="c5">Okta
    Workflows</span> <span class="c8">”, and click “</span> <span
    class="c5">Add</span> <span class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 221.54px;">
<img src="./images/image38.png" style="width: 384.00px; height: 221.54px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

17. <span class="c8">Make a copy of the newly created secret </span>
    <span class="c5">Value</span> <span class="c8">. </span> <span
    class="c8">We will use this information to configure Okta Workflows.
    </span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 101.91px;">
<img src="./images/image4.png" style="width: 480.00px; height: 101.91px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

18. <span class="c8">In the Search field, type </span> <span
    class="c5">owners</span> <span class="c8"> and select “</span> <span
    class="c5">Owners</span> <span class="c0">” from the pane.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 156.41px;">
<img src="./images/image61.png" style="width: 288.00px; height: 156.41px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

19. <span class="c0">And confirm that you are the app owner.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 132.18px;">
<img src="./images/image5.png" style="width: 480.00px; height: 132.18px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

20. <span class="c8">In the Search field, type </span> <span
    class="c5">overview</span> <span class="c8"> and select “</span>
    <span class="c5">Overview</span> <span class="c0">” from the
    pane.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 148.32px;">
<img src="./images/image31.png" style="width: 288.00px; height: 148.32px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

21. <span class="c0">From the overview UI, take note of the following
    fields that will be used later to configure Okta Workflows.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 480.00px; height: 195.69px;">
<img src="./images/image7.png" style="width: 480.00px; height: 195.69px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

22. <span class="c0">For the upcoming steps, take note of the following
    information:</span>

<!-- -->

1.  <span class="c8 c10">Directory (tenant) ID</span> <span class="c8">.
    Will be referred to as </span> <span class="c5">dirTenantId.</span>
2.  <span class="c8 c10">Application (client) ID</span> <span
    class="c8">. Will be referred to as </span> <span
    class="c5">azureAppClientId</span> <span class="c0">.</span>

<!-- -->

23. <span class="c8">Construct the following URLs by replacing the
    </span> <span class="c5">\<dirTenantId></span> <span
    class="c8"> placeholders</span> <span class="c8"> with the correct
    values. These will be used when we set up the Http Connection
    Setting in </span> <span class="c5 c16 c32">Okta Workflows</span>

<!-- -->

1.  <span class="c5 c19">Authorize Path: </span> <span
    class="c8 c19">https://login.microsoftonline.com/</span> <span
    class="c5 c19">\<dirTenantId></span> <span
    class="c8 c19">/oauth2/v2.0/authorize</span>
2.  <span class="c5 c19">Access Token: </span> <span
    class="c8 c19">https://login.microsoftonline.com/</span> <span
    class="c5 c19">\<dirTenantId></span> <span
    class="c8 c16 c19">/oauth2/v2.0/token</span>

### Set up Okta Workflows

1.  <span class="c0">In Okta Workflows create a new connection</span>
2.  <span class="c8">Click “</span> <span class="c5">Connections</span>
    <span class="c0">”</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 499.00px; height: 59.00px;">
<img src="./images/image54.png" style="width: 499.00px; height: 59.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

3.  <span class="c8">Click “</span> <span class="c5">+ New
    Connection</span> <span class="c0">”</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 498.00px; height: 138.00px;">
<img src="./images/image29.png" style="width: 498.00px; height: 138.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

4.  <span class="c0">From the New Connection window, select API
    Connector.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 86.00px; height: 70.00px;">
<img src="./images/image14.png" style="width: 86.00px; height: 70.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

5.  <span class="c8">Create a new Http OAuth Connection named “</span>
    <span class="c5">HttpAzureManagementOAuth</span> <span class="c8">”
    as shown below using the information we copied from previous steps,
    plus the information we copied from “</span> <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.6txs6cwo5z37" class="c12">New App Registration</a>
    </span> <span class="c0">”:</span>

<!-- -->

1.  <span class="c5">Authorize Path</span> <span class="c8"> = </span>
    <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.6txs6cwo5z37" class="c12">New App Registration</a>
    </span> <span class="c8">,</span> <span class="c0"> step
    23.a;</span>
2.  <span class="c5">Access Token</span> <span class="c8"> = </span>
    <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.6txs6cwo5z37" class="c12">New App Registration</a>
    </span> <span class="c8">, s</span> <span class="c0">tep
    23.b;</span>
3.  <span class="c5">Scope</span> <span class="c0"> =
    https://management.azure.com/user_impersonation
    offline_access;</span>

<!-- -->

1.  <span class="c0">The scope for user_impersonation is a url-format as
    shown above. The offline_access allows Okta Workflows to retrieve a
    refresh token for a flow instance if the access token has
    expired.</span>

<!-- -->

4.  <span class="c5">Client ID</span> <span class="c8"> = </span> <span
    class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.6txs6cwo5z37" class="c12">New App Registration</a>
    </span> <span class="c8">, step</span> <span class="c8"> 22.b
    (</span> <span class="c5 c10">Application (client) ID</span> <span
    class="c8 c10">)</span> <span class="c0">;</span>
5.  <span class="c5">Client Secret </span> <span class="c8">= </span>
    <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.6txs6cwo5z37" class="c12">New App Registration</a>
    </span> <span class="c8">, step</span> <span class="c8"> 17 (</span>
    <span class="c5">Value</span> <span class="c0">).</span>

<!-- -->

6.  <span class="c8">Go to the “</span> <span
    class="c5">SetLogonHours</span> <span class="c0">” flow. </span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 40.32px;">
<img src="./images/image52.png" style="width: 288.00px; height: 40.32px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

7.  <span class="c8">Click the connection name for the </span> <span
    class="c5">API Connector Post</span> <span class="c0">.</span>
8.  <span class="c8">Click “</span> <span class="c5">+New
    connection</span> <span class="c0">”</span>
9.  <span class="c8">Create a new API Connector connection, with name
    </span> <span class="c5">HttpAzureManagementNoAuth</span> <span
    class="c8"> and </span> <span class="c5">Auth Type</span> <span
    class="c8"> = </span> <span class="c5">None</span> <span
    class="c0">, and assign this to the HTTP Post.</span>
10. <span class="c8">Replace the URL of the </span> <span class="c5">API
    Connector </span> <span class="c5">Post</span> <span
    class="c8"> card</span> <span class="c8"> with the Webhook URL that
    you created earlier at </span> <span class="c18">
    <a href="#ExecuteOnPremisePowerShellwithOktaWorkflows.xhtml#h.s6e1y41tjpgr" class="c12">Configure Runbooks + Webhooks</a>
    </span> <span class="c8">, step 18</span> <span class="c0">.</span>
11. <span class="c5">Save</span> <span class="c0"> your changes</span>
12. <span class="c8">Go to flow </span> <span class="c5">\[1.1\] Get
    Azure Automation Job Status</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 37.44px;">
<img src="./images/image1.png" style="width: 288.00px; height: 37.44px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

13. <span class="c8"> Confirm that the </span> <span class="c5">API
    Connector Get</span> <span class="c8"> card is using the “</span>
    <span class="c5">HttpAzureManagementOAuth</span> <span
    class="c0">”</span>

<span class="c0"></span>

14. <span class="c8">Update the “Flow Control </span> <span
    class="c5">Assign</span> <span class="c8">” card, with variable
    </span> <span class="c5">subscriptionId</span> <span class="c8">,
    with your Azure Subscription Id (the one that you used to associate
    all of the configurations we’ve done so far). You can retrieve the
    Subscription ID, for your automation account “</span> <span
    class="c5">OktaPowershellAutomationAccount</span> <span
    class="c0">”.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px -0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 144.00px; height: 172.80px;">
<img src="./images/image68.png" style="width: 144.00px; height: 172.80px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

15. <span class="c0">Turn on all three flows</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 130.02px;">
<img src="./images/image77.png" style="width: 384.00px; height: 130.02px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

## Testing this Flow

1.  <span class="c8">The workflow is configured to execute as helper
    flow, which means that it needs to either be invoked by a parent
    flow or be manually executed. To do this, select the “</span> <span
    class="c5">SetLogonHours</span> <span class="c0">” flow.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 40.32px;">
<img src="./images/image52.png" style="width: 288.00px; height: 40.32px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

2.  <span class="c8">And click “</span> <span class="c5">\> Test</span>
    <span class="c0">”, to execute the flow.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 384.00px; height: 259.84px;">
<img src="./images/image74.png" style="width: 384.00px; height: 259.84px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

3.  <span class="c0">Provide a samAccountName from your Active
    Directory.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 150.20px;">
<img src="./images/image33.png" style="width: 288.00px; height: 150.20px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

4.  <span class="c8">And click “</span> <span class="c5">Run Test</span>
    <span class="c0">”.</span>
5.  <span class="c0">This will submit a request to Azure through our
    Webhook, which will execute our Runbook in our local Hybrid Worker
    (the agent that we installed on our Windows Server machine).</span>
6.  <span class="c8">You can track the job, by executing flow “</span>
    <span class="c5">\[1.0\] Review Azure Automation Jobs</span> <span
    class="c8">”. The flow will connect to Azure Management API and
    request a status for the job that we triggered when flow “</span>
    <span class="c5">SetLogonHours</span> <span class="c0">” was
    executed.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 38.10px;">
<img src="./images/image57.png" style="width: 288.00px; height: 38.10px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

7.  <span class="c8">Once the flow finishes, click the “</span> <span
    class="c5">Tables</span> <span class="c0">” tab</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 207.36px;">
<img src="./images/image53.png" style="width: 288.00px; height: 207.36px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

8.  <span class="c8">Select the “</span> <span class="c5">Azure
    Automation Job Tracker</span> <span class="c8">” table, and you will
    find an entry regarding the job that you just created at Azure. Wait
    a couple of minutes and re-execute flow “</span> <span
    class="c5">\[1.0\] Review Azure Automation Jobs</span> <span
    class="c8">”, and check the table again until the entry status is
    “</span> <span class="c8">Completed”</span> <span
    class="c8">.</span>
9.  <span class="c8">You can also check directly in Active Directory, by
    searching for the user that you used on step 19, and select “</span>
    <span class="c5">Account > Logon hours…</span> <span class="c0">”.
    Once the job completes the user logon hours should be similar to the
    image below.</span>

<span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 215.54px;">
<img src="./images/image39.png" style="width: 288.00px; height: 215.54px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span> <span
style="overflow: hidden; display: inline-block; margin: -0.00px 0.00px; border: 1.33px solid #268bd2; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 288.00px; height: 213.68px;">
<img src="./images/image8.png" style="width: 288.00px; height: 213.68px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);" />
</span>

<span class="c0"></span>

10. <span class="c8">The template also contains two additional flows
    “</span> <span class="c5">CleanUp.01.Search.Table.Entries</span>
    <span class="c8">” and “</span> <span
    class="c5">CleanUp.02.Delete.Row</span> <span class="c8">”, used to
    delete old entries from the workflow table. The flow “</span> <span
    class="c5">CleanUp.01.Search.Table.Entries</span> <span class="c8">”
    is executed daily and you can set the number of days from which
    entries will be deleted, by updating the “</span> <span
    class="c5">Date & Time Subtract</span> <span class="c8">”
    card.</span>

<span class="c26 c16"></span>

## Limitations and Known issues

1.  <span class="c3">Note that the screenshots in the document may
    change over time since the time of the recording. If they do,
    recognize that there may be changes, but focus on the key terms and
    proceed as best you can. </span>
2.  <span class="c3">If you are experiencing any issues during the
    Microsoft PowerShell 7 configuration, you might need to restart the
    host machine to proceed with the configuration.</span>
3.  When configuring Microsoft PowerShell 7 make sure you have enabled
    TLS 1.2, otherwise the connection with Microsoft Azure will fail.

<!-- -->

1.  The following command solved the TLS issue on Windows 2016
    environments: <span
    class="c9">\[Net.ServicePointManager\]::SecurityProtocol =
    \[Net.SecurityProtocolType\]::Tls12</span>

<!-- -->

4.  <span class="c3">The key components for enabling Workflows to
    execute on-prem Powershell are an:</span>

<!-- -->

1.  <span class="c3">Okta Workflows license</span>
2.  <span class="c3">Azure Subscription</span>
3.  <span class="c3">Azure Automations</span>

<span class="c3"></span>

<span class="c3"></span>

<span class="c3">Different usage patterns will result in different
costs, the discussion of which is beyond the scope of this document. Be
aware that using this may impact the overall cost of your Okta and Azure
tenant which are your responsibility to track. </span>

## <span class="c22 c16">Additional Resources</span>

-   <span class="c18">
    <a href="https://www.google.com/url?q=https://www.okta.com/products/lifecycle-management/&amp;sa=D&amp;source=editors&amp;ust=1624896848656000&amp;usg=AOvVaw0B6jedgitLdR3t8YJvD_t0" class="c12">https://www.okta.com/products/lifecycle-management/</a>
    </span> <span class="c0"> </span>
-   <span class="c18">
    <a href="https://www.google.com/url?q=https://www.okta.com/platform/workflows/&amp;sa=D&amp;source=editors&amp;ust=1624896848657000&amp;usg=AOvVaw2iWSLaQNjc3NqIHkZaCBTC" class="c12">https://www.okta.com/platform/workflows/</a>
    </span> <span class="c0"> </span>
-   <span class="c18">
    <a href="https://www.google.com/url?q=https://docs.microsoft.com/en-us/graph/use-the-api%23:~:text%3DMicrosoft%2520Graph%2520is%2520a%2520RESTful,to%2520Microsoft%2520Graph%2520is%2520changing&amp;sa=D&amp;source=editors&amp;ust=1624896848658000&amp;usg=AOvVaw1Ann9TIU7PoUdpDMx_0uMH" class="c12">https://docs.microsoft.com/en-us/graph/use-the-api#:~:text=Microsoft%20Graph%20is%20a%20RESTful,to%20Microsoft%20Graph%20is%20changing</a>
    </span> <span class="c0">. </span>
-   <span class="c18">
    <a href="https://www.google.com/url?q=https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view%3Dpowershell-7&amp;sa=D&amp;source=editors&amp;ust=1624896848659000&amp;usg=AOvVaw3oHSLYFkSofxx14yuxdZok" class="c12">https://docs.microsoft.com/en-us/PowerShell/scripting/install/installing-PowerShell-core-on-windows?view=PowerShell-7</a>
    </span> <span class="c0"> </span>
-   <span class="c18">
    <a href="https://www.google.com/url?q=https://docs.microsoft.com/en-us/azure/automation/automation-webhooks&amp;sa=D&amp;source=editors&amp;ust=1624896848659000&amp;usg=AOvVaw1S0q2AU0gou2tVydOy0YTh" class="c12">https://docs.microsoft.com/en-us/azure/automation/automation-webhook</a>
    </span>
