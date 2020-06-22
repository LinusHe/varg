<template>
  <v-card flat>
    <v-card-text class="scrolling-container pb-10" style="max-height: 55vh">
      <v-card-subtitle>Grundeinstellungen</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-row>
          <v-col sm="10">
            <v-card-text>Bearbeitungsschritte nach Raster ausrichten</v-card-text>
          </v-col>
          <v-col sm="2">
            <v-switch
              v-model="gridSnap"
              hide-details
              class="mt-3"
            ></v-switch>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col sm="9">
            <v-card-text>Kosteneinheit für Verknüpfungen</v-card-text>
          </v-col>
          <v-col sm="3">
            <v-select class="pr-8" hide-details v-model="unitCostSelection" :items="unitCostItems"></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col sm="9">
            <v-card-text>Zeiteinheit für Verknüpfungen</v-card-text>
          </v-col>
          <v-col sm="3">
            <v-select class="pr-8" hide-details v-model="unitTimeSelection" :items="unitTimeItems"></v-select>
          </v-col>
        </v-row>
      </v-card>

      <v-card-subtitle class="mt-10">Verknüpfungsdarstellung</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-row>
          <v-col sm="9">
            <v-card-text v-bind:style="{ color: '#'+disabledColor }">Titel der Verknüpfungen:</v-card-text>
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
            >Losgröße anzeigen</v-card-text>
          </v-col>
          <v-col sm="2">
            <v-switch
              v-model="lotsizeShow"
              ref="lotsizeShow"
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
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "GraphSettings",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
    this.getGraphSettings();
  },
  data: () => ({
    disabledColor: "000000de",
    // Unit Settings
    unitCostItems: ["cent", "€", "$", "£"],
    unitCostSelection: "€",
    unitTimeItems: ["Sekunden", "Minuten", "Stunden", "Tage"],
    unitTimeSelection: "Sekunden",
    // Edge Settings
    edgeShowShortOnly: false,
    lotsizeShow: true,
    edgeShowCost: true,
    edgeShowTime: true,
    edgeShowSuCost: true,
    edgeShowSuTime: true,
    edgeTitleItems: ["Name", "Kürzel"],
    edgeTitleSelection: "Name",
    gridSnap: false
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },
    changeShortOnly() {
      if (this.edgeShowShortOnly === true) {
        this.edgeTitleSelection = "Kürzel";
        this.lotsizeShow = false;
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
      this.lotsizeShow = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsEdgeShowLotSize");
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
      this.gridSnap = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("gridSnap");
      this.changeShortOnly();
    },

    // apply settings to cytoscape element
    setGraphSettings() {
      console.log(
        "old settings: ",
        this.getGraph()
          .getCytoGraph()
          .data()
      );
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
        .data("settingsEdgeShowLotSize", this.lotsizeShow);
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
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("gridSnap", this.gridSnap);
      this.getGraph().setGridSnap(this.getGraph())
      console.log(
        "new settings: ",
        this.getGraph()
          .getCytoGraph()
          .data()
      );
    }
  }
};
</script>
