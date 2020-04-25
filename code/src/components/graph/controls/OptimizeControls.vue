
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
    optimizing: function() {
      let option = this.optimizingOption;   // false = time, true = cost
      
      /*
      if (this.optimizingOption === false) {
        // True means option costs and false is option time
        // not implemented yet
        option = "optionTime";  // false = time, true = cost
      } else {
        option = "optionCosts"; //cost
      }
      */  

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

        // for each node...
      for (let i = 0; i < sortNodes.length; i++) {
          //testline
        console.log(sortNodes.length)

        let Edges = [];

        let optimizeNode = [3]

          // ...get next gettable nodes in sort-node form

        let nextEdgeCounter = this.getGraph().countNewEdges(sortNodes[i])

        console.log(nextEdgeCounter)

        
        let nextNode   
      
          // for each "new found" node...
          // getting nexNodes individually from grahp, otherwise problems (somehow)
        for (let j = 0; j < nextEdgeCounter; j++) {

          nextNode = this.getGraph().getNextNode(sortNodes[i], option, j)

          let allreadyFound = 0;
            // ...check if node is allready part of sort-node (checking ID)
          for (let k = 0; k < sortNodes.length; k++) {
              // node was allready found
              //'allreadyfound' ensures, only top 3 costs of every note gets saved
            
            if (sortNodes[k][0] == nextNode [0]) {
              allreadyFound ++

                // if new found way has lower cost
              if (sortNodes[k][2] > nextNode [2]) {
                  // override it
                let tempCost = sortNodes[k][2]
                sortNodes[k][2] = nextNode[2]
                nextNode[2] = tempCost

                let tempPath = sortNodes[k][1]
                sortNodes[k][1] = nextNode[1]
                nextNode[1] = tempPath
              }
            }       
          }
          
            // new found node, 3 in case of Top 3 search
          if(allreadyFound < 3) {
            sortNodes.push(nextNode)
            
          }

          //testline
          for (let l = 0; l < sortNodes.length; l++) {
            console.log(sortNodes[l])
          }

        }
      }
      
      
      //searches for the end-node
      let indexEnd = this.itemsName.indexOf(this.endSelect);
      let endID = this.itemsID[indexEnd];
      let search = 0
      while(sortNodes[search][0] != endID) {
        search ++
      }
      let bestPath = sortNodes[search][1]
      let bestCost = sortNodes[search][2]

      console.log(sortNodes[search])
      this.getGraph().markBestEdges(bestPath)

      
      let distance = 0
      let distanceID, pointInPath
      let nextSearch = 0

        // chack all nodes on best path for the "best better way"
        // for all nodes...
      
     
      for(let i=0; i < bestPath.length; i++) {
        let checkNode = this.getGraph().getTarget(bestPath[i])
        
          // ...old cost....
        while(sortNodes[nextSearch][0] != checkNode) {
          nextSearch ++
        }
        let oldCost = sortNodes[nextSearch][2]

        nextSearch++

          // ...new cost
        while(sortNodes[nextSearch][0] != checkNode) {
          nextSearch ++
        }

        let newCost = sortNodes[nextSearch][2]

          // check if distance is new best(low) and save id
        if(distance < oldCost-newCost || i==0) {
          distance = oldCost - newCost
          distanceID = checkNode
          pointInPath = i + 1
        }
        

      }
      

      let nextBestCost = bestCost - distance
      let nextBestPath = sortNodes[nextSearch][1]

      
      for(let i=pointInPath.length; i<bestPath.lenght; i++) {
        nextBestPath.push(bestPath[i])
      }
      
        


      console.log(bestPath)
      console.log(bestCost)

      console.log(nextBestPath)
      console.log(nextBestCost)
      //this.getGraph().markBestEdges(bestPath)

    }
  }
};
</script>
