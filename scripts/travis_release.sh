#!/bin/bash

const_workflow="workflows"
const_workflow_json="workflow.json"
const_workflow_flopack="workflow.flopack"
const_read_me="readme.md"
const_supported_connectors="connectors.json"

# save workflow directories in glorbal variable
directories=()
if [ -z "$1" ]
    then
        # running travis-ci config
        branch_name=$TRAVIS_BRANCH
        base_dir=$TRAVIS_BUILD_DIR
        pr_files="$(git diff --name-only ${branch_name}...HEAD --)"
    else
        # running local config
        branch_name=$1
        base_dir=$PWD
        pr_files="$(git diff --name-only ${branch_name}..master --)"
fi
# get only pull request files from branch.
echo "base dir is ${base_dir}"
echo "PR files are ${pr_files} \n"
echo "branch name ${branch_name} and build is ${base_dir}"

# utility to lookup if element exists in an array 
array_contains () { 
    local array=$1
    local seeking=$2
    local in=1
    for element in ${array}; do
        if [[ $element == "$seeking" ]]; then
            in=0
            break
        fi
    done
    return $in
}

# reading all Directory names from PR. 
extract_workflow_dirs_from_pr () {
    local regex='(.*)/(.*)/(.*)'
    IFS=' ' read -r -a array <<< $pr_files
    for element in $pr_files
    do
        [[ "$element" =~ $regex ]]
        if [[ ${BASH_REMATCH[1]} == "workflows" ]]; then
            dir_name=${BASH_REMATCH[2]}
            array_contains "${directories}" "${dir_name}"
            if [[ $? == 1 ]]; then 
                directories+=(${dir_name})
            fi
        fi
    done
}

# validate directory naming convention
validate_dir_name_convention () {
    local dir_regex="^[a-z0-9_]{2,50}$"
    local dir_name=$1
    if ! [[ $dir_name =~ ${dir_regex} ]]; then
        echo "INVALID directory name. It should match regex pattern ${dir_regex}."
        fail_and_exit
    fi
}

# validate if json is valid for files workflow.json and workflow.flopack
validate_json () {
    if [ $(jq empty > /dev/null 2>&1 ${1}; echo $?) -ne 0 ]; then
        echo "${1} JSON is INVALID."
        fail_and_exit
    fi
}

# validate if all files exists for a workflow
validate_file_exists () {
    local dir=${1}
    local file_name=${2}
    find_file=$(find ${dir} -type f -name ${file_name} | wc -l)
    if [[ find_file -eq 0 ]]; then
        echo "File ${dir}/${file_name} not found. This file is needed while adding workflow template."
        fail_and_exit
    fi
}

# verify if workflow.json file has valid read me file URL
validate_http_links () {
    for dest_link in $(jq -r '.links[] | .destination' $1/${const_workflow_json}); do
        if [[ $dest_link == *"github"*  &&  $dest_link == *"${const_read_me}"* && $dest_link != *"$1/${const_read_me}"* ]]; then
            echo "Readme path in $1/${const_workflow_json} is INCORRECT for link ${dest_link}."
            fail_and_exit
        fi
    done
}

# check if workflow name and directory has same name. Verify if workflow length is less than 50 char limit
validate_workflow_name () {
    local workflow_json_path="${1}"
    local workflow_name=$(jq -r '.name' ${workflow_json_path})
    if [ ${workflow_name} != ${dir} ]; then
        echo "Workflow name ${workflow_name} on file path ${workflow_json_path} is NOT matching with directory name ${dir}."
        fail_and_exit
    fi

    if [ ${#workflow_name} -gt 50 ]; then
        echo "Workflow name ${workflow_name} on file path ${workflow_json_path} is greater than 50 characters. It SHOULD be less than 50 characters"
        fail_and_exit
    fi
}

# verify checks for connectors
validate_connectors () {
    local workflow_json_path=${1}
    local workflow_flopack_path=${2}
    local supported_connectors=$(jq -r '.names' ${const_supported_connectors})
    local workflow_json_connectors=$(jq '.connectors | .[]' ${workflow_json_path})
    local workflow_json_connectors_length=$(jq '.connectors | length' ${workflow_json_path})

    # verify if connector exists in workflow.json
    if [[ workflow_json_connectors_length -eq 0 ]]; then
        echo "WARNING: Connector information in file ${workflow_json_path} is missing."
    fi
    
    # verify if connectors in workflow.json is a supported connector
    for connector in ${workflow_json_connectors}; do
        is_connector_supported=$(jq ".names | contains([$connector])" ${const_supported_connectors})
        if [ "$is_connector_supported" == false ]; then
            echo "Connector "${connector}" is INVALID. Supported connectors are ${supported_connectors}."
            fail_and_exit
        fi
    done
}

# perform validation for all files
validate_workflow_files () {
    for dir in "${directories[@]}"
    do
        local workflow_json_path="${const_workflow}/${dir}/${const_workflow_json}"
        local workflow_flopack_path="${const_workflow}/${dir}/${const_workflow_flopack}"
        local workflow_flopack_readme_path="${const_workflow}/${dir}/${const_read_me}"
        local workflow_dir_path="${const_workflow}/${dir}"
        
        validate_dir_name_convention ${dir}
        validate_file_exists "${workflow_dir_path}" "${const_workflow_json}"
        validate_file_exists "${workflow_dir_path}" "${const_workflow_flopack}"
        validate_file_exists "${workflow_dir_path}" "${const_read_me}"
        validate_json ${workflow_json_path}
        validate_json ${workflow_flopack_path}
        validate_http_links ${workflow_dir_path}
        validate_workflow_name ${workflow_json_path}
        validate_connectors "${workflow_json_path}" "${workflow_flopack_path}"
    done
}

fail_and_exit () {
    echo "FAILED"
    exit 1
}

# main
extract_workflow_dirs_from_pr
validate_workflow_files
echo "Success"
