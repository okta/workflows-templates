/**
 * Get the 4 counts we need from the .flopack file
 * @param {object} flopackContent: the content of the .flopack file
 * @returns {flowCount: number, mainFlowsCount: number, helperFlowsCount: number, stashCount: number}
 */
module.exports = {
  getCountsFromFlopack: function (flopackContent) {
    const counts = {
      flowCount: Object.keys(flopackContent.data.flos).length,
      mainFlowsCount: 0,
      helperFlowsCount: 0,
      stashCount: Object.keys(flopackContent.data.tables).length
    };

    Object.values(flopackContent.data.flos).forEach((flo) => {
      if (flo.data.display.isCallable && !flo.data.scheduled) {
        counts.helperFlowsCount++;
      } else {
        counts.mainFlowsCount++;
      }
    });

    return counts;
  }
};
