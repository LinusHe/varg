/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This File contains methods for the edges

export default {
  // getEdgesByNode(id): Returns all edges, where a specific node is
  //                     involved (as source or target)
  getEdgesByNode(id) {
    // get cytoscape instance
    let cy = this.$refs["cyRef"].instance;

    let edgesArray = [];
    let allEdges = cy.edges();
    allEdges.forEach(element => {
      if (element.data("source") == id || element.data("target") == id) {
        edgesArray.push(element);
      }
    });
    return edgesArray;
  },

  // createEdge(..): Adds an edge to the Cytograph with an automatic
  //                 generated (increasing) ID + the properties given
  createEdge(
    newName,
    edgeshort,
    start,
    end,
    newcost,
    newtime,
    newsucost,
    newsutime
  ) {
    // get cytoscape instance
    let cy = this.$refs["cyRef"].instance;

    // get id counter
    let count = cy.data("IDCount");

    // create label
    let newlabel = this.generateEdgeLabel(
      newName,
      newcost,
      newtime,
      newsucost,
      newsutime
    );
    cy.add({
      data: {
        id: parseInt(count),
        short: edgeshort,
        name: newName,
        source: start,
        target: end,
        cost: newcost,
        time: newtime,
        sucost: newsucost,
        sutime: newsutime,
        label: newlabel
      }
    });
  },

  // createEdgeWithID(..): DO NOT USE THIS FUNCTION BY DEFAULT!
  //                       It's just for re-creating edges in "updateEdge(..)"
  //                       Use the normal createEdge(..) function with increasing IDs
  createEdgeWithID(
    id,
    newName,
    edgeshort,
    start,
    end,
    newcost,
    newtime,
    newsucost,
    newsutime,
    edgeLabel
  ) {
    // get cytoscape instance
    let cy = this.$refs["cyRef"].instance;

    // get id counter
    let originalCount = cy.data("IDCount");

    // replace counter with own id
    cy.data("IDCount", id);
    this.createEdge(
      newName,
      edgeshort,
      start,
      end,
      newcost,
      newtime,
      newsucost,
      newsutime,
      edgeLabel
    );

    // reset counter to original count
    cy.data("IDCount", originalCount);
  },

  // updateEdge(..): Updates an Edge by ID with the given arguments
  updateEdge(
    id,
    newName,
    newShort,
    newSource,
    newTarget,
    newCost,
    newTime,
    newsucost,
    newsutime
  ) {
    // get cytoscape instance
    let cy = this.$refs["cyRef"].instance;

    // get edge by id
    let edge = cy.getElementById(id);

    // generate new label
    let label = this.generateEdgeLabel(
      newName,
      newCost,
      newTime,
      newsucost,
      newsutime
    );

    // Generate New Edge, if source or target are changing
    if (edge.data("source") != newSource || edge.data("target") != newTarget) {
      edge.remove();
      this.createEdgeWithID(
        id,
        newName,
        newShort,
        newSource,
        newTarget,
        newCost,
        newTime,
        newsucost,
        newsutime,
        label
      );
    }

    // update edge data
    edge.data("name", newName);
    edge.data("short", newShort);
    edge.data("source", newSource);
    edge.data("target", newTarget);
    edge.data("cost", newCost);
    edge.data("time", newTime);
    edge.data("sucost", newsucost);
    edge.data("sutime", newsutime);
    edge.data("label", label);
  },

  // removeEdge(id): Edge with 'id' will be removed from Graph
  removeEdge(id) {
    // get cytoscape instance
    let cy = this.$refs["cyRef"].instance;

    // get edge element
    let edge = cy.getElementById(id);

    edge.remove();
  }
};
