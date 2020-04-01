<template>
  <div id="cy">
    <!-- <cytoscape
      ref="cyRef"
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
      v-on:tap="leftClick"
      v-on:cxttapstart="rightClick"
      :sync="true"
    >
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:tap="elementClick($event, def.data.id)"
      />
    </cytoscape>-->
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import style from "@/vargraph/init/cytoscapeStyle.js";
import layout from "@/vargraph/init/cytoscapeLayout.js";
import elements from "@/vargraph/init/exampleElements.js";

// import methods
import init from "@/vargraph/init/init";
import eventRegister from "@/vargraph/events/clicks";
import clickEvents from "@/vargraph/events/registration";
import graph from "@/vargraph/graph/graph";
import nodes from "@/vargraph/graph/nodes";
import edges from "@/vargraph/graph/edges";
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
  graph,
  nodes,
  edges,
  optimizations,
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

      style,
      layout: {
        name: "grid",
        // name: 'klay',
        rows: 1,
        padding: 150,
        spacingFactor: 1.2,
        grid: {
          spacing: 150,
          fixedAlignment: "BALANCED"
        },
        klay: {
          spacing: 150,
          fixedAlignment: "BALANCED"
        }
      }
    });

    // cy after config
    this.afterCreated();
  },
  methods // see -> code\src\vargraph Files
};
</script>
