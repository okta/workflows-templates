const {
  flopackWithNoFlos,
  flopackWithMainFlosOnly,
  flopackWithMainAndHelperFlos,
  flopackWithTablesOnly,
  flopackWithHelperFlosOnly,
  flopackWithFlosAndTables
} = require("./mocks.js");
const { getDetailsFromFlopack } = require("./shared.js");

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
