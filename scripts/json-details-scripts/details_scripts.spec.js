const fs = require("fs");

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
  misMatchingCounts,
  matchingFlosData
} = require("./mocks.js");
const {
  getDetailsFromFlopack,
  validateCounts,
  modifierScriptMsg,
  validateFlos,
  validFloField,
  validateUseCases,
  validateScreenshots
} = require("./utils.js");

const workflowName = "workflow_template_name";

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
      flos: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          type: "MAIN"
        }
      ],
      flowCount: 1,
      mainFlowsCount: 1
    });
  });

  test("only helper flows", () => {
    const result = getDetailsFromFlopack(flopackWithHelperFlosOnly);
    expect(result).toEqual({
      flos: [
        {
          id: "825ca604-c2ac-4e44-a5b7-34f4fd161668",
          name: "flo 1",
          type: "HELPER"
        },
        {
          id: "295257de-b4ca-485e-8f12-f93531697664",
          name: "flo 2",
          type: "HELPER"
        }
      ],
      flowCount: 2,
      helperFlowsCount: 2
    });
  });

  test("main and helper flos", () => {
    const result = getDetailsFromFlopack(flopackWithMainAndHelperFlos);
    expect(result).toEqual({
      flos: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          type: "MAIN"
        },
        {
          id: "09536e48-f66b-49dd-989c-36c371c9b1ff",
          name: "flo 2",
          type: "HELPER"
        },
        {
          id: "ef777a85-4aef-4c98-8ccd-edabbfdd9960",
          name: "flo 3",
          type: "HELPER"
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
      flos: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          type: "MAIN"
        },
        {
          id: "09536e48-f66b-49dd-989c-36c371c9b1ff",
          name: "flo 2",
          type: "HELPER"
        },
        {
          id: "ef777a85-4aef-4c98-8ccd-edabbfdd9960",
          name: "flo 3",
          type: "HELPER"
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
  it("passes if counts are matching between flopack and json", () => {
    matchingFlopackAndJSON.forEach((i) => {
      expect(() =>
        validateCounts(workflowName, i.detailsFromFlopack, i.detailsInJSON)
      ).not.toThrowError();
    });
  });

  it("throws an error if there is a zero-value for any of the counts fields", () => {
    expect(() => validateCounts(workflowName, {}, jsonWithZeroValueCount)).toThrowError(
      `The "flowCount" field at "${workflowName}/workflow.json" can't be a zero. Zero-value fields should be deleted. ${modifierScriptMsg}`
    );
  });

  it("throws an error if there is a missing field in json but present in flopack", () => {
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

  it("throws an error if there is an extra field in the json file that should not be there", () => {
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

  it("throws an error if the counts are not matching between the flopack and json files", () => {
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

describe("validateFlos", () => {
  it("passes if there are no flows in the flopack file", () => {
    expect(() => validateFlos(workflowName, {}, {})).not.toThrowError();
    expect(() => validateFlos(workflowName, { flos: [] }, {})).not.toThrowError();
  });

  it("throws an error if the details.flos field doesn't exist or of wrong type", () => {
    expect(() => validateFlos(workflowName, { flos: [{ id: "a-1" }] }, {})).toThrowError(
      `A "details.flos" field (of type array) should exist at "${workflowName}/workflow.json". ${modifierScriptMsg}`
    );

    expect(() =>
      validateFlos(workflowName, { flos: [{ id: "a-1" }] }, { flos: "wrong-type" })
    ).toThrowError(
      `A "details.flos" field (of type array) should exist at "${workflowName}/workflow.json". ${modifierScriptMsg}`
    );
  });

  it("throws an error if the flos field is an empty array", () => {
    expect(() => validateFlos(workflowName, { flos: [{ id: "a-1" }] }, { flos: [] })).toThrowError(
      `The "details.flos" field at ${workflowName}/workflow.json can't be an empty array. ${modifierScriptMsg}`
    );
  });

  it("throws an error if the flos are not matching between the flopack and json files", () => {
    expect(() =>
      validateFlos(workflowName, { flos: [{ id: "a-1" }] }, { flos: [{ id: "b-2" }] })
    ).toThrowError(
      `The flos defined at the "${workflowName}/workflow.json -> details.flos" field don't match what's inside the ".flopack" file of that template. ${modifierScriptMsg}`
    );
  });

  it("throws an error if the details.flos array is not of the correct structure", () => {
    expect(() =>
      validateFlos(workflowName, { flos: [{ id: "a-1" }] }, { flos: [{ id: "a-1" }] })
    ).toThrowError(
      `The flos defined at the "${workflowName}/workflow.json -> details.flos" field contains invalid properties. Allowed fields are: "${validFloField.join(
        ", "
      )}". ${modifierScriptMsg}`
    );
  });

  it("passes if the flos data match between the flo and json file", () => {
    expect(() =>
      validateFlos(
        workflowName,
        matchingFlosData.detailsFromFlopack,
        matchingFlosData.detailsInJSON
      )
    ).not.toThrowError();
  });
});

describe("validateUseCases", () => {
  it("passes if no useCases exist in the json file", () => {
    expect(() => validateUseCases(workflowName, null)).not.toThrowError();
  });

  it("throws an error if the useCases in json is not of type array", () => {
    expect(() => validateUseCases(workflowName, "invalid-type")).toThrowError(
      `The useCases field in "${workflowName}/workflow.json" has the wrong type. It should be an array of strings.`
    );
  });

  it("throws an error if the useCases array is empty", () => {
    expect(() => validateUseCases(workflowName, [])).toThrowError(
      `The useCases field in "${workflowName}/workflow.json" can't be an empty array. It should be an array of strings. If not needed, you can delete it`
    );
  });

  it("throws an error if the values inside the useCases array are not valid", () => {
    // valid use cases === use cases defined in the useCases.json root file
    expect(() => validateUseCases(workflowName, ["wrong-value"])).toThrowError(
      `The use cases assigned to "${workflowName}/workflow.json" are not valid. Make sure the use cases are mentioned in the "useCases.json" file.`
    );
  });

  it("throws an error if the useCases field contains elements not of type string", () => {
    expect(() =>
      validateUseCases(workflowName, [
        { title: "use case title", description: "use case description" }
      ])
    ).toThrowError(
      `The useCases field in "${workflowName}/workflow.json" contains wrong value for its elements. "useCases" should be an array of strings. Valid use cases exist in the "useCases.json" root file.`
    );
  });

  it("passes if valid use cases are provided", () => {
    const validUseCase = require("../../useCases.json").useCases[0].name;
    expect(() => validateUseCases(workflowName, [validUseCase])).not.toThrowError();
  });
});

describe.only("validateScreenshots", () => {
  it("passes if no flos exists", () => {
    expect(() => validateScreenshots(
      { ...matchingFlosData.detailsFromFlopack, flos: [] },
      { name: workflowName, details: matchingFlosData.detailsInJSON }
    )).not.toThrowError();
  });

  it("throws an error if there is no resources directory to house screenshots", () => {
    function dirNotFoundError(message) {
      this.message = message;
      this.code = 'ENOENT';
    }
    jest.spyOn(fs, "readdirSync").mockImplementation(() => {
      throw new dirNotFoundError("directory not found");
    });
    expect(() => validateScreenshots(
      matchingFlosData.detailsFromFlopack,
      { name: workflowName, details: matchingFlosData.detailsInJSON }
    )).toThrowError();
  });

  it("throws an error when the screenshots and flos inside flopack don't match", () => {
    const screenshots = ["screenshot-1.png", "screenshot-2.png"];
    jest.spyOn(fs, "readdirSync").mockReturnValue(screenshots);
    expect(() => validateScreenshots(
      {
        flos: [
          {
            id: "edcc5dad-eef8-4651-b1db-1a6a85cf161e",
            name: "flo name 1",
            type: "MAIN",
          }
        ]
      },
      {
        name: workflowName,
        details: {
          flos: [
            {
              id: "edcc5dad-eef8-4651-b1db-1a6a85cf161e",
              name: "flo name 1",
              type: "MAIN",
            }
          ]
        }
      }
    )).toThrowError();
  });

  it("throws an error when the screenshots and flos inside the json file don't match", () => {
    const screenshots = ["screenshot-1.png", "screenshot-2.png"];
    jest.spyOn(fs, "readdirSync").mockReturnValue(screenshots);
    expect(() => validateScreenshots(
      {
        flos: [
          {
            id: "edcc5dad-eef8-4651-b1db-1a6a85cf161e",
            name: "flo name 1",
            type: "MAIN",
          },
          {
            id: "883b80d8-a3ac-43cf-881b-e370efb55fc2",
            name: "flo name 2",
            type: "HELPER",
          }
        ]
      },
      {
        name: workflowName,
        details: {
          flos: [
            {
              id: "edcc5dad-eef8-4651-b1db-1a6a85cf161e",
              name: "flo name 1",
              type: "MAIN",
            }
          ]
        }
      }
    )).toThrowError();
  });

  it("throws an error if a screenshot doesn't follow the URL pattern", () => {
    jest.spyOn(fs, "readdirSync").mockReturnValue([
      "PgHDqLQ3BjridgXTKhGSO3csfE.png",
      "PlLWTpvWbaP96v54oUkKJE1bRH6JhV7jzBrutwiPr3I.png"
    ]);
    expect(() =>
      validateScreenshots(
        {
          flos: [
            {
              id: "edcc5dad-eef8-4651-b1db-1a6a85cf161e",
              name: "flo name 1",
              type: "MAIN",
            },
            {
              id: "883b80d8-a3ac-43cf-881b-e370efb55fc2",
              name: "flo name 2",
              type: "HELPER",
            }
          ]
        },
        {
          name: workflowName,
          details: {
            flos: [
              {
                id: "edcc5dad-eef8-4651-b1db-1a6a85cf161e",
                name: "flo name 1",
                type: "MAIN",
                screenshotURL: "https://d78vv2h34ll3s.cloudfront.net/static/catalog/workflows/${workflowName}/resources/3Bjg3MMU6mcJL8EB-PgHDqLQ3BjridgXTKhGSO3csfE.png"
              },
              {
                id: "883b80d8-a3ac-43cf-881b-e370efb55fc2",
                name: "flo name 2",
                type: "HELPER",
                screenshotURL: "screenshot-2"
              }
            ]
          }
        }
      )
    ).toThrowError();
  });
});
