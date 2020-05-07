/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This File contains methods for the ui adjustments
export default {
  // the main ui function, called at mounted vargraph
  adjustUI() {
    this.calculateHeightOfCy(this);
    var _this = this;
    window.addEventListener(
      "resize",
      function() {
        _this.calculateHeightOfCy(_this)
      },
      true
    );
  },

  // sets height of the card
  calculateHeightOfCy(graphComponent) {
    let visHeader = graphComponent.$parent.$parent.getHeader();
    let margin = 130;
    let topCardHeight = document.getElementById("graph-info").offsetHeight;
    let headerHeight = 72;
    if (visHeader) margin = margin + headerHeight;
    let full = document.getElementById("app").offsetHeight;
    let height = full - margin - topCardHeight;
    let cc = document.getElementById("cy");
    cc.style.height = height + "px";
  }
};
