/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This File contains methods for the edges

export default {
  // getEdgesByNode(id): Returns all edges, where a specific node is
  //                     involved (as source or target)
  getEdgesByNode(graphComponent, id) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    let edgesArray = [];
    let allEdges = cy.edges();
    allEdges.forEach(element => {
      if (element.data("source") == id || element.data("target") == id) {
        edgesArray.push(element);
      }
    });
    return edgesArray;
  },

  // getEdgesName(): Returns an Array with all edges Names of the Graph
  getEdgeName(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    var edges = cy.edges();
    var edgesArray = [];
    for (let i = 0; i < edges.length; i++) {
      edgesArray.push(edges[i].data("name"));
    }
    return edgesArray;
  },

  // createEdge(..): Adds an edge to the Cytograph with an automatic
  //                 generated (increasing) ID + the properties given
  createEdge(
    graphComponent,
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
    let cy = graphComponent.getCytoGraph();

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

    console.log("added edge: ", cy.getElementById(count));

    

    // move end-node position if conflict occurs
    let endNode = cy.getElementById(end);
    this.moveNodesInConflict(graphComponent, endNode)

    // increment id counter
    count++;
    cy.data("IDCount", count);
  },

  // createEdgeWithID(..): DO NOT USE THIS FUNCTION BY DEFAULT!
  //                       It's just for re-creating edges in "updateEdge(..)"
  //                       Use the normal createEdge(..) function with increasing IDs
  createEdgeWithID(
    graphComponent,
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
    let cy = graphComponent.getCytoGraph();

    // get id counter
    let originalCount = cy.data("IDCount");

    // replace counter with own id
    cy.data("IDCount", id);
    this.createEdge(
      graphComponent,
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
    graphComponent,
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
    let cy = graphComponent.getCytoGraph();

    // get edge by id
    let edge = cy.getElementById(id);

    console.log("updating edge...");
    console.log("before update: ", edge);

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
        graphComponent,
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

    console.log("after update: ", edge);
  },

  // removeEdge(id): Edge with 'id' will be removed from Graph
  removeEdge(graphComponent, id) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    // get edge element
    let edge = cy.getElementById(id);

    console.log("edge removed: ", edge);

    edge.remove();
  }
};
