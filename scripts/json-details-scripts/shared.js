module.exports = {
  getDetailsFromFlopack: function (flopackContent) {
    const { flos, tables } = flopackContent.data;
    const details = {};

    if (flos && Object.keys(flos).length) {
      details.flows = [];
      details.flowCount = Object.keys(flos).length;
      Object.values(flos).forEach((flo) => {
        const isHelperFlow = flo.data.display.isCallable && !flo.data.scheduled;
        details.flows.push({
          id: flo.id,
          name: flo.name,
          type: isHelperFlow ? "HELPER" : "MAIN",
          screenshotURL: "https://via.placeholder.com/1000x500" // TODO: replace with the actual S3 URL
        });
        if (isHelperFlow) {
          details.helperFlowsCount ? details.helperFlowsCount++ : (details.helperFlowsCount = 1);
        } else {
          details.mainFlowsCount ? details.mainFlowsCount++ : (details.mainFlowsCount = 1);
        }
      });
    }

    if (tables && Object.keys(tables).length) {
      details.stashCount = Object.keys(tables).length;
    }

    return details;
  }
};
