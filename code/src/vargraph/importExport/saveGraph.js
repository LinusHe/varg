/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods to save the graph 

export default {
  /* SaveMe(): 
  Creates a constant object "content" which 
  saves all nodes and egdges in two arrays.
  This object is then returned. By calling this function
  the current state of the graph can be saved. The object "content"
  posses a unique toString method that ouputs all nodes and edges.
  Currently for testing purposes.
  */
  SaveMe(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.$refs["cyRef"].instance;
    
    const content = {
      nodes: cy.elements("node"),
      edges: cy.elements("edge"),
      minZoom: cy.data("minZoom"),

      toString() {
        let Output = " ";
        for (let i = 0; i < this.nodes.length; i++) {
          Output +=
            this.nodes[i].data("name") +
            ", position: x:" +
            this.nodes[i].position("x") +
            ", y: " +
            this.nodes[i].position("y") +
            " ";
        }
        Output += ", edges: ";
        for (let i = 0; i < this.edges.length; i++) {
          Output += this.edges[i].data("name") + " ";
        }
        return Output;
      },

      freezeEverything() {
        for (let i = 0; i < this.nodes.length; i++) {
          Object.freeze(this.nodes[i]);
        }
        for (let i = 0; i < this.edges.length; i++) {
          Object.freeze(this.edges[i]);
        }
      }
    };
    content.freezeEverything();
    Object.freeze(content);
    return content;
  }
};
