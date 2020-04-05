<template>
  <div id="cy"></div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import style from "@/vargraph/init/cytoscapeStyle.js";
import elements from "@/vargraph/init/exampleElements.js";

// import methods
import init from "@/vargraph/init/init";
import eventRegister from "@/vargraph/events/registration";
import clickEvents from "@/vargraph/events/clicks";
import positionEvents from "@/vargraph/events/position";
import graph from "@/vargraph/graph/graph";
import nodes from "@/vargraph/graph/nodes";
import edges from "@/vargraph/graph/edges";
import settings from "@/vargraph/graph/settings";
import optimizations from "@/vargraph/graph/optimizations";
import labels from "@/vargraph/graph/labels";
import saveGraph from "@/vargraph/importExport/saveGraph";
import loadGraph from "@/vargraph/importExport/loadGraph";
import zoom from "@/vargraph/graph/zoom";

// import cytoscape
import cytoscape from "cytoscape";
import cyStore from "@/vargraph/graph/cyStore";

let cy;

// activate methods
const methods = Object.assign(
  {},
  init,
  eventRegister,
  clickEvents,
  positionEvents,
  graph,
  nodes,
  edges,
  optimizations,
  settings,
  labels,
  saveGraph,
  loadGraph,
  zoom
);

export default {
  name: "VarGraph",
  mounted: function() {
    // cy pre config
    this.preConfig(cytoscape);

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
