# Notify a user when their profile is updated

### <span style="text-decoration:underline;">Overview</span>
A user profile may be updated for many reasons, including a scheduled change by HR, a change to personal information performed by the user themselves, or some type of automated change. But how can you always be sure that the data in the user profile is accurate and was updated legitimately by the user or an authorized admin? This Flow allows you to send a message (for example, through email or Slack) to notify the user that their profile was updated, and they can be prompted to review and confirm those changes.

### <span style="text-decoration:underline;">Before you get Started / Prerequisites</span>
Before you get started, you will need:

*   Access to an Okta tenant with Okta Workflows enabled for your org
*   Active users 
*   Access to a notification service, to notify the user of profile changes [Slack/Office 365 mail, Gmail, etc]


### <span style="text-decoration:underline;">Setup Steps</span>

1. Open the flow "Send notification to user when profile is updated"
1. Look at the "List - Construct" card, update this with the attributes you would like to monitor and notify the user if they have changed
1. In the "Branching - If/Else" card, there are two "Text - Compose" cards. You will want to update the contents of the message that is sent to the user based on the user updating their profile and if something else updated the users’ profile
1. Near the end of the flow, there is a "Text - Compose" card, update the message that you would like to send your user
1. At the end of the flow is a "Slack - Send Message to Channel" card, you will want to replace this, either to a direct message in Slack to the user, or using another service, such as sending the user an email with Office 365 or Gmail
1. Turn the flow ON.


### <span style="text-decoration:underline;">Testing this Flow</span>

1. Go to the flow and make sure flow history is enabled
1. Click "Test"
1. Minimum details that need to be entered: "Changed attributes", "Actor" & "Okta User". 
    1. Actor & Okta User need to be a JSON Object with "ID" & "Alternate ID" to be used to send notifcation - an example:
        ```
        {
            "ID": "an id",
            "Alternate ID": "user@domain.com"
        }
        ```
1. Click the Flow History and make sure everything succeeded.


### <span style="text-decoration:underline;">Limitations & Known Issues</span>


*   You need to have a notification service connected to be able to notify the user
*   This example will notify the user if either they or somebody else changes their profile (it is possible to make this a switchable feature, so the user is only notified if they change their profile)
*   If the user updates their own profile through a third party application (outside of Okta), like updating their profile in Okta via API's, and the third party app is using a SWSS API key, then the updater will be shown as somebody else. On the other hand, if the third party application uses OAuth for Okta API's, then it should show the user updated their profile instead
