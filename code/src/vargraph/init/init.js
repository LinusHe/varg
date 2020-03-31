/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

import nodeHtmlLabel from "cytoscape-node-html-label";
import klay from "cytoscape-klay";

export default {
  // this method will run before cytoscape is configured
  preConfig(cytoscape) {
    console.log("calling pre-config", cytoscape);
    nodeHtmlLabel(cytoscape);
    cytoscape.use(klay);
  },
  // this config will run after cytoscape is configured
  afterCreated(cy) {
    // cy: this is the cytoscape instance
    console.log("after created", cy);

    // run init
    this.init(this);

    // fit graph
    this.getCytoGraph(this).fit();

    // refresh header
    this.$parent.$refs["graphHeader"].refresh();

    this.$parent.$parent.$parent.$parent.$refs["dialogs"].dialogSuccess("Neuer Graph erfolgreich angelegt")
  },

  // initialize default data
  init(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.$refs["cyRef"].instance;

    // Sets maximum and minimum of zoom levels. Difference between one and two
    // is rougly one mouse wheel scroll.
    cy.minZoom(0.5);
    cy.maxZoom(2);

    // Setting up a new datafield with the given values

    // This is to prevent that usage of cy.minZoom(value) locks up other zoom functionality
    cy.data("minZoom", 0.5);

    // Get Name and Quant from Store.js
    let prodname = this.$store.getters.getCyProdName;
    let prodquant = this.$store.getters.getCyProdQuant;
    console.log(prodname);
    // Initialising data types
    cy.data("IDCount", 0);
    cy.data("latestSave", null);
    cy.data("prodName", prodname);
    cy.data("prodQuant", prodquant);

    // Apply Color for nodes
    cy.nodes().forEach(n => {
      n.style("background-color", "#" + n.data("color"));
    });

    // Generate Edge Labels
    var options = {
      edgeDimensionsIncludeLabels: true,
      "text-event": "yes"
    };

    cy.edges().forEach(e => {
      e.data(
        "label",
        this.generateEdgeLabel(
          e.data("name"),
          e.data("cost"),
          e.data("time"),
          e.data("sucost"),
          e.data("sutime")
        )
      );
      e.layoutDimensions(options);
    });

    // Generates Node HTML Label
    this.updateNodeLabel(graphComponent, cy);
  }
};
