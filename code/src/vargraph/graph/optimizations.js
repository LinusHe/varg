/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph optimization

import graph from "./graph"
import cyStore from "./cyStore";

//function to format the seconds in HHMMSS
function toHHMMSS (num) {
  var sec_num = parseInt(num, 10); 
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours + ':' + minutes + ':' + seconds;
}

function isConnectedToEndNode(start, end , path){
  let arrayOfOutgoers = []
  let  pathOfPath = []
  
  
 for(let i = 0; i< start.outgoers().length; i++){
    arrayOfOutgoers.push(start.outgoers()[i].data("name"))
  }
 

  if(!arrayOfOutgoers.includes(end.data("name")) || (start.outgoers().nodes().length !=1 && arrayOfOutgoers.includes(end.data("name")) )){
    for(let i = 0; i < start.outgoers().nodes().length; i++){
      for(let j = 0; j < start.edgesTo(start.outgoers().nodes()[i]).length ; j++){
        let stack = []
        for(let k = 0; k< path.length; k++){
          stack.push(path[k])
        }
        if(start.outgoers().nodes()[i].data("name") === end.data("name")){
          stack.push(start.edgesTo(start.outgoers().nodes()[i])[j].data("name"))
          stack.push(start.outgoers().nodes()[i].data("name"))
          pathOfPath.push(stack)
        }
       
        else{
        stack.push(start.edgesTo(start.outgoers().nodes()[i])[j].data("name"))
        stack.push(start.outgoers().nodes()[i].data("name"))
        
       
        pathOfPath = pathOfPath.concat(isConnectedToEndNode(start.outgoers().nodes()[i], end, stack))
        }
      }
    }
  }

  else{
    
    for(let i = 0; i < start.outgoers().edges().length; i++){
      let stack = []
        for(let k = 0; k< path.length; k++){
          stack.push(path[k])
        }
      
      stack.push(start.outgoers().edges()[i].data("name"))
      stack.push(end.data("name"))
     
      pathOfPath.push(stack)
      
      
      
    }
  }
  return pathOfPath
  
  
}
  


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
    let costs = 0
    let time = 0

    let arrayOfPaths = []
    let emptyArray = []
    
   

    
      for(let j = 0; j<start.length ; j++){
        let startNode = "#" + start[j];
        
        
        arrayOfPaths.push(cy.$(startNode).data("name"))

        console.log(isConnectedToEndNode(cy.$(startNode), cy.$(endNode), arrayOfPaths, emptyArray ))


      }
    

   /* path.addClass("hightlighted")
    let collection = cy.elements()

    //highlight the bfs path
    for(let i = 0; i< path.length; i++){
      collection[collection.indexOf(path[i])].addClass("highlighted")
    }
  
    
    







    
/*
      for (let i = 0; i < start.length; i++) {
        let startNode = "#" + start[i];
        
        let dijkstraCosts = cy.elements().dijkstra(startNode, function(edge) {
          return (edge.data("cost") * quantity) + edge.data("sucost");
        
        });

        let dijkstraTime = cy.elements().dijkstra(startNode, function(edge) {
          return (edge.data("time") * quantity) + edge.data("sutime");
        });
      
        //this if and else is to find the shortest path of the array of starting nodes
        if(option === "optionCosts"){
  
            minDistanceCosts = dijkstraCosts.distanceTo(cy.$(endNode));
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
      
      
      if(option === "optionTime"){
        pathToEndTime.addClass("highlighted");  //optimized way for the option time will be shown

        //this calculates the costs for the optimized time route
        for(let i = 0; i < pathToEndTime.length; i++){
          if(pathToEndTime[i].group() === "edges"){
          costs += ((pathToEndTime[i].data("cost") * quantity) + (pathToEndTime[i].data("sucost"))) 
          }
        }
        console.log("Gesamtkosten: "+ (Math.round(costs * 100) / 100) + cy.data("settingsUnitCostSelection"))
        console.log("Gesamtzeit: "+ toHHMMSS(minDistanceTime) )
      }
      else{
        pathToEndCosts.addClass("highlighted"); //vice versa for the option costs
        
        //this calculates the route for the optimized cost route
        for(let i = 0; i < pathToEndCosts.length; i++){
          if(pathToEndCosts[i].group() === "edges"){
          time += ((pathToEndCosts[i].data("time") * quantity) + (pathToEndCosts[i].data("sutime"))) 
          }
        }
        console.log("Gesamtkosten: "+ (Math.round(minDistanceCosts * 100) / 100) + cy.data("settingsUnitCostSelection"))
        console.log("Gesamtzeit: "+ toHHMMSS(time))
      }


      */
  }

};
