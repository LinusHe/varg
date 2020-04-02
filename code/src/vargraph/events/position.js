/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// Event List: https://js.cytoscape.org/#events
// more info about handling events: https://rcarcasses.github.io/vue-cytoscape/api.html#cytoscape

// Event for new node positions

export default {
  positionEvent(event) {
    console.log("Position Event fired: ", event);
    if (event.target.group() == "nodes") {
      let node = event.target;
      this.moveNodesInConflict(this, node);
    }
  },

  // moveNodesInConflict(node): checks wether a node has conflicts with
  // the other nodes in the graph. If needed, the node will be moved
  moveNodesInConflict(graphComponent, node) {
    // get node positions
    let eventX = node.position().x;
    let eventY = node.position().y;
    // get radius from node with + some extra space
    let radius = parseInt(node.style().width.replace("px", "")) + 10;
    // increase radius if node has connected edges
    // if (this.getEdgesByNode(graphComponent, node.id()).length != 0) {
    //   radius = radius + 200;
    // }
    // Array: all other node positions
    let pos = this.getNodePositions(graphComponent);
    let otherPos = pos.filter(coord => coord != node.position());

    if (otherPos.length > 0) {
      for (let i = 0; i < otherPos.length; i++) {
        // conflict-node is on the right
        if (
          Math.abs(eventX - otherPos[i].x) < radius &&
          Math.abs(eventY - otherPos[i].y) < radius &&
          otherPos[i].x > eventX
        ) {
          console.log(
            "conflict with right node",
            Math.abs(eventX - otherPos[i].x)
          );
          // move draged single node to the left
          node.animate(
            {
              position: { x: eventX - radius, y: eventY },
              easing: "ease"
            },
            {
              duration: 200
            }
          );
        }

        // conflict node is on the left
        if (
          Math.abs(otherPos[i].x - eventX) < radius &&
          Math.abs(otherPos[i].y - eventY) < radius &&
          otherPos[i].x <= eventX
        ) {
          // move draged single node to the right
          node.animate(
            {
              position: { x: eventX + radius, y: eventY },
              easing: "ease"
            },
            {
              duration: 200
            }
          );
        }
      }
    }
  }
};
