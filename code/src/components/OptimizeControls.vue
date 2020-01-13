
<template>
  <v-container class="optimize-container" fillwidth>
    <div class="optimize-controls">
      <v-card align="center">
        <v-row>
          <p class="headline ma-auto">Optimieren</p>
          <v-dialog v-model="dialog" max-width="350">
            <template v-slot:activator="{ on }">
              <v-btn class="btn-settings" v-on="on" text icon color="lightgrey">
                <v-icon>mdi-settings</v-icon>
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
                <v-btn color="green darken-1" text @click="dialog = false" @focus='optimizing()'>Anwenden</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row align="center">
          <div class="switch-container">
            <p class="switch-text-left">Zeit</p>
            <v-switch v-bind="optimizingOption" class="switch-button" color="primary" flat inset @change="changeOption(); optimizing()" ></v-switch>
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

import graph from "../vargraph";

export default {
  name: "OptimizeControls",
  data() {
    return {
      optimizingOption: "optionTime",
      itemsName: [""],
      itemsID: [""],
      dialog: false,
      startSelect: "",
      endSelect: ""
    };
  },
  methods: {

    changeOption: function(){
    
      if(this.optimizingOption === "optionTime"){
        this.optimizingOption = "optionCosts"

      }
      else{
        this.optimizingOption = "optionTime"
      }
    },
    getNodeItemsID() {
      this.itemsID = graph.getNodeID();
    },
    getNodeItemsName() {
      this.itemsName = graph.getNodeName();
    },
    optimizing: function() {

      let startIDs = []
      for(let i=0; i<this.startSelect.length; i++){
        let indexStart = this.itemsName.indexOf(this.startSelect[i])
        startIDs.push(this.itemsID[indexStart])
        
      }
      
      let indexEnd = this.itemsName.indexOf(this.endSelect);
      let endID = this.itemsID[indexEnd];

      graph.findPath(this.optimizingOption, startIDs, endID)

    }
  }
};
</script>