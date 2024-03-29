/* eslint-disable standard/computed-property-even-spacing */
/* eslint-disable no-console */
import cyStore from "@/vargraph/graph/cyStore";

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

import nodeHtmlLabel from "../plugins/cytoscape-node-html-label";
import klay from "cytoscape-klay";
import defaultData from "@/vargraph/init/cytoscapeDefaultData.js";
import edgehandles from "cytoscape-edgehandles";
import gridGuide from "cytoscape-grid-guide";

export default {
  // this method will run before cytoscape is configured
  preConfig(cytoscape) {
    console.log("calling pre-config", cytoscape);
    nodeHtmlLabel(cytoscape);
    gridGuide( cytoscape );
    cytoscape.use(klay);
    cytoscape.use(edgehandles);
  },
  // this config will run after cytoscape is configured
  afterCreated(cy) {
    // cy: this is the cytoscape instance
    console.log(cy.data("test"));

    // run init
    this.init(this);

    // register events
    this.registerEvents(this);

    // fit graph
    this.getCytoGraph(this).fit();

    // refresh header
    this.$parent.$parent.$refs["graphInfo"].refresh();

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
    graphComponent.getNodeArr(graphComponent).forEach(n => {
      n.style("background-color", "#" + n.data("color"));
      n.addClass("nodelabel");
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
          e.data("sutime"),
          e.data("lotsize")
        )
      );
      e.layoutDimensions(options);
    });

    // Generates Node HTML Label
    this.updateNodeLabel(graphComponent, cy);

    // sets edgeHandle Default Valuse
    let handler = cy.edgehandles(this.getEdgeHandleDefaults());
    cyStore.data.edgeHandler = handler;

    // set gridSnapping
    this.setGridSnap(graphComponent);
    console.log(this.methods)
  },

  getDialogComponent(graphComponent) {
    return graphComponent.$parent.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
  }
};
