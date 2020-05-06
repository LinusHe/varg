/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph optimization
import cyStore from "./cyStore";


export default {
  countNewEdges(start) {
    let cy = cyStore.data.cy
    let EdgeCount = 0
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

      //converts all outgoing edges into sort-node form
    newFoundNode [0] = nextEdges[count].data("target")

    let newPath = []
      // copy all edges of the current path
    for(let i = 0; i < start[1].length; i++) {
        // add new egde
      newPath.push(start[1][i])
    }
    newPath.push(nextEdges[count].data("id"))
    newFoundNode[1] = newPath

    if(option) {
      let newcost = start[2] + nextEdges[count].data("cost") * quantity + nextEdges[count].data("sucost")
      newcost = Math.round(newcost * 100) / 100
      newFoundNode [2] = newcost           
    }
    else {
      let newtime = start[2] + nextEdges[count].data("time") * quantity + nextEdges[count].data("sutime")
      newtime = Math.round(newtime * 100) / 100
      newFoundNode [2] = newtime            
    }

    return newFoundNode
  },

  markBestEdges(bestEdgesID) {
    cyStore.data.cy.elements().removeClass("highlighted");
    let cy = cyStore.data.cy
    bestEdgesID.forEach(element => {
      cy.getElementById(element).addClass("highlighted")
    })
  },

  getTarget(edge) {
    let cy = cyStore.data.cy
    let node = cy.getElementById(edge).data("target")
    return node
  },

  getTotalCost(edge) {
    let cy = cyStore.data.cy
    let quantity = cy.data("prodQuant")
    let partcost = cy.getElementById(edge).data("cost") * quantity + cy.getElementById(edge).data("sucost")
    partcost = Math.round(partcost * 100) / 100
    return partcost
  },

  getTotalTime(edge) {
    let cy = cyStore.data.cy
    let quantity = cy.data("prodQuant")
    let parttime = cy.getElementById(edge).data("time") * quantity + cy.getElementById(edge).data("sutime")
    parttime = Math.round(parttime * 100) / 100
    return parttime
  }
};
