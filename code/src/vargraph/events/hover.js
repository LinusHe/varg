/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
/* eslint-disable no-console */
import cyStore from "@/vargraph/graph/cyStore";

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// In this File are methods for the graph clicking events

// Event List: https://js.cytoscape.org/#events
// more info about handling events: https://rcarcasses.github.io/vue-cytoscape/api.html#cytoscape

export default {
  mouseOutOfNode(event) {
    try {
      if (event.target.group() != "nodes") {
        cyStore.data.edgeHandler.hide();
      }
    } catch (error) {
      cyStore.data.edgeHandler.hide();
    }
  },
  mouseInNode(event) {
    // nothing to see here 👀
  }
};
