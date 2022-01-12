/**
 * Get the 4 counts we need from the .flopack file
 * @param {object} flowpackContent: the content of the .flopack file
 * @returns {flowCount: number, mainFlowsCount: number, helperFlowsCount: number, stashCount: number}
 */
module.exports = {
  getCountsFromFlowpack: function (flowpackContent) {
    const counts = {
      flowCount: Object.keys(flowpackContent.data.flos).length,
      mainFlowsCount: 0,
      helperFlowsCount: 0,
      stashCount: Object.keys(flowpackContent.data.tables).length
    };

    Object.values(flowpackContent.data.flos).forEach((flo) => {
      if (flo.data.display.isCallable && !flo.data.scheduled) {
        counts.helperFlowsCount++;
      } else {
        counts.mainFlowsCount++;
      }
    });

    return counts;
  }
};
