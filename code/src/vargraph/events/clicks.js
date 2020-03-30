/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// In this File are methods for the graph clicking events

// give ref[cyRef] Element an v-on:"..." property to set up a new event
// Event List: https://js.cytoscape.org/#events 
// more info about handling events: https://rcarcasses.github.io/vue-cytoscape/api.html#cytoscape

export default {
  // handle click on blank area
  blankClick(event) {
    console.log(event.target, this.$refs.cyRef.instance);
    if (event.target === this.$refs.cyRef.instance)
      console.log("blank area clicked", event.target);
      this.$parent.$refs.detailControls.closeMenus()
  },
  // handle click on elements
  elementClick(id) {
    console.log("element clicked", id);
    this.$parent.$refs.detailControls.handleDetails(id.target)
  },
  // handle right click
  rightClick(event) {
    console.log("right click", event);
    // open component
    this.$parent.$refs.rightClickMenu.openMenu(window.event, event.target)
  }
};
