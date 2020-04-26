/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph optimization
import cyStore from "./cyStore";


export default {
  // findPath(.. ): The method finds the shortest Path between 2 nodes
  //                with the Dijkstra Algorithm
  findPath(graphComponent, option, start, end) {
    // get cytoscape instance
    //let cy = graphComponent.getCytoGraph();

    var minDistance = 0;

    cyStore.data.cy.elements().removeClass("highlighted");
    let cy = cyStore.data.cy

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
  },

  
  countNewEdges(start) {
    let cy = cyStore.data.cy
    
    let EdgeCount = 0

      // all outgoing edges from node 'start'
    cy.getElementById(start[0]).outgoers('edge').forEach(element => {
      EdgeCount ++
    })

    return EdgeCount
  },  
  
  
  
  getNextNode(start, option, count) {
    let cy = cyStore.data.cy
    let quantity = cy.data("prodQuant")
    
      // all outgoing edges from node 'start'
    let nextEdges = cy.getElementById(start[0]).outgoers('edge');
    let newFoundNode = [3];


    console.log(1000)

      //converts all outgoing edges into sort-node form
    newFoundNode [0] = nextEdges[count].data("target")

    let newPath = []
      // copy all edges of the current path
    for(let i = 0; i < start[1].length; i++) {
        // add new egde
      newPath.push(start[1][i])
    }
    newPath.push(nextEdges[count].data("id"))
    newFoundNode [1] = newPath                                          //usedEdges

    if(option) {
      let newtime = start[2] + nextEdges[count].data("time") * quantity + nextEdges[count].data("sutime")
      newtime = Math.round(newtime * 100) / 100

      newFoundNode [2] = newtime              
    }
    else {
      let newcost = start[2] + nextEdges[count].data("cost") * quantity + nextEdges[count].data("sucost")
      newcost = Math.round(newcost * 100) / 100

      newFoundNode [2] = newcost            
    }

      //testline
    console.log(newFoundNode[2])
    console.log(nextEdges.length)
    

    return newFoundNode
  },

  markBestEdges(bestEdgesID) {
    cyStore.data.cy.elements().removeClass("highlighted");
    let cy = cyStore.data.cy

    bestEdgesID.forEach(element => {
      cy.getElementById(element).addClass("highlighted")
    })
  },

  getTarget(edge){
    let cy = cyStore.data.cy

    let node = cy.getElementById(edge).data("target")

    return node
  }

};
