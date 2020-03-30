/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph optimization

export default {
  // findPath(.. ): The method finds the shortest Path between 2 nodes
  //                with the Dijkstra Algorithm
  findPath(option, start, end) {
    // get cytoscape instance
    let cy = this.$refs["cyRef"].instance;

    var minDistance = 0;

    cy.elements().removeClass("highlighted");

    var endNode = "#" + end;

    if (option === "optionCosts") {
      console.log("costs");
      var pathToEndCosts;
      for (let i = 0; i < start.length; i++) {
        let startNode = "#" + start[i];
        var dijkstraCosts = cy.elements().dijkstra(startNode, function(edge) {
          return edge.data("cost") + edge.data("sucost");
        });
        if (i === 0) {
          //saves the shortest distance to a sspecific node(in this case endNode)
          minDistance = dijkstraCosts.distanceTo(cy.$(endNode));
          //saves the shortes path to a specific node
          pathToEndCosts = dijkstraCosts.pathTo(cy.$(endNode));
        } else if (minDistance > dijkstraCosts.distanceTo(cy.$(endNode))) {
          minDistance = dijkstraCosts.distanceTo(cy.$(endNode));
          pathToEndCosts = dijkstraCosts.pathTo(cy.$(endNode));
        }
      }
      pathToEndCosts.addClass("highlighted");
    }

    if (option === "optionTime") {
      console.log("time");

      var pathToEndTime;
      for (let i = 0; i < start.length; i++) {
        let startNode = "#" + start[i];
        var dijkstraTime = cy.elements().dijkstra(startNode, function(edge) {
          return edge.data("time") + edge.data("sutime");
        });
        if (i === 0) {
          minDistance = dijkstraTime.distanceTo(cy.$(endNode));
          pathToEndTime = dijkstraTime.pathTo(cy.$(endNode));
        } else if (minDistance > dijkstraTime.distanceTo(cy.$(endNode))) {
          minDistance = dijkstraTime.distanceTo(cy.$(endNode));
          pathToEndTime = dijkstraTime.pathTo(cy.$(endNode));
        }
      }
      pathToEndTime.addClass("highlighted");
    }
  }
};
