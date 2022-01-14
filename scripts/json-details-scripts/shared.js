/**
 * Get the 4 counts we need from the .flopack file
 * @param {object} flopackContent: the content of the .flopack file
 * @returns {flowCount: number, mainFlowsCount: number, helperFlowsCount: number, stashCount: number}
 */
module.exports = {
  getCountsFromFlopack: function (flopackContent) {
    const { flos, tables } = flopackContent.data;
    const counts = {};

    if (flos && Object.keys(flos).length) {
      counts.flowCount = Object.keys(flos).length;
      Object.values(flos).forEach((flo) => {
        if (flo.data.display.isCallable && !flo.data.scheduled) {
          counts.helperFlowsCount ? counts.helperFlowsCount++ : (counts.helperFlowsCount = 1);
        } else {
          counts.mainFlowsCount ? counts.mainFlowsCount++ : (counts.mainFlowsCount = 1);
        }
      });
    }

    if (tables && Object.keys(tables).length) {
      counts.stashCount = Object.keys(tables).length;
    }

    return counts;
  }
};
