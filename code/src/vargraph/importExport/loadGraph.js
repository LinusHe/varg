/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains graph-loading methods

export default {
  //  Load(graph): Intended is a function which allows the current
  //               graph that is displayed in the container to be overwritten
  //               by another graph (which would probably be saved in the database).
  //               This would allow the user to switch between different graphs without
  //               losing progress.
  //               Currently Load(graph) gets the "content" object of
  //               SaveMe() and then reconstructs the graph using that object by adding every element
  //               (nodes first, edges second) and defining every data value by referencing the graph that is written
  //               in the database.
  Load(graphComponent, graph) {
    alert("load start");
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    cy.elements("node").remove();
    cy.elements("edge").remove();
    for (let i = 0; i < graph.nodes.length; i++) {
      let node = graph.nodes[i];
      cy.add({
        data: {
          id: node.data("id"),
          name: node.data("name")
        },
        position: { x: node.position("x"), y: node.position("y") }
      });
    }


    for (let i = 0; i < graph.edges.length; i++) {
      let edge = graph.edges[i];
      cy.add({
        data: {
          id: edge.data("id"),
          name: edge.data("name"),
          source: edge.data("source"),
          target: edge.data("target"),
          cost: edge.data("cost"),
          time: edge.data("time"),
          sucost: edge.data("sucost"),
          sutime: edge.data("sutime"),
          label: edge.data("label")
        }
      });
    }
  }
};
