<template>
  <v-card flat class="settings-optimize">
    <v-card-text id="scrollOpt" class="scrolling-container pb-10" style="max-height: 55vh">
      <v-card-subtitle>Grundeinstellungen</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-divider></v-divider>
        <v-row>
          <v-col sm="9">
            <v-card-text>Optimieren nach</v-card-text>
          </v-col>
          <v-col sm="3">
            <v-select
              class="pr-8"
              hide-details
              @change="setOptimizeSettings()"
              v-model="optimizationOption"
              :items="optimizationOptionItems"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col sm="7">
            <v-card-text>
              Startzustand / Startzustände
              <em>(z.B. Rohmaterialien)</em>
            </v-card-text>
          </v-col>
          <v-col sm="5">
            <v-select
              @focus="getNodeItemsID(); getNodeItemsName()"
              @change="setOptimizeSettings()"
              class="pr-8"
              hide-details
              v-model="startSelect"
              :items="itemsName"
              :multiple="true"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col sm="7">
            <v-card-text>
              Endzustand
              <em>(z.B. fertiges Produkt)</em>
            </v-card-text>
          </v-col>
          <v-col sm="5">
            <v-select
              class="pr-8"
              @focus="getNodeItemsID(); getNodeItemsName()"
              @change="setOptimizeSettings()"
              hide-details
              v-model="endSelect"
              :items="itemsName"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col sm="7">
            <v-card-text>
              Anzahl der Optimierungen
              <br />
              <em class="pl-4">(je höher, desto rechenintensiver)</em>
            </v-card-text>
          </v-col>
          <v-col sm="5">
            <v-slider
              class="pr-8 mt-8"
              @change="setOptimizeSettings()"
              hide-details
              thumb-label="always"
              :thumb-size="24"
              min="1"
              max="7"
              step="1"
              append-icon="mdi-numeric-7"
              prepend-icon="mdi-numeric-1"
              color="primary"
              v-model="optimizationNumber"
              :items="itemsName"
            ></v-slider>
          </v-col>
        </v-row>
      </v-card>

      <v-card-subtitle class="mt-10 pb-0" id="alternatives">Alternative Optimierungswege</v-card-subtitle>
      <v-card v-if="rankArray.length == 0" class="mt-3 ml-6 mr-6">
        <v-row>
          <v-col sm="12">
            <v-card-text>
              <em>Um die alternativen Optimierungswege auswählen zu können muss zunächst optimiert werden</em>
              <v-btn
                class="mt-4"
                color="green darken-1"
                text
                @click="startOptimization()"
              >Optimierung starten</v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>

      <!-- <v-card class="mr-6 ml-6 mt-0"> -->
      <v-row class="ma-0">
        <v-col sm="12" class="ma-0 pa-0">
          <v-radio-group
            @change="changeHighlighting"
            v-model="optimizationSelection"
            :mandatory="false"
            class="ml-6 mr-6"
          >
            <template>
              <v-expansion-panels hover accordion>
                <v-expansion-panel v-for="(rank, i) in rankArray" :key="i">
                  <v-expansion-panel-header>
                    <v-radio color="primary" :value="i">
                      <template v-slot:label>
                        <v-card-text class="ma-0 pa-0 pt-1">
                          {{i + 1}}. Platz |
                          <strong>Kosten:</strong>
                          {{rank.cost.toFixed(2)}} €,
                          <strong>Zeit:</strong>
                          {{rank.time}}
                        </v-card-text>
                      </template>
                    </v-radio>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="ml-8">
                    <v-card-text>
                      <span v-for="(way, j) in rank.path" :key="j" class="rank-way">{{way}}</span>
                    </v-card-text>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
          </v-radio-group>
        </v-col>
      </v-row>
      <!-- </v-card> -->
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "OptimizeSettings",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
    this.getOptimizeSettings();
    this.applyRanking();
  },
  data: () => ({
    optimizationOption: "Zeit",
    optimizationOptionItems: ["Zeit", "Kosten"],
    itemsName: [""],
    itemsID: [""],
    startSelect: [""],
    endSelect: "",
    optimizationNumber: 4,
    optimizationSelection: 0,
    rankArray: []
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },

    scrollToAlternatives() {
      let scrollbox = document.getElementById("scrollOpt");
      scrollbox.scrollTo(0, 500);
    },

    convertTime( sec){

      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.graphInfo.toHHMMSS(sec)

    },

    applyRanking() {
        //calculates the total cost and time of the best graphs
      this.rankArray = [];
      let bestPaths = this.getGraph()
        .getCytoGraph(this)
        .data("bestPaths");

      for (let i = 0; i < (bestPaths ? bestPaths.length : 0); i++) {
        let nextRank = {};
        nextRank.cost = this.getGraph().getTotalCost(bestPaths[i]);
        nextRank.time = this.getGraph().getTotalTime(bestPaths[i]);

          //converts time into understandable format (e.g. 3750s to 1h 2min 30s)
        switch(this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsUnitTimeSelection")){


          case "Sekunden" :
             nextRank.time = this.convertTime(parseInt(nextRank.time) )
            break;
          case "Minuten" :
           nextRank.time = this.convertTime(parseInt(nextRank.time) * 60)
            break;
          case "Stunden" :
             nextRank.time = this.convertTime(parseInt(nextRank.time)* 60 *60)
            break;
          case "Tage" :
             nextRank.time = this.convertTime(parseInt(nextRank.time) * 60 *60 * 24 )
            break;
          default:
            nextRank.time = "etwas ist schief gelaufen"
      }

          //gets all nodes and edges from the best paths and puts it into rankArray
        nextRank.path = [];
        for (let j = 0; j < bestPaths[i].length; j++) {
          if (j == 0) {
            nextRank.path.push(
              this.getGraph()
                .getCytoGraph(this)
                .getElementById(bestPaths[i][j])
                .source()
                .data("name")
            );
          }
          nextRank.path.push(
            this.getGraph()
              .getCytoGraph(this)
              .getElementById(bestPaths[i][j])
              .data("name")
          );
          nextRank.path.push(
            this.getGraph()
              .getCytoGraph(this)
              .getElementById(bestPaths[i][j])
              .target()
              .data("name")
          );
        }
        this.rankArray.push(nextRank);
      }
    },

    clearRanking() {
      this.rankArray = [];
    },
      //marks the path chosen in settingsmenu
    changeHighlighting() {
      let bestPaths = this.getGraph()
        .getCytoGraph(this)
        .data("bestPaths");
      this.getGraph().markBestEdges(bestPaths[this.optimizationSelection]);

      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationSelection", this.optimizationSelection);

      if (this.optimizationSelection != 0) {
        dialogComponent.dialogSuccess(
          this.optimizationSelection +
            1 +
            ". alternative Optimierung wurde markiert"
        );
      } else {
        dialogComponent.dialogSuccess("Beste Optimierung wurde markiert");
      }
    },

    startOptimization() {
      this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.graphInfo.startOptimizing();
      this.optimizationSelection = 0;
    },

    // get Settings
    getOptimizeSettings() {
      // get optimize option
      if (
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationOption") == "optionTime"
      ) {
        this.optimizationOption = "Zeit";
      } else {
        this.optimizationOption = "Kosten";
      }
      this.optimizationOptionItems = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationOptionItems");
      // get start & end
      this.startSelect = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationStartNames");
      this.endSelect = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationStartEndName");
      // get optimization number
      this.optimizationNumber = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationNumber");
      this.optimizationSelection = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationSelection");
    },

    // apply settings to cytoscape element
    setOptimizeSettings() {
      // set optimize Option
      if (this.optimizationOption == "Zeit") {
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationOption", "optionTime");
      } else {
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationOption", "optionCost");
      }
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationOptionItems", this.optimizationOptionItems);
      // start & end
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationStartNames", this.startSelect);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationStartEndName", this.endSelect);

      // set StartIDs for Optimization Algorithm
      let startIDs = [];
      this.getNodeItemsID()
      for (let i = 0; i < this.startSelect.length; i++) {

        let indexStart = this.itemsName.indexOf(this.startSelect[i]);

        startIDs.push(this.itemsID[indexStart]);
      }

      this.getGraph()
        .getCytoGraph()
        .data("settingsOptimizationStartIDs", startIDs);

      // set endID for Optimization Algorithm

      let indexEnd = this.itemsName.indexOf(this.endSelect);
      let endID = this.itemsID[indexEnd];
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationEndID", endID);

      // set optimization number
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationNumber", this.optimizationNumber);

      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationSelection", this.optimizationSelection);

      // remove optimization
      this.getGraph().removeOptimization();
      this.rankArray = [];

    },

    getNodeItemsID() {
      this.itemsID = this.getGraph().getNodeID(this.getGraph());
    },

    getNodeItemsName() {
      //get the nodeNames to show in settings

      this.itemsName = this.getGraph().getNodeName(this.getGraph());


      let start = []

      let selectNodes = this.getGraph()
        .getCytoGraph()
        .data("settingsOptimizationStartIDs");

      let nodes = []



      for(let i = 0; i < selectNodes.length; i++){

        if(selectNodes[i] != "" && selectNodes[i] != undefined){

          nodes.push(selectNodes[i])
        }
      }

      for (let i = 0; i < nodes.length; i++) {

        start.push(
          this.getGraph()
            .getCytoGraph()
            .nodes("#" + nodes[i])
            .data("name")
        );
      }

      this.endSelect = this.getGraph()
        .getCytoGraph()
        .nodes(
          "#" +
            this.getGraph()
              .getCytoGraph()
              .data("settingsOptimizationEndID")
        )
        .data("name");

        this.startSelect = start;

    },

    getOption() {
      if(this.getGraph().getCytoGraph().data("settingsOptimizationOption") == "optionTime") {
        this.optimizationOption = 'Zeit';
      }
      else {
        this.optimizationOption = 'Kosten';
      }
    }

  }

};
</script>
