#!/bin/bash

echo "branch name ${TRAVIS_BRANCH} and build is $TRAVIS_BUILD_DIR"

# read PR checked out files
pr_files="$(git diff --name-only ${TRAVIS_BRANCH}...HEAD --)"
echo "Files in PR ${pr_files}"
base_dir=$TRAVIS_BUILD_DIR
echo "base dir is ${base_dir}"
echo "PR files are ${pr_files}"

#store number of workflow directories
directories=()
const_workflow="workflows"
const_workflow_json="workflow.json"
const_workflow_flopack="workflow.flopack"
const_read_me="readme.md"
const_supported_connectors="supported_connectors.json"

array_contains () { 
    local array="$1[@]"
    local seeking=$2
    local in=1
    for element in "${!array}"; do
        if [[ $element == "$seeking" ]]; then
            in=0
            break
        fi
    done
    return $in
}

print_dir () {
    for element in "${directories[@]}"
    do
        echo "directory pushed is $element"
    done
}

# reading all directory name from PR
get_all_dirs () {
    regex='(.*)/(.*)/(.*)'
    # echo "reading argument $output"
    IFS=' ' read -r -a array <<< $pr_files
    for element in $output
    do
        [[ "$element" =~ $regex ]]
        if [[ ${BASH_REMATCH[1]} == "workflows" ]]; then
            dir_name=${BASH_REMATCH[2]}
            array_contains directories ${dir_name}
            if [[ $? == 1 ]]; then 
                directories+=(${dir_name})
            fi
        fi
    done
}

exit_script () {
    echo "Failed"
    exit 1
}

# validate if json is valid for workflow.json and workflow.flopack file
validate_json () {
    if [ $(jq empty > /dev/null 2>&1 ${1}; echo $?) -ne 0 ]; then
            echo "${1} JSON is invalid"
            exit_script
    fi
}

# validate if all file exists for a workflow
validate_file_exists () {
    if [ ! -f ${base_dir}/${1} ]; then
            echo "File ${1} not found!"
            exit_script
    fi
}

# verify if workflow.json file has valid read me file URL
validate_http_links () {
    for dest_link in $(jq -r '.links[] | .destination' $1/${const_workflow_json}); do
        if [[ $dest_link == *"github"*  &&  $dest_link != *"$1/${const_read_me}"* ]]; then
            echo "Readme path in $1/${const_workflow_json} is incorrect!"
            exit_script
        fi
    done
}

# check if workflow name and directory has same name. Verify if workflow length is less than 50 char limit
validate_workflow_name () {
    workflow_json_path="${1}"
    workflow_name=$(jq -r '.name' ${workflow_json_path})
    # echo "checking ${workflow_name} in dir ${dir}, length is ${#workflow_name}"
    if [ ${workflow_name} != ${dir} ]; then
        echo "Workflow name ${workflow_name} on file path ${workflow_json_path} is not matching with directory name ${dir}."
        exit_script
    fi

    if [ ${#workflow_name} -gt 50 ]; then
        echo "Workflow name ${workflow_name} on file path ${workflow_json_path} is greater than 50 characters."
        exit_script
    fi
}

# verify if connectors in workflow.json has all supported connectors mentioned in supported_connectors.json
validate_connectors () {
    workflow_json_path=${1}
    supported_connectors=$(jq -r '.names' ${const_supported_connectors})
    for connector in $(jq '.connectors | .[]' ${workflow_json_path}); do
        is_connector_supported=$(jq ".names | contains(["$connector"])" ${const_supported_connectors})
        if [ "$is_connector_supported" == false ]; then
            echo "Connector "${connector}" is invalid. Supported connectors are ${supported_connectors}"
            exit_script
        fi
    done
}

validate_workflow_files () {
    for dir in "${directories[@]}"
    do
        workflow_json_path="${const_workflow}/${dir}/${const_workflow_json}"
        workflow_flopack_path="${const_workflow}/${dir}/${const_workflow_flopack}"
        workflow_flopack_readme_path="${const_workflow}/${dir}/${const_read_me}"
        workflow_dir_path="${const_workflow}/${dir}"
        validate_file_exists ${workflow_json_path}
        validate_file_exists ${workflow_flopack_path}
        validate_file_exists ${workflow_flopack_readme_path}
        validate_json ${workflow_json_path}
        validate_json ${workflow_flopack_path}
        validate_http_links ${workflow_dir_path}
        validate_workflow_name ${workflow_json_path}
        validate_connectors ${workflow_json_path}
    done
}

get_all_dirs ${output}
validate_workflow_files
echo "Success"

