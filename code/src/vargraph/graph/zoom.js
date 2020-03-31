/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph zooming

export default {
  getZoom(graphComponent) {
    let cy = graphComponent.$refs["cyRef"].instance;

    return cy.zoom();
  },

  getMaxZoom(graphComponent) {
    let cy = graphComponent.$refs["cyRef"].instance;

    return cy.maxZoom();
  },

  getMinZoom(graphComponent) {
    let cy = graphComponent.$refs["cyRef"].instance;

    return cy.minZoom();
  },

  setZoom(graphComponent, ZoomLevel) {
    let cy = graphComponent.$refs["cyRef"].instance;

    cy.zoom(ZoomLevel);
    cy.center();
  },

  setMinZoom(graphComponent, ZoomLevel) {
    let cy = graphComponent.$refs["cyRef"].instance;

    cy.minZoom(ZoomLevel);
  },

  ZoomOut(graphComponent) {
    let cy = graphComponent.$refs["cyRef"].instance;

    //Zooms and centers the graph, all elements are showing
    //beause of the padding
    cy.fit(0, 150);
    //Checks if Zoomout would crack the given limit
    if (cy.zoom() > cy.data("minZoom")) {
      //Checks if User can still have free room to zoom out further
      if (
        cy.zoom() - 0.5 >
        cy.data("minZoom")
      ) {
        //Allows the user to zoom out furthr for example to more elements
        cy.minZoom(cy.zoom() - 0.5);
      }
      //if either ot these conditions fail it just sets the zoom out limit to max
      else cy.minZoom(cy.data("minZoom"));
    } else cy.minZoom(cy.data("minZoom"));
  }
};