const {
  flopackWithNoFlos,
  flopackWithMainFlosOnly,
  flopackWithMainAndHelperFlos,
  flopackWithTablesOnly,
  flopackWithHelperFlosOnly,
  flopackWithFlosAndTables,
  matchingFlopackAndJSON,
  jsonWithZeroValueCount,
  missingFieldInJSON,
  extraFieldsInJSON,
  misMatchingCounts
} = require("./mocks.js");
const { getDetailsFromFlopack, validateCounts, modifierScriptMsg } = require("./utils.js");

describe("getCountsFromFlopack", () => {
  test("no flos nor tables", () => {
    const result = getDetailsFromFlopack(flopackWithNoFlos);
    expect(result).toEqual({});
  });

  test("only tables, no flos", () => {
    const result = getDetailsFromFlopack(flopackWithTablesOnly);
    expect(result).toEqual({ stashCount: 2 });
  });

  test("1 main flo", () => {
    const result = getDetailsFromFlopack(flopackWithMainFlosOnly);
    expect(result).toEqual({
      flows: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          type: "MAIN",
          screenshotURL: "https://via.placeholder.com/1000x500"
        }
      ],
      flowCount: 1,
      mainFlowsCount: 1
    });
  });

  test("only helper flows", () => {
    const result = getDetailsFromFlopack(flopackWithHelperFlosOnly);
    expect(result).toEqual({
      flows: [
        {
          id: "825ca604-c2ac-4e44-a5b7-34f4fd161668",
          name: "flo 1",
          type: "HELPER",
          screenshotURL: "https://via.placeholder.com/1000x500"
        },
        {
          id: "295257de-b4ca-485e-8f12-f93531697664",
          name: "flo 2",
          type: "HELPER",
          screenshotURL: "https://via.placeholder.com/1000x500"
        }
      ],
      flowCount: 2,
      helperFlowsCount: 2
    });
  });

  test("main and helper flos", () => {
    const result = getDetailsFromFlopack(flopackWithMainAndHelperFlos);
    expect(result).toEqual({
      flows: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          type: "MAIN",
          screenshotURL: "https://via.placeholder.com/1000x500"
        },
        {
          id: "09536e48-f66b-49dd-989c-36c371c9b1ff",
          name: "flo 2",
          type: "HELPER",
          screenshotURL: "https://via.placeholder.com/1000x500"
        },
        {
          id: "ef777a85-4aef-4c98-8ccd-edabbfdd9960",
          name: "flo 3",
          type: "HELPER",
          screenshotURL: "https://via.placeholder.com/1000x500"
        }
      ],
      flowCount: 3,
      mainFlowsCount: 1,
      helperFlowsCount: 2
    });
  });

  test("flos and tables", () => {
    const result = getDetailsFromFlopack(flopackWithFlosAndTables);
    expect(result).toEqual({
      flows: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          type: "MAIN",
          screenshotURL: "https://via.placeholder.com/1000x500"
        },
        {
          id: "09536e48-f66b-49dd-989c-36c371c9b1ff",
          name: "flo 2",
          type: "HELPER",
          screenshotURL: "https://via.placeholder.com/1000x500"
        },
        {
          id: "ef777a85-4aef-4c98-8ccd-edabbfdd9960",
          name: "flo 3",
          type: "HELPER",
          screenshotURL: "https://via.placeholder.com/1000x500"
        }
      ],
      flowCount: 3,
      mainFlowsCount: 1,
      helperFlowsCount: 2,
      stashCount: 2
    });
  });
});

describe("validateCounts", () => {
  const workflowName = "workflow_template_name";
  it("passes when counts are matching between flopack and json", () => {
    matchingFlopackAndJSON.forEach((i) => {
      expect(() =>
        validateCounts(workflowName, i.detailsFromFlopack, i.detailsInJSON)
      ).not.toThrowError();
    });
  });

  it("throws an error when there is a zero-value for any of the counts fields", () => {
    expect(() => validateCounts(workflowName, {}, jsonWithZeroValueCount)).toThrowError(
      `The "flowCount" field at "${workflowName}/workflow.json" can't be a zero. Zero-value fields should be deleted. ${modifierScriptMsg}`
    );
  });

  it("throws an error when there is a missing field in json but present in flopack", () => {
    expect(() =>
      validateCounts(
        workflowName,
        missingFieldInJSON.detailsFromFlopack,
        missingFieldInJSON.detailsInJSON
      )
    ).toThrowError(
      `The "details" field at "${workflowName}/workflow.json" is missing the "stashCount" field. ${modifierScriptMsg}`
    );
  });

  it("throws an error when there is an extra field in the json file that should not be there", () => {
    expect(() =>
      validateCounts(
        workflowName,
        extraFieldsInJSON.detailsFromFlopack,
        extraFieldsInJSON.detailsInJSON
      )
    ).toThrowError(
      `The "helperFlowsCount" at "${workflowName}/workflow.json}" should not exist, it's not matching what's in the ".flopack" file. ${modifierScriptMsg}`
    );
  });

  it("throws an error when the counts are not matching between the flopack and json files", () => {
    expect(() =>
      validateCounts(
        workflowName,
        misMatchingCounts.detailsFromFlopack,
        misMatchingCounts.detailsInJSON
      )
    ).toThrowError(
      `The "details.flowCount" field at ${workflowName}/workflow.json is incorrect. ${modifierScriptMsg}`
    );
  });
});
