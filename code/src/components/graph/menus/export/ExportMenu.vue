<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="export-dialog" id="export-menu">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <h1>Exportieren</h1>
      </v-card-title>
      <v-tabs centered>
        <v-tab>
          <v-icon left>mdi-desktop-mac</v-icon>Lokal
        </v-tab>
        <v-tab>
          <v-icon left>mdi-database</v-icon>Datenbank
        </v-tab>

        <v-tab-item>
          <exportDownload />
        </v-tab-item>
        <v-tab-item>
          <exportDatabase />
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
import exportDownload from "./ExportDownload"
import exportDatabase from "./ExportDatabase"

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
      format: "",
      formatname: [".json", ".xml", ".png", ".svg", ".jpg"],
      filename: "",
      helpDialog: false,
      helpTimeout: 10000,
      successDialog: false,
      successTimeout: 2000,
      validLocal: true,
      name: "",
      nameRules: [
        v => !!v || "Downloadname ist erforderlich",
        v =>
          (v && v.length <= 10) ||
          "Downloadname muss kürzer als 10 Zeichen sein"
      ],
      validDB: true,
      DataBaseName: "",
      label: "Datenbankname",
      message:
        "Unter folgendem Namen kann der aktuelle Graph <b>in der Datenbank</b> gespeichert werden. Über das Menü 'Datenbank' kann er wieder geladen werden.",
      btntext: "Speichern",
      database: this.$parent.$parent.$refs["vargraph"].vars.testDatabase
    };
  },

  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    setdialog(boolean) {
      this.dialog = boolean;
    },
  }
};
</script>
