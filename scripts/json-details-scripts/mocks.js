module.exports = {
  flopackWithNoFlos: {
    data: {}
  },

  flopackWithTablesOnly: {
    data: {
      tables: ["whatever", "structure-doesn't-matter-here"]
    }
  },

  flopackWithMainFlosOnly: {
    data: {
      flos: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          data: {
            display: {
              isCallable: false
            },
            scheduled: false
          }
        }
      ]
    }
  },

  flopackWithHelperFlosOnly: {
    data: {
      flos: [
        {
          id: "825ca604-c2ac-4e44-a5b7-34f4fd161668",
          name: "flo 1",
          data: {
            display: {
              isCallable: true
            },
            scheduled: false
          }
        },
        {
          id: "295257de-b4ca-485e-8f12-f93531697664",
          name: "flo 2",
          data: {
            display: {
              isCallable: true
            },
            scheduled: false
          }
        }
      ]
    }
  },

  flopackWithMainAndHelperFlos: {
    data: {
      flos: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          data: {
            display: {
              isCallable: false
            },
            scheduled: true
          }
        },
        {
          id: "09536e48-f66b-49dd-989c-36c371c9b1ff",
          name: "flo 2",
          data: {
            display: {
              isCallable: true
            },
            scheduled: false
          }
        },
        {
          id: "ef777a85-4aef-4c98-8ccd-edabbfdd9960",
          name: "flo 3",
          data: {
            display: {
              isCallable: true
            },
            scheduled: false
          }
        }
      ]
    }
  },

  flopackWithFlosAndTables: {
    data: {
      flos: [
        {
          id: "0787a0a1-f2a0-4939-99ba-a07e2273be47",
          name: "flo 1",
          data: {
            display: {
              isCallable: false
            },
            scheduled: true
          }
        },
        {
          id: "09536e48-f66b-49dd-989c-36c371c9b1ff",
          name: "flo 2",
          data: {
            display: {
              isCallable: true
            },
            scheduled: false
          }
        },
        {
          id: "ef777a85-4aef-4c98-8ccd-edabbfdd9960",
          name: "flo 3",
          data: {
            display: {
              isCallable: true
            },
            scheduled: false
          }
        }
      ],
      tables: ["whatever", "structure-doesn't-matter-here"]
    }
  },

  matchingFlopackAndJSON: [
    {
      detailsFromFlopack: {
        flowCount: 10,
        mainFlowsCount: 2,
        helperFlowsCount: 8,
        stashCount: 1
      },
      detailsInJSON: {
        flowCount: 10,
        mainFlowsCount: 2,
        helperFlowsCount: 8,
        stashCount: 1
      }
    },
    {
      detailsFromFlopack: {
        flowCount: 1,
        mainFlowsCount: 1
      },
      detailsInJSON: {
        flowCount: 1,
        mainFlowsCount: 1
      }
    }
  ],

  jsonWithZeroValueCount: { flowCount: 0 },

  missingFieldInJSON: {
    detailsFromFlopack: {
      flowCount: 10,
      mainFlowsCount: 2,
      helperFlowsCount: 8,
      stashCount: 1
    },
    detailsInJSON: {
      flowCount: 10,
      mainFlowsCount: 2,
      helperFlowsCount: 8
    }
  },

  extraFieldsInJSON: {
    detailsFromFlopack: {
      flowCount: 1,
      mainFlowsCount: 1
    },
    detailsInJSON: {
      flowCount: 1,
      mainFlowsCount: 1,
      helperFlowsCount: 1
    }
  },

  misMatchingCounts: {
    detailsFromFlopack: {
      flowCount: 2,
      mainFlowsCount: 1,
      helperFlowsCount: 1
    },
    detailsInJSON: {
      flowCount: 3,
      mainFlowsCount: 1,
      helperFlowsCount: 1
    }
  }
};
