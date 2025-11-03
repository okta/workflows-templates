# DateTime Format Converter

## Overview

This template provides a reusable helper flow designed to convert a given DateTime object (typically provided as a string in a common parsable format, or as a numeric timestamp) into several standard DateTime formats:
- UTC (Z Time) (`YYYY-MM-DDTHH:mm:ss.sssZ`)
- ISO 8601 (`YYYY-MM-DDTHH:mm:ss.sssZ` or `YYYY-MM-DDTHH:mm:ss+00:00`)
- Epoch/Unix Timestamp (seconds since 1970-01-01T00:00:00Z)
- LDAP/Windows NT Time (100-nanosecond intervals since 1601-01-01T00:00:00Z) 

The parent flow acts as a test harness or an example of how to call the actual **dateTimeConverter [h]** helper flow that contains the conversion logic. 

## Prerequisites

Before you get started, ensure that you have:

1. Access to an Okta tenant with Okta Workflows enabled for your org. 

## Setup Steps

To use the conversion functionality in your own Okta Workflows, follow these steps.

 1. Add the **Call Flow** card in your existing parent flow (or a new one you're building). In the **Flow** field of this card, select the **dateTimeConverter [h]** helper flow. 

2. Provide the **Input DateTime Value** in the **dateTimeConverter [h]** helper flow. 
    - This input field is designed to receive the date/time value you want to convert. Map your source date/time data to this input field. For example, if you have an ISO 8601 date string in a variable called `myISODate`, drag `myISODate` to the helper flow's designated input field.

3. Use the conversion outputs. 
    - Once the **Call Flow** card executes, it returns an object, or individual output fields, from the **dateTimeConverter [h]** helper flow. These include the converted values. Map these outputs to subsequent cards in your flow as needed. Typical output fields are:
        - `outputUTC (Z Time)`  
        - `outputISO8601` 
        - `outputEpoch` 
        - `outputUnix` 
        - `outputLDAP`

## Testing this Flow

1. Run the parent flow.
2. Check that the values returned by the **dateTimeConverter [h]** helper flow (outputs) show the input date converted into the correct target formats.

## Limitations & Known Issues
- * Keep in mind the [Okta Workflows System Limits](https://help.okta.com/en/prod/Content/Topics/Workflows/workflows-system-limits.htm).
- Error handling isn't addressed in this template.