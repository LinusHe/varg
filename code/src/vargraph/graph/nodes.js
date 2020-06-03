/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for the nodes

export default {
  // getNodeID(): Returns an Array with all Node Objects of the Graph
  getNodeArr(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    let nodeArr=[];

    cy.nodes().forEach(node => {
      if (!node.hasClass("eh-handle")) {
        nodeArr.push(node);
      }
    });

    return nodeArr;
  },

  // getNodeID(): Returns an Array with all Node IDs of the Graph
  getNodeID(graphComponent) {
    var nodes = graphComponent.getNodeArr(graphComponent);
    var nodesArray = [];
    for (let i = 0; i < nodes.length; i++) {
      nodesArray.push(nodes[i].data("id"));
    }
    return nodesArray;
  },

  // getNodeName(): Returns an Array with all Node Names of the Graph
  getNodeName(graphComponent) {
    var nodes = graphComponent.getNodeArr(graphComponent);
    var nodesArray = [];
    for (let i = 0; i < nodes.length; i++) {
      nodesArray.push(nodes[i].data("name"));
    }
    return nodesArray;
  },

  // getNodeNameByID(..): Returns Noode Name from Node ID
  getNodeNameByID(graphComponent, nodeID) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    var node = cy.getElementById(nodeID);
    return node.data("name");
  },

  // getNodePositions(): returns Array with all Node Positions
  // is used in position.js Event
  getNodePositions(graphComponent) {
    let nodes = graphComponent.getNodeArr(graphComponent);
    let posArray = [];
    for (let i = 0; i < nodes.length; i++) {
      posArray.push(nodes[i].position());
    }
    return posArray;
  },

  // createNode(..): Adds a node to the Cytograph with an automatic
  //                 generated (increasing) ID + the properties given
  createNode(
    graphComponent,
    newName,
    newShort,
    newImgurl,
    newColor,
    posX,
    posY
  ) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    // get current id counter
    let count = cy.data("IDCount");

    // add element
    cy.add({
      data: {
        id: parseInt(count),
        name: newName,
        short: newShort,
        imgUrl: newImgurl,
        color: newColor
      },
      style: {
        "background-color": "#" + newColor
      },
      position: { x: posX, y: posY }
    });

    let node = cy.getElementById(count);
    console.log("added node: ", node);

    node.addClass("nodelabel");

    // update position if conflict occurs
    this.moveNodesInConflict(graphComponent, node)

    // increment id counter
    count++;
    cy.data("IDCount", count);
  },

  // updateNode(..): Updates a node by ID with the given arguments
  updateNode(graphComponent, id, newName, newShort, newImgurl, newColor) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    // get node element
    let node = cy.getElementById(id);

    console.log("updating node ...");
    console.log("before update:", node);

    // update node data
    node.data("name", newName);
    node.data("short", newShort);
    node.data("imgUrl", newImgurl);
    node.data("color", newColor);
    node.style("background-color", "#" + newColor);

    console.log("after update:", node);
  },

  // removeNode(id): Node with 'id' and all involved edges will be removed
  removeNode(graphComponent, id) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    let node = cy.getElementById(id);

    console.log("node removed: ", node);

    let edgesArray = this.getEdgesByNode(graphComponent, id);
    // removes all involved edges
    edgesArray.forEach(edge => edge.remove());

    // removes the node
    node.remove();
  }
};
