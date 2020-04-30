
<template>
  <v-container class="optimize-container">
    <div class="optimize-controls">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="headline">Optimierungs-Einstellungen</v-card-title>
          <v-card-text>
            <v-row>
              <p>
                Um den bestmöglichen Produktions-Weg zu finden, müssen Start und Endzustände ausgewählt werden,
                zwischen denen die Optimierungsfunktion angewendet werden soll:
              </p>
            </v-row>
            <v-row>
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
            </v-row>
            <v-row>
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
              @focus="optimizing()"
            >Anwenden</v-btn>
            <v-btn color="grey" text @click="dialog = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "OptimizeControls",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
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
      return this.$parent.$parent.$refs["vargraph"];
    },
    setDialog(boolean) {
      this.dialog = boolean;
    },
    getNodeItemsID() {
      this.itemsID = this.getGraph().getNodeID(this.getGraph());
    },
    getNodeItemsName() {
      this.itemsName = this.getGraph().getNodeName(this.getGraph());
    },
    optimizing() {
      let option;
      if (this.optimizingOption === false) {
        // True means option costs and false is option time
        option = "optionTime";
      } else {
        option = "optionCosts";
      }

      let startIDs = [];
      for (let i = 0; i < this.startSelect.length; i++) {
        let indexStart = this.itemsName.indexOf(this.startSelect[i]);
        startIDs.push(this.itemsID[indexStart]);
      }

      let indexEnd = this.itemsName.indexOf(this.endSelect);
      let endID = this.itemsID[indexEnd];

      if (startIDs.length === 0) {
        dialogComponent.dialogError(
          "Graph Optimierung fehlgeschlagen!<br /> Es wurde kein Startzustand angegeben. Lege einen Startknoten in den Optimierungs-Einstellungen fest.",
          7000
        );
      } else if (indexEnd === -1) {
        dialogComponent.dialogError(
          "Graph Optimierung fehlgeschlagen!<br /> Es wurde kein Endzustand angegeben. Lege einen Startknoten in den Optimierungs-Einstellungen fest.",
          7000
        );
      } else {
        console.log(indexEnd);
        this.getGraph().findPath(this.getGraph(), option, startIDs, endID);
        dialogComponent.dialogSuccess(
          "Graph wurde erfolgreich optimiert. Der beste Weg wird angezeigt. Weitere Wege können in den Optimierungs-Einstellungen aufgerufen werden.",
          7000
        );
      }
    }
  }
};
</script>
