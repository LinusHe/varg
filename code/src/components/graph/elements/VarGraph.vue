<template>
  <div class="darkmode-ign" id="cy"></div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import TestDatabase from "@/vargraph/TestDatabase.js";

import style from "@/vargraph/init/cytoscapeStyle.js";
import elements from "@/vargraph/init/exampleElements.js";

// import methods
import init from "@/vargraph/init/init";
import eventRegister from "@/vargraph/events/registration";
import clickEvents from "@/vargraph/events/clicks";
import hoverEvents from "@/vargraph/events/hover";
import positionEvents from "@/vargraph/events/position";
import graph from "@/vargraph/graph/graph";
import nodes from "@/vargraph/graph/nodes";
import edges from "@/vargraph/graph/edges";
import edgeHandle from "@/vargraph/graph/edgeHandle";
import settings from "@/vargraph/graph/settings";
import optimizations from "@/vargraph/graph/optimizations";
import labels from "@/vargraph/graph/labels";
import saveGraph from "@/vargraph/importExport/saveGraph";
import loadGraph from "@/vargraph/importExport/loadGraph";
import zoom from "@/vargraph/graph/zoom";
import ui from "@/vargraph/graph/ui";

// import cytoscape
import cytoscape from "cytoscape";
import cyStore from "@/vargraph/graph/cyStore";

let cy;
let dialogComponent;

// activate methods
const methods = Object.assign(
  {},
  init,
  eventRegister,
  clickEvents,
  hoverEvents,
  positionEvents,
  graph,
  nodes,
  edges,
  edgeHandle,
  optimizations,
  settings,
  labels,
  saveGraph,
  loadGraph,
  zoom,
  ui
);

export default {
  name: "VarGraph",
  created() {
    this.vars = {
      // initializes new instance of TestDatabase when Toolbar is loaded for the first time
      testDatabase: new TestDatabase()
    };
  },
  mounted: function() {
    // ui adjustments
    this.adjustUI();

    // cy pre config
    this.preConfig(cytoscape);
    this.adjustUI();
    // cy config
    cyStore.data.cy = cytoscape({
      container: document.getElementById("cy"), // container to render in

      // uncomment following line for example graph
      // elements,

      style
    });

    // cy after config
    this.afterCreated(cyStore.data.cy);
  },
  methods // see -> code\src\vargraph Files
};
</script>
