/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This File contains methods for the GridSnapping
// More details: https://www.npmjs.com/package/cytoscape-grid-guide

export default {
  setGridSnap(graphComponent) {
    let cy = graphComponent.getCytoGraph();
    var ggoptions = {};

    console.log("gridSnap data", cy.data("gridSnap"))

    if (cy.data("gridSnap") === true) {
      console.log("gridSnap activated");
      ggoptions = {
        gridSpacing: 100, // Distance between the lines of the grid.
        snapToGridDuringDrag: true,
        snapToGridOnRelease: true
      };
    } else {
      ggoptions = {
        gridSpacing: 100, // Distance between the lines of the grid.
        snapToGridDuringDrag: false,
        snapToGridOnRelease: false
      };
    }

    cy.gridGuide(ggoptions);
  }
};
