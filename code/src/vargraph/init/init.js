/* eslint-disable no-console */
import cyStore from "@/vargraph/graph/cyStore";

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

import nodeHtmlLabel from "cytoscape-node-html-label";
import klay from "cytoscape-klay";
import defaultData from "@/vargraph/init/cytoscapeDefaultData.js";

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

    console.log(cy.data("test"));

    // run init
    this.init(this);

    // register events
    this.registerEvents(this);

    // fit graph
    this.getCytoGraph(this).fit();

    // refresh header
    this.$parent.$refs["graphHeader"].refresh();

    // this.$parent.$parent.$parent.$parent.$refs["dialogs"].dialogSuccess("Neuer Graph erfolgreich angelegt")
  },

  // initialize default data
  init(graphComponent) {
    // get cytoscape instance
    console.log(graphComponent);
    console.log(graphComponent.getCytoGraph());
    let cy = graphComponent.getCytoGraph();

    // Sets maximum and minimum of zoom levels. Difference between one and two
    // is rougly one mouse wheel scroll.
    cy.minZoom(0.5);
    cy.maxZoom(2);

    // load default Settings
    cy.data(defaultData);
    console.log("Initial Graph Data: ", cy.data());

    // This is to prevent that usage of cy.minZoom(value) locks up other zoom functionality
    cy.data("minZoom", 0.5);

    // Get Name and Quant from Store.js
    let prodname = this.$store.getters.getCyProdName;
    let prodquant = this.$store.getters.getCyProdQuant;
    console.log("Prodname: ", prodname);
    console.log("Prodnquant: ", prodquant);
    cy.data("prodName", prodname);
    cy.data("prodQuant", prodquant);

    // get Data if Graph was imported
    if (cyStore.data.importedJson !== null) {
      cy.json(cyStore.data.importedJson);
    }
    // reset importedJson
    cyStore.data.importedJson = null;

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
          graphComponent,
          e.data("name"),
          e.data("short"),
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
