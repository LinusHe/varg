/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This File contains methods for the whole graph

export default {
  getCytoGraph(graphComponent) {
    return graphComponent.$refs["cyRef"].instance;
  },

  // toString(): Collects all nodes of the graph and edges in arrays
  //             and then outputs their ID in a string.
  //             Currently for testing purposes.
  toString() {
    let output = "";
    let nodeArr = this.nodes;
    let edgeArr = this.edges;
    for (let element of nodeArr) {
      output += element.data("id") + " ";
    }
    for (let element of edgeArr) {
      output += element.data("id") + " ";
    }
    return output;
  }
};
