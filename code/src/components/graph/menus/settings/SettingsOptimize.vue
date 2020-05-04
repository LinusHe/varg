<template>
  <v-card flat>
    <v-card-text class="scrolling-container pb-10">
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

      <v-card-subtitle class="mt-10 pb-0">Alternative Optimierungswege</v-card-subtitle>
      <!-- <v-card class="mr-6 ml-6 mt-0"> -->
      <v-row class="ma-0">
        <v-col sm="12" class="ma-0 pa-0">
          <v-radio-group v-model="optimizationSelection" :mandatory="false" class="ml-6 mr-6">
            <template>
              <v-expansion-panels hover accordion>
                <v-expansion-panel v-for="(item,i) in optimizationNumber" :key="i">
                  <v-expansion-panel-header>
                    <v-radio color="primary" :value="i">
                      <template v-slot:label>
                        <v-card-text class="ma-0 pa-0 pt-1">
                          <strong>Kosten:</strong> 10€,
                          <strong>Zeit:</strong> 10s
                        </v-card-text>
                      </template>
                    </v-radio>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="ml-8">
                    <v-card-text>Weg: A - B - C - B - A</v-card-text>
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
  },
  data: () => ({
    optimizationOption: "Zeit",
    optimizationOptionItems: ["Zeit", "Kosten"],
    itemsName: [""],
    itemsID: [""],
    startSelect: "",
    endSelect: "",
    optimizationNumber: 4,
    optimizationSelection: 0
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
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
      // get start & end (default is -1 -> no selection)
      if (
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartID") !== -1
      ) {
        this.startSelect = this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartID");
      }
      if (
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartEndID")
      ) {
        this.endSelect = this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartEndID");
      }
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
      if (this.startSelect === "") {
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartID", -1);
      }
      if (this.endSelect === "") {
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartEndID", -1);
      }
      // set optimization number
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationNumber", this.optimizationNumber);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationSelection", this.optimizationSelection);
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
