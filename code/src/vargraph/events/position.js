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

  // moveNodesInConflict(node): checks whether a node has conflicts with
  // the other nodes in the graph. If needed, the node will be moved
  moveNodesInConflict(graphComponent, node) {
    // get node positions
    let eventX = node.position().x;
    let eventY = node.position().y;
    // get all nodes
    let nodes = graphComponent.getCytoGraph(graphComponent).nodes();
    // nodes that are different to moved node
    let otherNodes = nodes.filter(n => n !== node);

    // get radius from node with + some extra space
    let radius = parseInt(node.style().width.replace("px", "")) + 10;


    if (otherNodes.length > 0) {
      for (let i = 0; i < otherNodes.length; i++) {
        let otherX = otherNodes[i].position().x;
        let otherY = otherNodes[i].position().y;

        // increase radius if moving node and conflict node have a common edge
        if (this.edgeBetweenNodes(node, otherNodes[i])) {
          radius = radius + 250;
        

        // conflict-node is on the right
        if (
          Math.abs(eventX - otherX) < radius &&
          Math.abs(eventY - otherY) < radius &&
          otherX > eventX
        ) {
          console.log(
            "conflict with right node",
            Math.abs(eventX - otherX)
          );
          // move dragged single node to the left
          node.animate(
            {
              position: {x: otherX - radius, y: eventY},
              easing: "ease"
            },
            {
              duration: 200
            }
          );
        }
        // conflict node is on the left
        else if (
          Math.abs(otherX - eventX) < radius &&
          Math.abs(otherY - eventY) < radius &&
          otherX <= eventX
        ) {
          // move dragged single node to the right
          node.animate(
            {
              position: {x: otherX + radius, y: eventY},
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
  }
};
