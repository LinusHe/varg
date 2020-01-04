<template>
  <v-container class="optimize-container" fillwidth>
    <div class="optimize-controls">
      <v-card align="center">
        <v-row>
          <p class="headline ma-auto">Optimieren</p>
          <v-dialog v-model="dialog" persistent max-width="350">
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
                <v-select v-model="startSelect" :items="items" label="Startzustand"></v-select>
                <v-select v-model="endSelect" :items="items" label="Endzustand"></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">Anwenden</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row align="center">
          <div class="switch-container">
            <p class="switch-text-left">Zeit</p>
            <v-switch class="switch-button" color="primary" flat inset @change="changeOption"></v-switch>
            <p class="switch-text-right">Kosten</p>
          </div>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import graph from "../vargraph";

export default {
  name: "OptimizeControls",
  data() {
    return {
      option: "optionTime",
      items: [],
      dialog: false
    };
  },
  mounted() {
    this.items = graph.getNodes();
    graph.findPath(this.option);
  },
  methods: {
    changeOption: function() {
      if (this.option === "optionTime") {
        this.option = "optionCosts";
        graph.findPath(this.option, this.startSelect, this.endSelect);
      } else {
        this.option = "optionTime";
        graph.findPath(this.option, this.startSelect, this.endSelect);
      }
    }
  }
};
</script>