/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// In this File are methods for the graph clicking events

// Event List: https://js.cytoscape.org/#events
// more info about handling events: https://rcarcasses.github.io/vue-cytoscape/api.html#cytoscape

export default {
  // handle click on blank area
  leftClick(event) {
    console.log("left click event: ", event);
    console.log("left click target -> ", event.target);
    // if (event.target === this.$refs.cyRef.instance)
    // this.$parent.$refs.detailControls.closeMenus();

    this.$parent.$refs.detailControls.handleDetails(event.target);
  },
  // handle right click
  rightClick(event) {
    console.log("right click event: ", event);
    console.log("right click target -> ", event.target);
    // open component
    this.$parent.$refs.rightClickMenu.openMenu(window.event, event.target);
    // get click position
    var offset = document.getElementById("graph-header").clientHeight;
    var posX = event.originalEvent.x;
    var posY = event.originalEvent.y - offset;
    this.$parent.$refs.rightClickMenu.setClickPos(posX, posY);
    console.log("clicked at", posX, posY);
  }
};
