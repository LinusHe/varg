<template>
  <v-card flat>
    <v-card-text class="scrolling-container pb-10">
      <v-card-subtitle>Grundeinstellungen</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-divider></v-divider>
        <v-row>
          <v-col sm="9">
            <v-card-text>Optimieren nach:</v-card-text>
          </v-col>
          <v-col sm="3">
            <v-select
              class="pr-8"
              hide-details
              v-model="optimizingSelection"
              :items="optimizingOptions"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="9">
            <v-card-text>Startzustand</v-card-text>
          </v-col>
          <v-col sm="3">
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
        <v-row>
          <v-col sm="9">
            <v-card-text>Startzustand</v-card-text>
          </v-col>
          <v-col sm="3">
            <v-select
              class="pr-8"
              @focus="getNodeItemsID(); getNodeItemsName()"
              hide-details
              v-model="endSelect"
              :items="itemsName"
            ></v-select>
          </v-col>
        </v-row>
      </v-card>

      <v-card-subtitle class="mt-10 pb-0">Alternative Optimierungswege</v-card-subtitle>
      <!-- <v-card class="mr-6 ml-6 mt-0"> -->
        <v-row class="ma-0">
          <v-col sm="12" class="ma-0 pa-0">
            <v-radio-group v-model="radios" :mandatory="false" class="ml-6 mr-6">
              <template>
                <v-expansion-panels hover accordion>
                  <v-expansion-panel v-for="(item,i) in 5" :key="i">
                    <v-expansion-panel-header>
                      <v-radio :value="key">
                        <template v-slot:label>
                          <div>
                            <strong>Kosten:</strong> 10€,
                            <strong>Zeit:</strong> 10s
                          </div>
                        </template>
                      </v-radio>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="ml-8">Weg: A - B - C - B - A</v-expansion-panel-content>
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
  },
  data: () => ({
    optimizingSelection: "Zeit",
    optimizingOptions: ["Zeit", "Kosten"],
    itemsName: [""],
    itemsID: [""],
    startSelect: "",
    endSelect: ""
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },

    // get Settings
    getOptimizeSettings() {
      // ...
    },

    // apply settings to cytoscape element
    setOptimizeSettings() {
      // ...
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
