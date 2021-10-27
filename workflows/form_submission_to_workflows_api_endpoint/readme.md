# <span class="c23">Submit form data to the Okta Workflows API endpoint</span>

<span class="c0"></span>

## <span class="c15">Overview</span>

<span class="c0">A number of cloud platform services allow IT administrators and developers to configure forms that can perform a POST operation to a URL endpoint. The data that is sent by the operation to the Okta Workflows API endpoint can be used to onboard or offboard employees, add or remove users from Okta groups, or take action using any configured Workflows connector. This template demonstrates how these tasks can be completed using Postman, Google Forms, and Microsoft Forms.</span>

## <span class="c15">Prerequisites</span>

1.  <span class="c0">Access to an Okta tenant with Okta Workflows
    enabled</span>
2.  A configured Okta Connection. To configure a connection, see [Authentication](https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-reference/okta/overviews/authorization.htm).
3.  <span class="c0">Access to Google Forms and Google App
    Script.</span>
4.  Access to Microsoft Forms and Microsoft Power Automate.

## <span class="c15">Setup</span>

### <span class="c5 c10">Postman</span>

<span class="c0">Using Postman, you can emulate a form submission to your
Workflows API Endpoint. In order to import the Postman collection
included in the template, open your Postman application and select
**File** > **Import** and select the Postman collection JSON file.</span>

<span class="c0"></span>

<span class="c0">Enter the Workflows API Endpoint URL from the “Postman
API Endpoint” Workflow. To get this URL, click the
**&lt;/&gt;** icon and copy the **Invoke URL** value in the API Endpoint
Settings.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 186.92px; height: 405.00px;">![](images/image4.png)</span>

<span class="c0"></span>

<span class="c0">Once you have the Workflows API endpoint URL, you can
copy and paste the URL into Postman and enter in the keypair values
that will be both sent to the Workflows API endpoint URL and used to create
an Okta user.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 394.67px;">![](images/image5.png)</span>

<span class="c0"></span>

### <span class="c10 c5">Google Form</span>

Create a Google Form (<span
class="c13"><a href="https://www.google.com/url?q=https://forms.google.com&amp;sa=D&amp;source=editors&amp;ust=1634840532128000&amp;usg=AOvVaw03C2t-5M-6Iza6eYJ3ASOg" class="c18">https://forms.google.com</a></span><span
class="c0">) with the same fields that are used in the Postman
Collection (First Name, Last Name, and so forth).</span>

<span class="c0"></span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 139.44px; height: 414.00px;">![](images/image8.png)</span>

<span class="c0"></span>

<span class="c0">Once your Google Form has been created, click on the
ellipses in the upper right corner in your Form editor and select Script
Editor. Within the Google’s Apps Script, fill the name of your Google
Apps Script project at the top. Next, under **Files**, select the `Code.gs`
file. Within this file, you will enter in some basic javascript code that
will gather all of the questions and answers of your form and submit
those values as a payload to your Google Form API Endpoint Workflow
URL.</span>

<span class="c0"></span>

Use this code with the Script Editor:  

<span class="c4">// replace the URL below with the API endpoint in the
Google Form API Endpoint Workflow; this is the only change that is
needed in this code snippet.</span>

<span class="c7">var</span><span class="c2"> </span><span
class="c12">POST\_URL</span><span class="c2"> = </span><span
class="c11">"https://acme.workflows.oktapreview.com/api/flo/abc123/invoke?clientToken=abc123"</span><span
class="c2">;</span>

<span class="c2 c5"></span>

<span class="c7">function</span><span class="c2"> </span><span
class="c3">onSubmit</span><span class="c2">(</span><span
class="c3">e</span><span class="c2 c5">) {</span>

<span class="c2">    </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">form</span><span class="c2"> =
</span><span class="c12">FormApp</span><span class="c2">.</span><span
class="c3">getActiveForm</span><span class="c2 c5">();</span>

<span class="c2">    </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">allResponses</span><span
class="c2"> = </span><span class="c3">form</span><span
class="c2">.</span><span class="c3">getResponses</span><span
class="c2 c5">();</span>

<span class="c2">    </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">latestResponse</span><span
class="c2"> = </span><span class="c3">allResponses</span><span
class="c2">\[</span><span class="c3">allResponses</span><span
class="c2">.</span><span class="c3">length</span><span class="c2"> -
</span><span class="c20">1</span><span class="c2 c5">\];</span>

<span class="c2">    </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">response</span><span class="c2"> =
</span><span class="c3">latestResponse</span><span
class="c2">.</span><span class="c3">getItemResponses</span><span
class="c2 c5">();</span>

<span class="c2">    </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">payload</span><span class="c2 c5"> =
{};</span>

<span class="c2">    </span><span class="c4">// The For Loop expression
below will generate a JSON object with all of the Questions and Answers
in your form.</span>

<span class="c2">    </span><span class="c7">for</span><span
class="c2"> (</span><span class="c7">var</span><span
class="c2"> </span><span class="c3">i</span><span class="c2"> =
</span><span class="c20">0</span><span class="c2">; </span><span
class="c3">i</span><span class="c2"> &lt; </span><span
class="c3">response</span><span class="c2">.</span><span
class="c3">length</span><span class="c2">; </span><span
class="c3">i</span><span class="c2 c5">++) {</span>

<span class="c2">        </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">question</span><span class="c2"> =
</span><span class="c3">response</span><span class="c2">\[</span><span
class="c3">i</span><span class="c2">\].</span><span
class="c3">getItem</span><span class="c2">().</span><span
class="c3">getTitle</span><span class="c2 c5">();</span>

<span class="c2">        </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">answer</span><span class="c2"> =
</span><span class="c3">response</span><span class="c2">\[</span><span
class="c3">i</span><span class="c2">\].</span><span
class="c3">getResponse</span><span class="c2 c5">();</span>

<span class="c2">        </span><span class="c3">payload</span><span
class="c2">\[</span><span class="c3">question</span><span class="c2">\]
= </span><span class="c3">answer</span><span class="c2 c5">;</span>

<span class="c2 c5">    }</span>

<span class="c2 c5">  </span>

<span class="c2">    </span><span class="c7">var</span><span
class="c2"> </span><span class="c3">options</span><span class="c2 c5"> =
{</span>

<span class="c2">        </span><span class="c11">"method"</span><span
class="c2">: </span><span class="c11">"post"</span><span
class="c2 c5">,</span>

<span class="c2">        </span><span
class="c11">"contentType"</span><span class="c2">: </span><span
class="c11">"application/json"</span><span class="c2 c5">,</span>

<span class="c2">        </span><span class="c11">"payload"</span><span
class="c2">: </span><span class="c12">JSON</span><span
class="c2">.</span><span class="c3">stringify</span><span
class="c2">(</span><span class="c3">payload</span><span
class="c2 c5">)</span>

<span class="c2 c5">    };</span>

<span class="c2 c5"></span>

<span class="c4">// The method below will post the questions and answers
payload to the URL specified above.</span>

<span class="c12">UrlFetchApp</span><span class="c2">.</span><span
class="c3">fetch</span><span class="c2">(</span><span
class="c12">POST\_URL</span><span class="c2">, </span><span
class="c3">options</span><span class="c2 c5">);</span>

<span class="c2 c5">};</span>

<span class="c2 c5"></span>

------------------------------------------------------------------------

<span class="c2 c5"></span>

<span class="c1">Once you have entered the code block into your `Code.gs`
file, click on the side bar and select **Triggers**.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 206.14px; height: 258.75px;">![](images/image1.png)</span>

<span class="c1">Click on **Add Trigger** and select the values seen in the
screenshot below. This will allow our Apps Script to run whenever the form is submitted.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 501.82px; height: 480.00px;">![](images/image10.png)</span>

<span class="c0">That is all the configuration that you need to do
within App Scripts to send the Google Form payload to our Workflows API
endpoint.</span>

<span class="c0"></span>

<span class="c0">To ensure the App Script works when the Google Form is
submitted, fill out your form and navigate to the Google Form API
Endpoint Workflow. Ensure your Workflow is enabled before you submit the
Google Form. Once you submit the Google Form, you should see an entry
in your Flow History.</span>

<span class="c0"></span>

### <span class="c10 c5">Microsoft Forms</span>

Create a Microsoft Form (<span
class="c13"><a href="https://www.google.com/url?q=https://forms.office.com&amp;sa=D&amp;source=editors&amp;ust=1634840532133000&amp;usg=AOvVaw0QSChD0GZLuT4mONdxbt7t" class="c18">https://forms.office.com</a></span><span
class="c0">) with the same fields that are used in the Postman
Collection (First Name, Last Name, and so forth).</span>

<span class="c0"></span>

In order to send the contents of our Microsoft Form upon submission, we
are going to need to use Microsoft’s Power Automate application (<span
class="c13"><a href="https://www.google.com/url?q=https://us.flow.microsoft.com&amp;sa=D&amp;source=editors&amp;ust=1634840532133000&amp;usg=AOvVaw1ugHpq5VklvDOztqPqMGW_" class="c18">https://us.flow.microsoft.com</a></span><span
class="c0">).</span>

<span class="c0"></span>

<span class="c0">Within the Power Automate application, choose to create
a new Automated cloud flow and give your flow a name. Your flow’s
trigger will be when a new response is submitted.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 266.00px; height: 41.00px;">![](images/image7.png)</span>

<span class="c0"></span>

1. <span class="c0">Choose the Microsoft Form you just
created.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 608.00px; height: 110.00px;">![](images/image6.png)</span>

<span class="c0"></span>

2. <span class="c0">Select the Get response details
action. Select the Form Id that you chose in the previous step and
select Response Id as the Response Id.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 596.00px; height: 142.00px;">![](images/image2.png)</span>

<span class="c0"></span>

3. <span class="c0">Select the Initialize variable
action. Name your variable and choose Object for Type. In the value
input field, we will be constructing our JSON object to send to our
Workflows API endpoint URL. You can define the key value as you see fit
but for the pair value, you will need to select from the Dynamic content
list.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 601.13px; height: 458.00px;">![](images/image3.png)</span>

<span class="c0"></span>

4. <span class="c0">Select the HTTP action. Choose POST
as the method. In the URI input, enter the API endpoint from the Google
Form API Endpoint Workflow. In the **Body** input, select the variable you
created in the previous step which should be shown in the Dynamic
Content menu under the Variables list.</span>

<span
style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 465.76px; height: 340.50px;">![](images/image9.png)</span>

<span class="c0"></span>

5. <span class="c0">Click **Save** and then click **Test** and
try out your form. If the Microsoft Form submission is successful, you
should see an entry in your Google Form API Endpoint Workflow’s Flow
History.</span>

## <span class="c15">Limitations & Known Issues</span>

-   <span class="c0">The screenshots in this readme file may
    change over time. If they do,
    recognize that there may be changes, but focus on the key terms and
    proceed as best you can. </span>
-   Keep in mind the Okta Workflows [System Limits](https://help.okta.com/wf/en-us/Content/Topics/Workflows/workflows-system-limits.htm).
-   <span class="c0">Error handling is not addressed in this template.
    </span>
