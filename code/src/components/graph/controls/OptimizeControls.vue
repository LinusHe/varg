
<template>
  <v-container class="optimize-container">
    <div class="optimize-controls">
      <v-card align="center">
        <v-row>
          <p class="headline ma-auto">Optimieren</p>
          <v-dialog v-model="dialog" max-width="350">
            <template v-slot:activator="{ on }">
              <v-btn class="btn-settings" v-on="on" text icon color="lightgrey">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Optimierungs-Einstellungen</v-card-title>
              <v-card-text>
                Um den bestmöglichen Produktions-Weg zu finden, müssen Start und Endzustände ausgewählt werden,
                zwischen denen die Optimierungsfunktion angewendet werden soll:
                <br />
                <br />
                <v-select
                  @focus="getNodeItemsID(); getNodeItemsName()"
                  v-model="startSelect"
                  :items="itemsName"
                  :multiple="true"
                  label="Startzustand"
                ></v-select>
                <v-select
                  @focus="getNodeItemsID(); getNodeItemsName()"
                  v-model="endSelect"
                  :items="itemsName"
                  label="Endzustand"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                  @focus="optimizing()"
                >Anwenden</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row align="center">
          <div class="switch-container">
            <p class="switch-text-left">Zeit</p>
            <v-switch
              v-model="optimizingOption"
              class="switch-button"
              color="primary"
              flat
              inset
              @change="optimizing()"
            ></v-switch>
            <p class="switch-text-right">Kosten</p>
          </div>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
let dialogComponent;

export default {
  name: "OptimizeControls",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      optimizingOption: false, // True means option costs and false is option time
      itemsName: [""],
      itemsID: [""],
      dialog: false,
      startSelect: "",
      endSelect: ""
    };
  },
  methods: {
    getGraph() {
      return this.$parent.$refs["vargraph"];
    },
    getNodeItemsID() {
      this.itemsID = this.getGraph().getNodeID(this.getGraph());
    },
    getNodeItemsName() {
      this.itemsName = this.getGraph().getNodeName(this.getGraph());
    },
    getTotalCost(Edges) {
      let totalCost = 0
      for(let i = 0; i < Edges.length; i++) {
        totalCost += this.getGraph().getTotalCost(Edges[i])
      }
      return totalCost      
    },
    getTotalTime(Edges) {
      let totalTime = 0
      for(let i = 0; i < Edges.length; i++) {
        totalTime += this.getGraph().getTotalTime(Edges[i])
      }   
      return totalTime   
    },
    getOptionValue(path) {
      let value
      let option = this.optimizingOption;   // false = time, true = cost
      if (option) {
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
        let checkNode = this.getGraph().getTarget(path[changingNode])
        
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
          while(sortNode[nextSearch][0] != checkNode && nextSearch < sortNode.length) {
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
        if(this.getGraph().getTarget(path[i]) == node) {
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
    optimizing: function() {
      let option = this.optimizingOption;   // false = time, true = cost
      let nextBestCounter = 4
      //in neuer gui einfügen:
      //let nextBestCounter = this.nextBestCounter
      
        // gets ID's of start-nodes
      let startIDs = []
      for (let i = 0; i < this.startSelect.length; i++) {
        let indexStart = this.itemsName.indexOf(this.startSelect[i]);
        startIDs.push(this.itemsID[indexStart]);
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

          let Edges = [];
          let optimizeNode = [3]

            // nextEdgeCounter = number of reachable nodes
          let nextEdgeCounter = this.getGraph().countNewEdges(sortNodes[i])
          let nextNode   
          
            // get next reachable nodes in sort-node form
            // getting nexNodes individually from graph, otherwise problems (somehow)
          for (let j = 0; j < nextEdgeCounter; j++) {

            nextNode = this.getGraph().getNextNode(sortNodes[i], option, j)

            let allreadyFound = 0;
              // checks if nextNode is allready part of sort-node (checking ID)
            for (let k = 0; k < sortNodes.length; k++) {

                // node was allready found
                //'allreadyfound' ensures, only top 'nextBestCounter' costs of every node gets saved
              if (sortNodes[k][0] == nextNode [0]) {
                allreadyFound ++

                  // if new found way has lower cost correct all nodes that had it as part of their way
                if (sortNodes[k][2] > nextNode [2]) {
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
      let bestPath = [3]
      let indexEnd = this.itemsName.indexOf(this.endSelect);
      let endID = this.itemsID[indexEnd];
      
        //look for the end-node, first one found is the one with lowest cost
      let search = 0
      while(sortNodes[search][0] != endID && search < sortNodes.length) {
        search ++
      }

      bestPaths.push(sortNodes[search][1])

/*    für später, evlt?
      if(search == sortNodes.length) {
        console.log("Kein Weg möglich...")
      }
      else {
        bestPaths.push(sortNodes[search][1])
      }
      */

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
    
      this.getGraph().markBestEdges(bestPaths[0])

      for(let ranking = 0; ranking < bestPaths.length; ranking ++) {
        console.log(bestPaths[ranking])
        console.log(this.getTotalCost(bestPaths[ranking]))
        console.log(this.getTotalTime(bestPaths[ranking]))
      }

    }
  }
};
</script>
