<template>
  <v-dialog v-model="dialog" max-width="750">
    <v-card class="settings-dialog">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <h1>Einstellungen</h1>
      </v-card-title>
      <v-tabs centered>
        <v-tab>
          <v-icon class="rot-270" left>mdi-graph</v-icon>Graph
        </v-tab>
        <v-tab>
          <v-icon left>mdi-cog</v-icon>Allgemein
        </v-tab>
        <v-tab>
          <v-icon left>mdi-account</v-icon>Benutzer
        </v-tab>
        <v-tab>
          <v-icon left>mdi-help</v-icon>Hilfe
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text class="scrolling-container pb-10">
              <v-card-subtitle>Grundeinstellungen</v-card-subtitle>
              <v-card class="ml-6 mr-6">
                <v-row>
                  <v-col sm="9">
                    <v-card-text>Kosteneinheit für Verknüpfungen</v-card-text>
                  </v-col>
                  <v-col sm="3">
                    <v-select
                      class="pr-8"
                      hide-details
                      v-model="unitCostSelection"
                      :items="unitCostItems"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col sm="9">
                    <v-card-text>Zeiteinheit für Verknüpfungen</v-card-text>
                  </v-col>
                  <v-col sm="3">
                    <v-select
                      class="pr-8"
                      hide-details
                      v-model="unitTimeSelection"
                      :items="unitTimeItems"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card>

              <v-card-subtitle class="mt-10">Verknüpfungsdarstellung</v-card-subtitle>
              <v-card class="ml-6 mr-6">
                <v-row>
                  <v-col sm="9">
                    <v-card-text
                      v-bind:style="{ color: '#'+disabledColor }"
                    >Titel der Verknüpfungen:</v-card-text>
                  </v-col>
                  <v-col sm="3">
                    <v-select
                      class="pr-8 pt-2"
                      v-model="edgeTitleSelection"
                      :items="edgeTitleItems"
                      :disabled="edgeShowShortOnly"
                      hide-details
                      ref="edgeTitleItems"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col sm="10">
                    <v-card-text>Nur Kürzel in Verknüpfungen anzeigen</v-card-text>
                  </v-col>
                  <v-col sm="2">
                    <v-switch
                      v-model="edgeShowShortOnly"
                      @change="changeShortOnly()"
                      hide-details
                      class="mt-3"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col sm="10">
                    <v-card-text
                      v-bind:style="{ color: '#'+disabledColor }"
                    >Kosten / Stück in Verknüpfungen anzeigen</v-card-text>
                  </v-col>
                  <v-col sm="2">
                    <v-switch
                      v-model="edgeShowCost"
                      ref="edgeShowCost"
                      :disabled="edgeShowShortOnly"
                      hide-details
                      class="mt-3"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col sm="10">
                    <v-card-text
                      v-bind:style="{ color: '#'+disabledColor }"
                    >Zeit / Stück in Verknüpfungen anzeigen</v-card-text>
                  </v-col>
                  <v-col sm="2">
                    <v-switch
                      v-model="edgeShowTime"
                      ref="edgeShowTime"
                      :disabled="edgeShowShortOnly"
                      hide-details
                      class="mt-3"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col sm="10">
                    <v-card-text
                      v-bind:style="{ color: '#'+disabledColor }"
                    >Rüstkosten in Verknüpfungen anzeigen</v-card-text>
                  </v-col>
                  <v-col sm="2">
                    <v-switch
                      v-model="edgeShowSuCost"
                      ref="edgeShowSuCost"
                      :disabled="edgeShowShortOnly"
                      hide-details
                      class="mt-3"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col sm="10">
                    <v-card-text
                      v-bind:style="{ color: '#'+disabledColor }"
                    >Rüstzeit in Verknüpfungen anzeigen</v-card-text>
                  </v-col>
                  <v-col sm="2">
                    <v-switch
                      v-model="edgeShowSuTime"
                      ref="edgeShowSuTime"
                      :disabled="edgeShowShortOnly"
                      hide-details
                      class="mt-3"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-card>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="scrolling-container">
            <v-card-text>
              <p>
                Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae
                iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non
                adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
                leo. Nunc sed turpis.
              </p>

              <p>
                Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus,
                vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu
                tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit
                amet ligula pharetra condimentum.
              </p>

              <p>
                Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam
                commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu
                nunc.
              </p>

              <p>
                Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede.
                Duis leo. Fusce fermentum odio nec arcu.
              </p>

              <p class="mb-0">
                Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et,
                tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a,
                condimentum nec, nisi.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="scrolling-container">
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula
                sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna,
                posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor
                quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor
                in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="scrolling-container">
            <v-card-text>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula
                sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna,
                posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <p class="mb-0">
                Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor
                quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor
                in tellus interdum sagittis.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      <v-card-actions class="pr-5 pb-5 mt-3">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="dialog = false">Schließen</v-btn>
        <v-btn color="green darken-1" text @click="saveSettings()">Anwenden</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
let dialogComponent;

export default {
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data: () => ({
    dialog: false,
    disabledColor: "000000de",
    // Unit Settings
    unitCostItems: ["cent", "€", "$", "£"],
    unitCostSelection: "€",
    unitTimeItems: ["Millisekunden", "Sekunden", "Minuten", "Stunden", "Tage"],
    unitTimeSelection: "Sekunden",
    // Edge Settings
    edgeShowShortOnly: false,
    edgeShowCost: true,
    edgeShowTime: true,
    edgeShowSuCost: true,
    edgeShowSuTime: true,
    edgeTitleItems: ["Name", "Kürzel"],
    edgeTitleSelection: "Name"
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    openDialog() {
      this.getGraphSettings();
      this.changeShortOnly();
      this.dialog = true;
    },

    changeShortOnly() {
      if (this.edgeShowShortOnly === true) {
        this.edgeTitleSelection = "Kürzel";
        this.edgeShowCost = false;
        this.edgeShowTime = false;
        this.edgeShowSuCost = false;
        this.edgeShowSuTime = false;
        this.disabledColor = "bbbbbb";
      } else this.disabledColor = "000000de";
    },

    // get Settings from cytoscape element
    getGraphSettings() {
      // get unit Settings
      this.unitCostItems = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitCostItems");
      this.unitCostSelection = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitCostSelection");
      this.unitTimeItems = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitTimeItems");
      this.unitTimeSelection = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitTimeSelection");
      // get Edge Settings
      this.edgeShowShortOnly = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowShortOnly");
      this.edgeShowCost = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowCost");
      this.edgeShowTime = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowTime");
      this.edgeShowSuCost = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowSuCost");
      this.edgeShowSuTime = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowSuTime");
      this.edgeTitleItems = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeTitleItems");
      this.edgeTitleSelection = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeTitleSelection");
    },

    // apply settings to cytoscape element
    setGraphSettings() {
      // set unit Settings
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitCostItems", this.unitCostItems);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitCostSelection", this.unitCostSelection);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitTimeItems", this.unitTimeItems);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsUnitTimeSelection", this.unitTimeSelection);
      // set Edge Settings
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowShortOnly", this.edgeShowShortOnly);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowCost", this.edgeShowCost);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowTime", this.edgeShowTime);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowSuCost", this.edgeShowSuCost);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowSuTime", this.edgeShowSuTime);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeTitleItems", this.edgeTitleItems);
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeTitleSelection", this.edgeTitleSelection);
    },

    saveSettings() {
      console.log(this.unitCostSelection);
      console.log("Settings saved");
      console.log(
        "old settings: ",
        this.getGraph()
          .getCytoGraph()
          .data()
      );
      this.setGraphSettings();
      console.log(
        "new settings: ",
        this.getGraph()
          .getCytoGraph()
          .data()
      );
      this.getGraph().applySettings(this.getGraph());
      this.dialog = false;
      dialogComponent.dialogSuccess("Einstellungen erfolgreich gespeichert");
    }
  }
};
</script>
