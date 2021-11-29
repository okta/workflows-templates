# Capture Document Signatures in DocuSign

## Overview

Many organizations use DocuSign to control agreements – such as
Non-Disclosure Agreements (NDAs), Lease Contracts, and Terms of Service
(TOS) – that dictate which resources users can access. This template
leverages DocuSign webhooks to capture when a user signs a document.
This information can be used by Okta to populate an attribute which can
in turn be used to manage group and application access.

## Before you get Started / Prerequisites

Before you get started, you will need:

1.   Access to an Okta tenant with Okta Workflows enabled for your org.
2.   Access to a DocuSign tenant with administrative rights to create a
    DocuSign Connect integration.

Tip: You can get a DocuSign tenant for development purposes on <a href="https://www.google.com/url?q=https://developers.docusign.com&amp;sa=D&amp;source=editors&amp;ust=1635799419696000&amp;usg=AOvVaw1wDHvFFdX9kWfy9eFBMaIV" class="c7">https://developers.docusign.com</a>

## Setup Steps

Create an attribute, a group membership rule, and a group to track users
that signed a contract:

1.  Access the Okta admin dashboard
    (https://&lt;tenant&gt;-admin.okta.com/admin/dashboard)
2.  Create custom attribute:
    1.  Go to
        Directories
         &gt;
        Profile Editor
    2.  On the row
        User (default)
        , click
        Profile
    3.  Click
        Add Attribute
    4.  Create an attribute to store the document signature date. For
        example:
        1.  Type
            : String
        2.  Display Name
            : NDA signed date
        3.  Variable Name
            : ndaDate
        4.  Description
            : The date a user signed the NDA
        5.  User Permission
            : Read Only
3.  Create group:
    1.  Click
        Directories
         &gt;
        Groups
    2.  Click
        Add Group
         and then follow the instructions to create a group for users who
        signed a contract. (i.e.,
        Under NDA
        )
4.  Create a group rule:
    1.  On the Groups page, click the
        Rules
         tab
    2.  Create a rule to add users to the
        Under NDA
         group when the NDA signed date field is filled:
        1.  Name: Under NDA
        2.  IF:
            Use Okta Expression Language (advanced)  
            `String.len(user.ndaDate) > 0`
        3.  THEN:
             Assign to Under NDA
    3.  Save
         and then
        Activate
         the Rule.

### Add the DocuSign template:

1.  Click
    Workflow
     &gt;
    Workflows Console
    .
2.  Click
    Templates
3.  Open the
    Capture Document Signatures in DocuSign
    template
4.  Click
    Add template. A workflow folder named WebhookDocuSign is imported.

### Configure the Workflow:

1.  On the Workflow Console, click
    Home
2.  Click
    WebhookDocuSign
     &gt;
    DocuSign.ContractSignedWebhook
     flow
3.  Make sure a connection is selected for the
    Read User
     and
    Update User
     cards
4.  On the
    Update User
     card, click the
    Gear Icon (bottom right corner)
     &gt;
    Choose Fields
5.  On the input section, select the field you set to store the document
    signature date (i.e., NDA signed date)
6.  If not selected, drag the
    completedDateTime
     field from the
    DocuSign Webhook Listener
     and drop it under the
    Update User Card
     on the
    NDA signed date
     field
7.  Save
     the flow
8.  Click
    Home
     &gt;
    WebhookDocuSign
9.  Enable
     both the
    DocuSign.ContractSignedWebhook
     and the
    Util.AuthenticateWebhook
     flows.
10. On the
    DocuSign.ContractSignedWebhook
    , click the
    gear icon
    , then click
    API Access
    .
11. Select
    Expose as Webhook
     and record the
    invoke URL
     (You will need that to configure DocuSign)

### Configure DocuSign:

1.  Access DocuSign as Administrator.
2.  Click
    Settings
3.  Under
    Integrations
    , click
    Connect
4.  Create an encryption key (for authenticating the Webhook message):
    1.  Click
        Connect Keys.
    2.  Click
        Add Secret Key.
    3.  Record the key generated
         (you will need that to configure your workflow).
5.  Return to the Connect home page.
6.  Create a connect webhook:
    1.  Click
        Add
         
        Configuration
         &gt;
        Custom.
        
    2.  Enter the following data to configure your webhook to Okta
        workflows:
        1.  Name
            : Okta Workflows
        2.  URL to Publish
            : Paste the Invoke URL you got from Okta Workflows
        3.  Require Acknowledgement
            : check
        4.  Data Format
            : REST 2.1
        5.  Include Data
            : select Custom Fields, Documents, and Recipients
        6.  Associated Users
            : All users
        7.  Envelope Events
            : Select only Envelope Signed/Completed
        8.  Integration and Security Settings
            : Select Include HMAC Signature and Enable Mutual TLS.
    3.  Save
         and
        enable
         the connection
7.  Get a file name for the main document to sign:
    1.  If you already use DocuSign templates, click
        Template
         and select your template.
    2.  On the right-hand side, record the name of the document you use to
        collect the signature (i.e.,
        NDA\_sample.pdf
        ). You will need that to configure your workflow.

### Link DocuSign and Workflows:

1.  Return to Okta Workflows.
2.  Under the WebhookDocuSign folder, click
    Tables.
3.  Click
    DocuSign Webhook Config.
4.  Update the following fields:
    1.  HMAC Private Key:
         paste the key copied from DocuSign  
        Note:
         This private key is used by Okta workflows to validate if a webhook
        message is sent by DocuSign, providing authentication and
        non-repudiation
    2.  Document Name:
         paste the document name recorded from your template  
        
        Note: This attribute ensures Okta is mapping only the document signature
        you expect. As of now, DocuSign Connect does not provide a direct
        way in its UI to trigger a webhook only when a specific document
        template was signed. However, you can configure this in DocuSign
        using the
        <a href="https://www.google.com/url?q=https://developers.docusign.com/platform/webhooks/connect/build-listener/&amp;sa=D&amp;source=editors&amp;ust=1635799419720000&amp;usg=AOvVaw1PnJj0RN_k-m-sIFVGE7et" class="c7">Envelope-level Connect APIs</a>.

## Testing this Flow

1.  In DocuSign, send a document for a user who already exists in Okta.
2.  Sign the document in DocuSign.
3.  Back in Workflows, go to the
    DocuSign.ContractSignedWebhook
     flow and select
    Flow History
    . You should see an execution for the user.
4.  Open the user profile in Okta. Confirm that the document signed
    attribute is filled and that the user is a member of the
    User Under NDA
     group.

## Limitations and Known Issues

1.  This workflow does not support
    <a href="https://www.google.com/url?q=https://developers.docusign.com/platform/webhooks/connect/architecture/&amp;sa=D&amp;source=editors&amp;ust=1635799419725000&amp;usg=AOvVaw1oe7My9m5DsMmoM6FZOERA" class="c7">aggregated messages</a>
     from DocuSign (when DocuSign sends a single webhook call for
    multiple signature events).
2.  DocuSign may not send the webhook event immediately after a document
    is signed (DocuSign works on a queued architecture). This might
    incur delays from a document signature to an event sent to Okta.
3.  This workflow will always capture the main signer in a document (the
    main signer). You can support documents with multiple signers by
    modifying the Get Signer card in the DocuSign.ContractSignedWebhook
    flow.
4.  Any SuperAdmin with access to Workflows can access the Docusign HMAC
    private key in the Workflow config table.
