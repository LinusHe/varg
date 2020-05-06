/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This File contains methods for the ui adjustments
export default {
  // the main ui function, called at mounted vargraph
  adjustUI() {
    this.calculateHeightOfCy(true);
  },

  // sets height of the card
  calculateHeightOfCy(visHeader) {
    let margin = 150;
    let topCardHeight = document.getElementById("graph-info").offsetHeight;
    let headerHeight = 72;
    if (visHeader) margin = margin + headerHeight;
    let full = document.getElementById("app").offsetHeight;
    let height = full - margin - headerHeight;
    let cc = document.getElementById("cy");
    cc.style.height = height + "px";
  }
};
