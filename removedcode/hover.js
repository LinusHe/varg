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
    let handlerBounds =
      cyStore.data.edgeHandler.handleNode[0]._private.bodyBounds;
    if (
      (event.target.group() == "nodes" &&
        !event.target.hasClass("eh-handle") &&
        (event.position.x < handlerBounds.x1 - 20 ||
          event.position.y > handlerBounds.y2 ||
          event.position.y < handlerBounds.y1)) ||
      event.target.hasClass("eh-handle")
    ) {
      cyStore.data.edgeHandler.hide();
    }
    console.log(cyStore.data.edgeHandler);
  },
  mouseInNode(event) {
    let handlerBounds =
      cyStore.data.edgeHandler.handleNode[0]._private.bodyBounds;
    if (
      (event.target.group() == "nodes" &&
        !event.target.hasClass("eh-handle") &&
        (event.position.x < handlerBounds.x1 - 20 ||
          event.position.y > handlerBounds.y2 ||
          event.position.y < handlerBounds.y1)) ||
      event.target.hasClass("eh-handle")
    ) {
      cyStore.data.edgeHandler.hide();
    }
    cyStore.data.edgeHandler.enable();
  }
};
