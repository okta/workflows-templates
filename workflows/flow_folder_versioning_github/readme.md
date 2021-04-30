# Versioning for Flows and Folders


## Overview

Versioning for Flows and Folders will allow a workflow builder to back-up their flows on an on-demand or automated basis to an external system like Github or Google Drive. In order to enable this, we’ve created new functions to Export either a Flow or Folder and have enhanced our Github connector to allow a builder to make commits and open pull requests. We’ve also shipped a set of Templates that can be easily imported into your environment that walks you through exactly how to version both flows and folders. 

## Prerequisites

Before you get started, here are the things you’ll need:



*   Access to an Okta tenant with Okta Workflows enabled for your org 
*   Access to a Github tenant
*   A Github repository where you have the permissions to either make a Commit or Open a Pull Request 

## Setup Steps

These setup instructions will walk you through how to set up one of the two flows provided with this template - “Export Flow and Make Commit to Github”. If you’d like to go further, you can also reference the “Export Flow and Open PR in Github” which will walk you through creating a new branch and opening a pull request (vs. making a commit directly to a given Github repository branch). 

After downloading the “Versioning for Flows and Folders” template into your environment, open the “Export Flow and Make Commit to Github” flow. 



1. On the “Export Flow” card and select a flow in your environment that you’d like to export. Exporting the flow will output a JSON file that represents all the elements of that flow. 
2. Within Step 2, select the name of the file you are exporting. By default it is “exportedFlow.flow”. Make sure that the file extension is .flow (only change the characters before the extension). 
3. Edit the comment you’d like to make as part of the commit history so that other users in this repository understand why you made the commit. 
4. As part of the “Update File Content” card setup your Github connection. 
    1. Establish your connection and follow the OAuth prompts to authorize Workflows to access this Github repository on behalf of you. 
    2. Select the Organization, Repository, and Branch you’d like to test this feature with. If you haven’t already, we recommend creating a test Repository and Branch that you can test with. 
        1. Make sure you have the appropriate privileges by going to the repository -> Settings -> Manage Access. 
    3. Make sure that Message (the commit comment), File Content (the exported JSON file), and Path (the folder path + the file name) are all populated. 
        1. For Path, if you’d like to create or update a File within a folder or sub-folder, you’ll need to define the path in addition to the file name, such as “MainFolder/SubFolder1/exportedFlow.flow”. This string will serve as the value to the Path input. 
    4. If the file does not already exist, this workflow will receive an error and then try to create a new file. 
        1. Click “If Error” within the Try/If Error block and establish a connection to the same repository as above. 
        2. Make sure Message, File Content, and Path have the correct inputs.  

## Testing this Flow



1. Click Test Flow
2. Go to Github, select the File you’ve either been updating or creating. Select History, and you should see the history of commits. The last commit should be made by Okta Workflows with the Commit Comment that you previously created. 

## Limitations & Known Issues



*   This flow only demonstrates how to Export a Flow. You can simply swap the “Export Flow” function card for “Export Folder” and export a collection of flows within a folder instead of a single flow. 
