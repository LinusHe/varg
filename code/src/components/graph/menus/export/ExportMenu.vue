<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="export-dialog hueshift" id="export-menu">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <h1>Exportieren</h1>
      </v-card-title>
      <v-tabs centered v-model="activeTab">
        <v-tab id="tab-localExport">
          <v-icon left>mdi-file-download</v-icon>Lokal
        </v-tab>
        <v-tab id="tab-dbExport">
          <v-icon left>mdi-database-import</v-icon>Datenbank
        </v-tab>

        <v-tab-item>
          <exportDownload ref="exportDownload" />
        </v-tab-item>
        <v-tab-item>
          <exportDatabase ref="exportDatabase" />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import fileManager from "../../../../vargraph/importExport/FileManager.js";
import ExJSon from "../../../../vargraph/JSonPersistence.js";

// components
import exportDownload from "./ExportDownload";
import exportDatabase from "./ExportDatabase";

let dialogComponent;

export default {
  name: "ExportMenu",
  components: {
    exportDownload,
    exportDatabase
  },
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
  },
  data() {
    return {
      dialog: false,
      activeTab: -1,
      newGraph: false
    };
  },

  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    setActiveTab(int) {
      // 0: Lokal
      // 1: Datenbank
      this.activeTab = int;
    },
    setNewGraph(bool) {
      this.newGraph = bool;
    },
    getNewGraph() {
      return this.newGraph;
    },
    setdialog(boolean) {
      this.dialog = boolean;
    }
  }
};
</script>
