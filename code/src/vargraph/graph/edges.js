/* eslint-disable no-unexpected-multiline */
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

  // edgeBetweenNodes(node1, node2): returns whether an edge exists between two nodes
  edgeBetweenNodes(node1, node2) {
    for (let i = 0; i < node1.connectedEdges().length; i++) {
      let edgeSid = node1
        .connectedEdges()
        [i].source()
        .id();
      let edgeTid = node1
        .connectedEdges()
        [i].target()
        .id();
      let node2id = node2.id();

      // check if edge has node2 as source or target
      if (edgeSid === node2id || edgeTid === node2id) {
        console.log("Edge between nodes");
        return true;
      }
    }
    return false;
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
      graphComponent,
      newName,
      edgeshort,
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
    this.moveNodesInConflict(graphComponent, endNode);

    // increment id counter
    count++;
    cy.data("IDCount", count);

    // remove optimization
    this.removeOptimization();
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

  // createQuickEdge(..): creates an Edge, just with the start and end information
  createQuickEdge(graphComponent, startNode, endNode) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();
    // get id counter
    let edgeID = cy.data("IDCount");

    let edgeName = this.generateQuickEdgeName(
      graphComponent,
      startNode,
      endNode
    );
    let edgeShort = this.generateQuickEdgeShort(
      graphComponent,
      startNode,
      endNode
    );

    this.createEdge(
      graphComponent,
      edgeName,
      edgeShort,
      startNode,
      endNode,
      null,
      null,
      null,
      null
    );

    // get created edge and add dotted class
    let edge = cy.getElementById(edgeID);
    edge.addClass("quick-edge");
  },

  // generateQuickEdgeName(..):  generates Edge Name just with the startNode and endNode ID
  //                             example: A -> B | 1
  generateQuickEdgeName(graphComponent, startNode, endNode) {
    // get node names
    let startName = this.getNodeNameByID(graphComponent, startNode);
    let endName = this.getNodeNameByID(graphComponent, endNode);
    let number =
      this.numberOfEdgesBetween(graphComponent, startNode, endNode) + 1;

    // generate label
    let nameString =
      startName.charAt(0).toUpperCase() +
      " - " +
      endName.charAt(0).toUpperCase() +
      " | " +
      number;

    return nameString;
  },

  // generateQuickEdgeShort(..): generates Edge Short just with the startNode and endNode ID
  //                             example: AB1
  generateQuickEdgeShort(graphComponent, startNode, endNode) {
    // get node names
    let startName = this.getNodeNameByID(graphComponent, startNode);
    let endName = this.getNodeNameByID(graphComponent, endNode);
    let number =
      this.numberOfEdgesBetween(graphComponent, startNode, endNode) + 1;

    // generate label
    let shortString =
      startName.charAt(0).toUpperCase() +
      endName.charAt(0).toUpperCase() +
      number;
    return shortString;
  },

  // numberOfEdgesBetween(..): returns number of edges between two nodes
  numberOfEdgesBetween(graphComponent, startNode, endNode) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();
    // get edge by id
    let node1 = cy.getElementById(startNode);
    let node2 = cy.getElementById(endNode);
    let count = 0;
    for (let i = 0; i < node1.connectedEdges().length; i++) {
      let edgeSid = node1
        .connectedEdges()
        [i].source()
        .id();
      let edgeTid = node1
        .connectedEdges()
        [i].target()
        .id();
      let node2id = node2.id();

      // check if edge has node2 as source or target
      if (edgeSid === node2id || edgeTid === node2id) {
        console.log("Edge between nodes");
        count++;
      }
    }
    return count;
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
      graphComponent,
      newName,
      newShort,
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

    // remove quick-edge class
    if (edge.hasClass("quick-edge")) edge.removeClass("quick-edge");

    // remove optimization
    this.removeOptimization();

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

    // remove optimization
    this.removeOptimization();
  },

  hasQuickEdges(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    var edges = cy.edges();
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].hasClass("quick-edge")) return true;
    }
    return false;
  }
};
