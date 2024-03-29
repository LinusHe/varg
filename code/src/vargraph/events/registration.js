/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// In this File are methods for the graph event registration

// Event List: https://js.cytoscape.org/#events
// more info about handling events: https://rcarcasses.github.io/vue-cytoscape/api.html#cytoscape

export default {
  // registerEvents: set up all listeners
  registerEvents(graphComponent) {
    // left click
    graphComponent.getCytoGraph().on("tap", event => this.leftClick(event));
    // right click
    graphComponent.getCytoGraph().on("cxttap", event => this.rightClick(event));

    // hover leaves nodes
    graphComponent
      .getCytoGraph()
      .on("mouseout", event => this.mouseOutOfNode(event));

    graphComponent
      .getCytoGraph()
      .on("free", event => this.positionEvent(event));
  }
};
