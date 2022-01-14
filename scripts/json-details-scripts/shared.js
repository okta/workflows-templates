/**
 * Get the 4 counts we need from the .flopack file
 * @param {object} flopackContent: the content of the .flopack file
 * @returns {flowCount: number, mainFlowsCount: number, helperFlowsCount: number, stashCount: number}
 */
module.exports = {
  getCountsFromFlopack: function (flopackContent) {
    const counts = {};

    if (Object.keys(flopackContent.data.flos).length) {
      counts.flowCount = Object.keys(flopackContent.data.flos).length;
    }

    if (Object.keys(flopackContent.data.tables).length) {
      counts.stashCount = Object.keys(flopackContent.data.tables).length;
    }

    Object.values(flopackContent.data.flos).forEach((flo) => {
      if (flo.data.display.isCallable && !flo.data.scheduled) {
        counts.helperFlowsCount ? counts.helperFlowsCount++ : (counts.helperFlowsCount = 1);
      } else {
        counts.mainFlowsCount ? counts.mainFlowsCount++ : (counts.mainFlowsCount = 1);
      }
    });

    return counts;
  }
};
