<template>
  <div id="cy">
    <cytoscape
      ref="cyRef"
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
      v-on:tap="leftClick"
      v-on:cxttapstart="rightClick"
      :sync="true"
    >
      <!-- <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:tap="elementClick($event, def.data.id)"
      /> -->
    </cytoscape>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import config from "@/vargraph/init/cytoscapeConfig.js";
// UN-COMMENT FOLLOWING LINE FOR EXAMPLE ELEMENTS
// import elements from "@/vargraph/init/exampleElements.js";

// import methods
import init from "@/vargraph/init/init";
import clickEvents from "@/vargraph/events/clicks";
import graph from "@/vargraph/graph/graph";
import nodes from "@/vargraph/graph/nodes";
import edges from "@/vargraph/graph/edges";
import optimizations from "@/vargraph/graph/optimizations";
import labels from "@/vargraph/graph/labels";
import saveGraph from "@/vargraph/importExport/saveGraph";
import loadGraph from "@/vargraph/importExport/loadGraph";
import zoom from "@/vargraph/graph/zoom";

// activate methods
const methods = Object.assign(
  {},
  init,
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
  data() {
    return {
      config,
      // elements
    };
  },
  methods // see -> code\src\vargraph Files
};
</script>
