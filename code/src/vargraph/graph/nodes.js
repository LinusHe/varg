/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for the nodes

export default {
  // getNodeID(): Returns an Array with all Node Objects of the Graph
  getNodeArr(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.$refs["cyRef"].instance;

    return cy.nodes();
  },

  // getNodeID(): Returns an Array with all Node IDs of the Graph
  getNodeID(graphComponent) {
    // get cytoscape instance
    // console.log(this)
    let cy = graphComponent.$refs["cyRef"].instance;


    var nodes = cy.nodes();
    var nodesArray = [];
    for (let i = 0; i < nodes.length; i++) {
      nodesArray.push(nodes[i].data("id"));
    }
    return nodesArray;
  },

  // getNodeName(): Returns an Array with all Node Names of the Graph
  getNodeName(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.$refs["cyRef"].instance;

    var nodes = cy.nodes();
    var nodesArray = [];
    for (let i = 0; i < nodes.length; i++) {
      nodesArray.push(nodes[i].data("name"));
    }
    return nodesArray;
  },

  // createNode(..): Adds a node to the Cytograph with an automatic
  //                 generated (increasing) ID + the properties given
  createNode(graphComponent, newName, newShort, newImgurl, newColor) {
    // get cytoscape instance
    let cy = graphComponent.$refs["cyRef"].instance;

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
      position: { x: 500, y: 300 }
    });

    // increment id counter
    count++;
    cy.data("IDCount", count);
  },

  // updateNode(..): Updates a node by ID with the given arguments
  updateNode(graphComponent, id, newName, newShort, newImgurl, newColor) {
    // get cytoscape instance
    let cy = graphComponent.$refs["cyRef"].instance;

    // get node element
    let node = cy.getElementById(id);

    // update node data
    node.data("name", newName);
    node.data("short", newShort);
    node.data("imgUrl", newImgurl);
    node.data("color", newColor);
    node.style("background-color", "#" + newColor);
  },

  // removeNode(id): Node with 'id' and all involved edges will be removed
  removeNode(graphComponent, id) {
    // get cytoscape instance
    let cy = graphComponent.$refs["cyRef"].instance;

    let node = cy.getElementById(id);
    let edgesArray = this.getEdgesByNode(graphComponent, id);
    // removes all involved edges
    edgesArray.forEach(edge => edge.remove());
    // removes the node
    node.remove();
  }
};