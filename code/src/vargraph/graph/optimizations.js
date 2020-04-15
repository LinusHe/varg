/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph optimization

import graph from "./graph"

export default {
  // findPath(.. ): The method finds the shortest Path between 2 nodes
  //                with the Dijkstra Algorithm
  findPath(graphComponent, option, start, end) {

    graphComponent = graph

    let cy = graphComponent.getCytoGraph();

    let minDistanceTime = 0;
    let minDistanceCosts = 0;

    cy.elements().removeClass("highlighted"); //removes the old optimization
    
    let endNode = "#" + end;

    let quantity = cy.data("prodQuant")
    let pathToEndCosts;
    let pathToEndTime;


      for (let i = 0; i < start.length; i++) {
        let startNode = "#" + start[i];
        
        let dijkstraCosts = cy.elements().dijkstra(startNode, function(edge) {
          return (edge.data("cost") * quantity) + edge.data("sucost");
        
        });

        let dijkstraTime = cy.elements().dijkstra(startNode, function(edge) {
          return (edge.data("time") * quantity) + edge.data("sutime");
        });
      
        if(option === "optionCosts"){
  
            //saves the shortest distance to a specific node(in this case endNode)
            minDistanceCosts = dijkstraCosts.distanceTo(cy.$(endNode));
            //saves the shortes path to a specific node
            pathToEndCosts = dijkstraCosts.pathTo(cy.$(endNode));
        
          if (minDistanceCosts > dijkstraCosts.distanceTo(cy.$(endNode))) {
            minDistanceCosts = dijkstraCosts.distanceTo(cy.$(endNode));
            pathToEndCosts = dijkstraCosts.pathTo(cy.$(endNode));
          }
         

        }
        else{
          
          if (i === 0) {
            minDistanceTime = dijkstraTime.distanceTo(cy.$(endNode));
            pathToEndTime = dijkstraTime.pathTo(cy.$(endNode));
           
          } 
          else if (minDistanceTime > dijkstraTime.distanceTo(cy.$(endNode))) {
            minDistanceTime = dijkstraTime.distanceTo(cy.$(endNode));
            pathToEndTime = dijkstraTime.pathTo(cy.$(endNode));
           
          }
  
          
        }
        
        


      }

      let costs = 0
      let time = 0
      
      if(option === "optionTime"){
        pathToEndTime.addClass("highlighted");  //optimized way for the option time will be shown
        for(let i = 0; i < pathToEndTime.length; i++){
          if(pathToEndTime[i].group() === "edges"){
          costs += ((pathToEndTime[i].data("cost") * quantity) + (pathToEndTime[i].data("sucost"))) 
          }
        }
        console.log("Gesamtkosten: "+ costs + cy.data("settingsUnitCostSelection"))
        console.log("Gesamtzeit: "+ minDistanceTime + cy.data("settingsUnitTimeSelection"))
      }
      else{
        pathToEndCosts.addClass("highlighted"); //vice versa for the option costs
        for(let i = 0; i < pathToEndCosts.length; i++){
          if(pathToEndCosts[i].group() === "edges"){
          time += ((pathToEndCosts[i].data("time") * quantity) + (pathToEndCosts[i].data("sutime"))) 
          }
        }
        console.log("Gesamtkosten: "+ minDistanceCosts + cy.data("settingsUnitCostSelection"))
        console.log("Gesamtzeit: "+ time + cy.data("settingsUnitTimeSelection"))
      }
      
     

  }
};
