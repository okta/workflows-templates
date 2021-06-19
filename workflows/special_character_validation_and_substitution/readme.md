# Special Character Validation and Substitution

## <u>Overview</u>

When using a user’s name to generate technical fields such as
samAccountName and email addresses, often the data will contain
characters that are invalid in the specified data field (for example, a space
in an email address). This workflow identifies some of the most common
special characters and provides substitutions. The validated or
repaired name is then placed in a user profile attribute in Okta to
allow for preservation of the original name for display purposes, and
utilization of the updated name for technical purposes.

<u>Before you get Started / Prerequisites</u>

Before you get started, here are the things you’ll need:

-   Access to an Okta tenant with Okta Workflows enabled/configured for your org
-   A user with special characters to be replaced
-   A read-write Okta sourced attribute called ValidatedName

<u>Setup Steps</u>

### Workflow 1 – Special Character Replacement

This workflow can be used to replace or remove unwanted characters in data or writing the new data to a specified user profile attribute in
Okta. This workflow will be used in conjunction with a second workflow that performs special character validation to identify then replace or remove unwanted
characters for use in technical fields such as email address and AD samAccountName.

1.  From a folder in Workflows, click **New Flow**.

2.  Click **Add Event**:

    1.  In the Okta Apps section, click **Child Flow**.

    2.  In the **Inputs to this Flow** field, type `input`. This is case sensitive.

3.  Add a function card to your flow:

    1.  Click **Add function**.

    2.  Type `replace patterns` in the search field, then click the **Replace Patterns** option.

    3.  Drag the input field from the Child Flow card to the **look in** field of the **Replace Patterns** function card.

    4.  Leave the **replace with** field empty.

    5.  Make sure the `True` option is selected from the drop-downs for the **all instances** and **case sensitive** fields.

    6.  In the **patterns** section, click **Click or drop here to create** to create an input field.

        1.  Enter `~`.

    7.  In the **patterns** section, click **Click or drop here to create** again to create an additional field. Name the field `input2` (or input3 and so on).

    8.  Create additional input fields with inputs for each as follows:  

        1.  `’`

        2.  `\s` (spaces are a reserved character)

        3.  `_` (underscore)

        4.  `_` (hyphen)

        5.  `\.` (periods are a reserved character)

This function card will replace a tilde, apostrophe, a white space character (blank or tab), underscore, dash, or a period in the field with
nothing. This is especially useful if trying to create an email address and the name contains spaces.

4.  Add another function card:

    1.  Click **Add function**.

    2.  Type `replace patterns` in the search field, then click the **Replace Patterns** option.

    3.  Drag the output field (result text) from the first Replace Patterns card and place it in the **look in** field of the other **Replace Patterns** card.

    4.  In the **replace with** field, enter `a`.

    5.  Make sure the `True` option is selected from the drop-downs for the **all instances** and **case sensitive** fields.

    6.  In the **patterns** section, click **Click or drop here to create** to create an input field.

        1.  Enter `â`.

    7.  In the **patterns** section, click **Click or drop here to create** again to create an additional field. Name the field `input2` (or input3 and so on).
 
    8.  Create additional input fields with inputs for each as follows: 

        1.  `å`

        2.  `á`

        3.  `ą`

        4.  `ã`

        5.  `à`

5.  Add another function card:

    1.  Click **Add function**.

    2.  Type `replace patterns` in the search field, then click the **Replace Patterns** option.

    3.  Drag the output field (result text) from the most recent Replace Patterns card and place it in the **look in** field of the next **Replace Patterns** card.

    4.  In the **replace with** field, enter `A`.

    5.  Make sure the `True` option is selected from the drop-downs for the **all instances** and **case sensitive** fields.

    6.  In the **patterns** section, click **Click or drop here to create** to create an input field.

        1.  Enter `Â`.

    7.  In the **patterns** section, click **Click or drop here to create** again to create an additional field. Name the field `input2` (or input3 and so on).
    
    8.  Create additional input fields with inputs for each as follows: 

        1.  `Å`

        2.  `Á`

        3.  `Ą`

        4.  `Ã`

        5.  `À`

Repeat this process for every special character you want to replace, noting that Replace Patterns cards are configured to be case sensitive
(as the primary use case is for names).

After you have added all the desired Replace Patterns cards, create a return card.

6.  Add another function card:

    1.  Type `return` in the search field, then click the **Return** option.

    2.  Drag the **result text** output field from the last Replace Patterns card and drop it in the input field.

    3.  To change the label on the input field box to `remediated`, click the attribute customization menu for the field.

        <img src="media/image1.png" style="width:2.84375in;height:4.625in" />
 
    4. Click **Customzie**.
 
    5. In the **Display Name** field, enter `remediated`.

   
<!-- -->

7.  Click **Save** and name the flow `Special Character Remediation`.

8.  Click the check box to save all data that passes through the flow.

9.  Turn the flow on.

### Workflow 2 – Special Character Validation

This workflow can be used to identify characters in data which are potentially problematic in technical fields such as email addresses and
AD samAccountName. This workflow will be used in conjunction with a second workflow, special character replacement to identify and replace
or remove unwanted characters in data, writing the new data to a specified user profile attribute in Okta.

1.  From a folder in Workflows, click **New Flow**.

2.  Click **Add Event**:

    1.  In the **My Connected Apps** section, click **Okta**.

    2.  Select the **User Created** option.

3.  Click **Add app action**:

    1.  Click **Okta**.

    2.  Select the **Read User** option.

    3.  Make sure **First name** is selected as an output field.

    4.  Drag the **Okta User - ID** output field from the User Create event card to the **ID or Login** input field of the Read User action card.

4.  Add a function card to your flow:

    1.  Type `find pattern` in the search field, then click the **Find Pattern** option.

    2.  Drag the **First name** output field from Read User action card to the **look in** input field of the Find Pattern function card.

    3.  In **look For** input field, enter `[A-Za-z0-9\]`. Make sure to include the brackets.
        
        This is a regular expression that looks for exceptions to the characters listed below. Any character not matching one of these criteria will return a position number that we will use to execute the special character replacement workflow. The acceptable characters are:

         - Any capital letter A through Z

         - Any lowercase letter a through z

         - Any number 0-9

5.  Add a function card to your flow:

    1.  Type `if/else` in the search field, then click the **If/Else** option.

    2.  Drag the **position** output field from the Find Pattern function card to the **value a** input field of the If/else card.

    3.  Make sure the **comparison** drop-down field is set to `equal to`.

    4.  In the **value b** input field, enter `-1`.

    5.  Click **Save**.

6.  Create outputs:
    1.  On the If/Else card, click **Create outputs**.

    2.  Click the field and enter `ValidatedName`.

7.  In the **Run when TRUE** box,click **+** and select the Function icon.

    1.  Type `assign` in the search field, then click the **Assign** option.

        1.  Drag the **First name** output field from Read User action card to the input field.

        2.  Change the Display Name attribute for the output field to `unchanged`.

        3.  Drag the **unchanged** field from output box of the Assign card to the **Drag true output here** field of the **Outputs** section of the If/Else function card.

8.  In **Run when FALSE** box, click **+** and select the Function icon.

    1.  Type `call flow` in the search field, then click the **Call Flow** option.

    2.  Click **Choose Flow**, and in the **Select Flow** dialog, select the **Special Character Removal** flow.

    3.  Drag the **First name** field from the Read User action card to the input field on the Call Flow function card.

    4.  In the output field for the Call Flow function card, enter `remediated`.

    5.  Drag the **remediated** output field of the Call Flow card to the **Drag false output here** field of the **Outputs** section of the If/Else function card.

3.  Click **Add app action**:

    1.  Click **Okta**.

    2.  Select the **Update User** option.

    3.  In the options section, select **Partial** from the **Update Semantics** drop-down.

    4.  Click **Save**.

    5.  On the Update User action card, deselect all fields except Unselect everything except **User - ID** and **Profile - ValidatedName**.

    6.  Drag the **Okta User - ID** output field from the User Created event card to the **User - ID** input field of the Update User card.

10. Click **Save** and name the flow **Special Character Validation**.

11. Click the check box to save all data that passes through the flow.

12. Turn the flow on.


### Testing this Flow

Take these steps to properly test the flow.

1.  Create an Okta user with the following values:

    1.  For first name, use `Wile-E`.

    2.  For last name, use `Coyote`.

    3.  Use any value for the email or user name.

2.  Open the flow named Special Character Validation and click the **Flow History** tab.

3.  Go to your Okta tenant and view the informatino for the user **Wile-E**. In the profile, you should see the **ValidatedName** attribute populated with `WileE`. Note the dash has been removed.

### Limitations & Known Issues

Many characters have special meaning in regular expressions, such as ., +, \*, \\ and more. To search for any of those characters, you need to
place a \\ before the character. For example:

   - `\\.` - finds a period

   - `\\s` - finds white space (blank or tab)
