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
              @focus="getNodeItemsID(); getNodeItemsName()"
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
      <!-- <v-card class="mr-6 ml-6 mt-0"> -->
      <v-row class="ma-0">
        <v-col sm="12" class="ma-0 pa-0">
          <v-radio-group v-model="optimizationSelection" :mandatory="false" class="ml-6 mr-6">
            <template>
              <v-expansion-panels hover accordion>
                <v-expansion-panel v-for="(rank, i) in rankArray" :key="i">
                  <v-expansion-panel-header>
                    <v-radio color="primary" :value="i">
                      <template v-slot:label>
                        <v-card-text class="ma-0 pa-0 pt-1">
                          {{i + 1}}. Platz | 
                          <strong>Kosten:</strong>
                          {{rank.cost}} €,
                          <strong>Zeit:</strong>
                          {{rank.time}} s
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

    applyRanking() {
      this.rankArray = [];
      let bestPaths = this.getGraph()
        .getCytoGraph(this)
        .data("bestPaths");

      for (let i = 0; i < bestPaths.length; i++) {
        let nextRank = {};
        nextRank.cost = this.getGraph().getTotalCost(bestPaths[i]);
        nextRank.time = this.getGraph().getTotalTime(bestPaths[i]);
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
    },

    getNodeItemsID() {
      this.itemsID = this.getGraph().getNodeID(this.getGraph());
    },

    getNodeItemsName() {
      this.itemsName = this.getGraph().getNodeName(this.getGraph());
    }
  }
};
</script>
