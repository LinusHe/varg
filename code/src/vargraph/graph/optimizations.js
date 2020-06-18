/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph optimization

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

function allPossiblePaths(start, end , path){
  let arrayOfOutgoers = []
  let  allPaths = []
  
  
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
          allPaths.push(stack)
        }
       
        else{
        stack.push(start.edgesTo(start.outgoers().nodes()[i])[j].data("name"))
        stack.push(start.outgoers().nodes()[i].data("name"))
        
       
        allPaths = allPaths.concat(allPossiblePaths(start.outgoers().nodes()[i], end, stack))
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
     
      allPaths.push(stack)
      
      
      
    }
  }
return allPaths
}
  


export default {
  countNewEdges(start) {
    let cy = cyStore.data.cy
    let EdgeCount = 0
    cy.getElementById(start[0]).outgoers('edge').forEach(element => {
      EdgeCount ++
    })
    return EdgeCount
  },  
  
  getNextNode(start, count) {
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

    newFoundNode[2] = this.getOptionValue(newPath)


    /*
    if(option == "optionCost") {
      newFoundNode[2] = start[2] + this.getTotalCost(nextEdges[count])
      
      let newcost = start[2] + nextEdges[count].data("cost") * quantity + nextEdges[count].data("sucost")
      newcost = Math.round(newcost * 100) / 100
      newFoundNode [2] = newcost           
      
    }
    else {
      newFoundNode[2] = start[2] + this.getTotalTime(nextEdges[count])
      
      let newtime = start[2] + nextEdges[count].data("time") * quantity + nextEdges[count].data("sutime")
      newtime = Math.round(newtime * 100) / 100
      newFoundNode [2] = newtime   
            
    }
    */

    return newFoundNode
  },

  markBestEdges(bestEdgesID) {
    cyStore.data.cy.elements().removeClass("highlighted");
    let cy = cyStore.data.cy
    bestEdgesID.forEach(element => {
      cy.getElementById(element).addClass("highlighted")
      cy.getElementById(element).unselect();
    })
  },

  removeOptimization() {
    // remove costs & time & show optimize button
    this.$parent.$parent.$refs["graphInfo"].setOptimized(false);
    // remove Ranking
    if (typeof this.$parent.$parent.$refs["settingsMenu"].$refs["settingsOptimize"] !== "undefined") {
      this.$parent.$parent.$refs["settingsMenu"].$refs["settingsOptimize"].clearRanking();
    }
    // remove highlighting
    this.unmarkBestEdges();
  },

  unmarkBestEdges() {
    let edges = cyStore.data.cy.edges();
    for (let i = 0; i < edges.length; i++) {
      edges[i].removeClass("highlighted");
    }
  },

  createBoundary() {
    let cy = cyStore.data.cy
    let startIDs= cy.data("settingsOptimizationStartIDs")
      // gets ID's of start- and endnodes
    let endID = cy.data("settingsOptimizationEndID");
      //automatically initialize startnodes if no startnodes were selected
    if(startIDs.length == 0 ){
      for(let o = 0; o < cy.nodes().length; o++){
        if(cy.nodes()[o].incomers().length == 0){
          startIDs.push(cy.nodes()[o].data("id"))
        }
      }
    }
      //automatically initialize endnode if no endnode were selected
    if(endID == undefined || endID == "" || endID == -1){
      for(let o = 0; o < cy.nodes().length; o++){
        if(cy.nodes()[o].outgoers().length == 0){
          endID = cy.nodes()[o].data("id")          
        }
      }
    } 

    cyStore.data.cy.data("settingsOptimizationStartIDs", startIDs)
    cyStore.data.cy.data("settingsOptimizationEndID", endID)

    let pathCount = 0
    for (let i = 0; i < startIDs.length; i++) {
      if(pathCount < 7) {
        pathCount = pathCount + this.calculateBoundary(startIDs[i], endID)
      }
    }
    return pathCount
  },

  calculateBoundary(node, end) {
    //rekursive counting of possible ways, stop at 7
    let pathCount = 0
    let cy = cyStore.data.cy
    let ways = cy.getElementById(node).outgoers('edge')
    for(let i = 0; i < ways.length; i++) {
      if(pathCount < 7) {
        let target = ways[i].data("target")
        if (target == end) {
          pathCount ++
        }
        else {
          pathCount = pathCount + this.calculateBoundary(target, end)
        }
      }
    }
    return pathCount
  },

  getTarget(edge) {
    let cy = cyStore.data.cy
    let node = cy.getElementById(edge).data("target")
    return node
  },

  getPartCost(edge) {
    let cy = cyStore.data.cy
    let quantity = cy.data("prodQuant")
    let partcost, partquantcost, partsucost
    let lotsize = cy.getElementById(edge).data("lotsize")
    if(lotsize > 1) {
      partquantcost = cy.getElementById(edge).data("cost") * (quantity)
      partsucost = cy.getElementById(edge).data("sucost") * parseInt((quantity-1)/(lotsize)+1)
      partcost = partquantcost + partsucost
    }
    else {
      partcost = quantity * (cy.getElementById(edge).data("cost") + cy.getElementById(edge).data("sucost"))
    }
    partcost = Math.round(partcost * 100) / 100
    return partcost
  },
    
  getTotalCost(Edges) {
    let totalCost = 0
    for(let i = 0; i < Edges.length; i++) {
      totalCost += this.getPartCost(Edges[i])
    }
    return totalCost      
  },

  getPartTime(edge) {
    let cy = cyStore.data.cy
    let quantity = cy.data("prodQuant")
    let parttime, partquanttime, partsutime
    let lotsize = cy.getElementById(edge).data("lotsize")
    if(lotsize > 1) {
      partquanttime = cy.getElementById(edge).data("time") * (quantity)
      partsutime = cy.getElementById(edge).data("sutime") * parseInt((quantity-1)/(lotsize)+1)
      parttime = partquanttime + partsutime
    }
    else {
      parttime = quantity * (cy.getElementById(edge).data("time") + cy.getElementById(edge).data("sutime"))
    }
    parttime = Math.round(parttime * 100) / 100

    
    return parttime
  },  

  getTotalTime(Edges) {
    let totalTime = 0
    for(let i = 0; i < Edges.length; i++) {
      totalTime += this.getPartTime(Edges[i])
    }   
    return totalTime   
  },

  getOptionValue(path) {
    let value
    let option = cyStore.data.cy.data("settingsOptimizationOption");   // false = time, true = cost
    if(option == "optionCost") {
      value = this.getTotalCost(path)
    }
    else {
      value = this.getTotalTime(path)
    }
    return value
  },

  wasAllreadyFound(path, foundPaths) {
    //checks, if path is in foundPaths
    let found = false
    for (let i = 0 ; i < foundPaths.length && found == false; i++) {
      if (path.length == foundPaths[i].length) {
        let partFound = true
        for (let j = 0; j < path.length && j < foundPaths[i].length && partFound; j++) {
          if (path[j] != foundPaths[i][j]) {
            partFound = false
          }
        }
        if(partFound == true) {
          found = true
        }
      }
    }
    return found
  },

  findNextBest(path, sortNode, foundPaths) {
    let distance = -2
    let nextPath = []
    let nextPathPerNode = []
    let oldCost, newCost

      // check all nodes on best path for the "best better way"   
    for(let changingNode=0; changingNode < path.length; changingNode++) {
      let nextSearch = 0
      
        //checkNode = next node on the path, starts at the first after startnode
      let checkNode = this.getTarget(path[changingNode])
      
        // look for checkNode's Id in sortNodes[x][0], first one found is the currently used path (sortNodes[x][1])
      while(nextSearch < sortNode.length && sortNode[nextSearch][0] != checkNode) {
        nextSearch ++
      }
      
      if (nextSearch < sortNode.length) {
        oldCost = sortNode[nextSearch][2]
      }
      else {
        oldCost = -2
      }
      nextSearch++
        // second one found is the next best
        // if there is no more, nextSearch == sortNode.length
      while(nextSearch < sortNode.length && sortNode[nextSearch][0] != checkNode) {
        nextSearch ++
      }
        //if there was a nextbest path to this node
      if (nextSearch < sortNode.length) {
          //nextPathPerNode is the nextbest path to this node plus the rest of path
        nextPathPerNode = this.changePath(sortNode[nextSearch], path)
        newCost = sortNode[nextSearch][2]
      }
      else {
        newCost = -2
      }

        //if nextPathPerNode is allready in bestPaths, look for the next x in sortNodes
      while(this.wasAllreadyFound(nextPathPerNode, foundPaths)) {
        nextSearch ++
        while(nextSearch < sortNode.length && sortNode[nextSearch][0] != checkNode) {
          nextSearch ++
        }
        if (nextSearch < sortNode.length) {
          nextPathPerNode = this.changePath(sortNode[nextSearch], path)
          newCost = sortNode[nextSearch][2]
        }
        else {
          nextPathPerNode = []
        }
      }
        // check if distance is new best(low) and save id
        // || distance < 0 to make sure, distance for first node is used
        // if nextPath did not get an acttual path, nextPath.length != 0 to avoid errors
        //anpassen?
      if((distance > newCost-oldCost || distance < 0) && this.wasAllreadyFound(nextPathPerNode, foundPaths) == false && nextPathPerNode.length != 0) {
          distance = newCost-oldCost
          nextPath = nextPathPerNode
      }
    }
    return nextPath
  },

  isPartOfPath(node, path){
      //checks if and where node exists on path (as target of an edge in path)
    let point = -2
    for (let i = 0; i < path.length; i++) {
      if(this.getTarget(path[i]) == node) {
        point = i
      }
    }
    return point
  },

  isPartOfNodes(node, nodes){
      //checks if node is in nodes
    let point = false
    for (let i = 0; i < nodes.length-1; i++) {
      if(node == nodes[i]) {
        point = true
      }
    }
    return point
  },

  changePath(newNode, oldPath) {
      //combines newNode[1] and oldPath
      //first half: newNode[1]
      //second half: oldPath starting after the last target in newNode[1]
    let point = this.isPartOfPath(newNode[0], oldPath)
                          
    if(point >= 0) {
      let tempPath = []
      for (let temp = 0; temp < newNode[1].length; temp ++) {
        tempPath[temp] = newNode[1][temp]
      }
      let secondPart = newNode[1].length + oldPath.length - (point + 1)
      for (let temp = newNode[1].length; temp < secondPart; temp ++) {
        point ++
        tempPath[temp] = oldPath[point]
      }
      oldPath = tempPath
    }
    return oldPath
  },
  
  optimizing() {
<<<<<<< HEAD
  
    let cy = this.getCytoGraph()
    console.log(cy.data("settingsOptimizationStartIDs"))
=======
   
    let cy = cyStore.data.cy
 
>>>>>>> MultipleStartNodes

   
    let option = cy.data("settingsOptimizationOption");   // false = time, true = cost
    let startIDs= cy.data("settingsOptimizationStartIDs")
      // gets ID's of start- and endnodes
    let endID = cy.data("settingsOptimizationEndID");
      //automatically initialize startnodes if no startnodes were selected
    if(startIDs.length == 0 || startIDs[0] == undefined ){
      
      for (let o = 0; o < this.getNodeArr(this).length; o++) {
        if (this.getNodeArr(this)[o].incomers().length == 0) {
          startIDs.push(this.getNodeArr(this)[o].data("id"));
        }
      }
    }
      //automatically initialize endnode if no endnode were selected
    if(endID == undefined || endID == "" || endID == -1){
      for (let o = 0; o < this.getNodeArr(this).length; o++) {
        if (this.getNodeArr(this)[o].outgoers().length == 0) {
          endID = this.getNodeArr(this)[o].data("id");
        }
      }
    }   
    cyStore.data.cy.data("settingsOptimizationStartIDs" , startIDs);
    cyStore.data.cy.data("settingsOptimizationEndID" , endID);
      //checks how many paths need to be found
    let nextBestCounter = cy.data("settingsOptimizationNumber");
      //checks if there are enough paths
    let boundaryCheck = this.createBoundary()
    if(nextBestCounter > boundaryCheck) {
      nextBestCounter = boundaryCheck
    }



      
      // "converts" start-nodes into sort-nodes
      // sort-nodes save NodeID, usedEdges (from start-node) and "needed" costs (from start)
    let sortNodes = [];
    for (let i = 0; i < startIDs.length; i++) {
      let Edges = [];
      let optimizeNode = [3]
      optimizeNode [0] = startIDs[i]          //NodeID
      optimizeNode [1] = Edges                //usedEdges
      optimizeNode [2] = 0                    //cost/time        
      sortNodes.push(optimizeNode);
    }

      //checkedNodes noch nicht funktional, aber nur für performance relevant
    let checkedNodes = []

    for (let i = 0; i < sortNodes.length; i++) {
        //checkedNodes noch nicht funktional, aber nur für performance relevant
      if(this.isPartOfNodes(sortNodes[i][0], checkedNodes) == false) {

          // nextEdgeCounter = number of reachable nodes
        let nextEdgeCounter = this.countNewEdges(sortNodes[i])
        let nextNode   
        
          // get next reachable nodes in sort-node form
          // getting nexNodes individually from graph, otherwise problems (somehow)
        for (let j = 0; j < nextEdgeCounter; j++) {

          nextNode = this.getNextNode(sortNodes[i], j)

          let allreadyFound = 0;
            // checks if nextNode is allready part of sort-node (checking ID)
          for (let k = 0; k < sortNodes.length; k++) {

              // node was allready found
              //'allreadyfound' ensures, only top 'nextBestCounter' costs of every node gets saved
            if (sortNodes[k][0] == nextNode[0]) {
              allreadyFound ++

                // if new found way has lower cost correct all nodes that had it as part of their way
              if (sortNodes[k][2] > nextNode[2]) {
                if(allreadyFound == 1) {
                  for (let correct = 0; correct < sortNodes.length; correct++) {
                    if(nextNode[0] != sortNodes[correct][0]) {
                      //otherwise would overwrite everything to that node anytime a new better path to a node is found
                      let tempPath = this.changePath(nextNode, sortNodes[correct][1])
                    
                      sortNodes[correct][1] = tempPath
                      sortNodes[correct][2] = this.getOptionValue(tempPath)
                    }
                  } 
                }
                  //insertion-sort-like
                let tempCost = sortNodes[k][2]
                sortNodes[k][2] = nextNode[2]
                nextNode[2] = tempCost

                let tempPath = sortNodes[k][1]
                sortNodes[k][1] = nextNode[1]
                nextNode[1] = tempPath
              }
            }
          }       
          if(allreadyFound < nextBestCounter) {
            sortNodes.push(nextNode)
          }
        }
          //checkedNodes noch nicht funktional, aber nur für performance relevant          
        checkedNodes.push(sortNodes[i][0])
      }
    }
  
    let bestPaths = []
   // let endID = cyStore.data.cy.data("settingsOptimizationEndID");
   // let endID = this.getCytoGraph(this).data("settingsOptimizationEndID");
    
      //look for the end-node, first one found is the one with lowest cost
    let search = 0
    while (search < sortNodes.length && sortNodes[search][0] != endID) {
      search++;
    }

    if(search >= sortNodes.length) {
      console.log("Kein Weg möglich...")
    }
    else {
      bestPaths.push(sortNodes[search][1])
    }
    

      //saves the nextbest alternatives in array
    for(let rank = 1; rank < nextBestCounter; rank++) {
      let nextRank, nextRankPath
      let nextRankDistance = -2
      for (let checks = 0; checks < bestPaths.length; checks++) {
        nextRankPath = this.findNextBest(bestPaths[checks], sortNodes, bestPaths)
        if (nextRankPath.length > 0 && (this.getOptionValue(nextRankPath) - this.getOptionValue(bestPaths[0]) < nextRankDistance || nextRankDistance < 0)) {
          nextRankDistance = this.getOptionValue(nextRankPath) - this.getOptionValue(bestPaths[0])
          nextRank = nextRankPath
        }
      }
      bestPaths.push(nextRank)
    }

    // push best paths to cy.data
    cyStore.data.cy.data("bestPaths", bestPaths);
    
  
    this.markBestEdges(bestPaths[0])

  

  }

};
