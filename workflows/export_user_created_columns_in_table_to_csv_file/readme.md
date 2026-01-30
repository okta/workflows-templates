# Export user created columns in table to CSV file

## Overview

This flow provides a simple way to export all user-created columns in an Okta Workflows table into a CSV file.

## Prerequisites

1. Access to an Okta tenant with Okta Workflows enabled for your org.
2. A configured Okta Connection. To configure a connection, see Authentication.


## Setup Steps

After installing the flow, follow these step-by-step instructions to set up this flow:

1. Create the table that you want to export that contains some user-defined fields. See the 'domainLookup' sample table for an example.

2. Ensure the **Tables - Read Table** card has your desired table name. By default, the 'domainLookup' table is selected.

3. Ensure your **Tables - Export to CSV** card has a filename. This is pre-populated with 'test.csv'. 


   
## Testing this Flow

1. Open the flow and click the **Test** button at the top of the page.


2. When the flow execution is complete, go to the **Tables - Export to CSV** card's execution history section and download the output CSV file. 


3. The CSV file contains a list of all user-defined columns separated by a comma.



## Limitations & Known Issues
- Keep in mind the Okta Workflows system limits.
- Error handling isn't addressed in this template.
