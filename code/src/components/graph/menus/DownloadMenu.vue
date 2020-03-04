<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card id="download-menu">
      <v-card-title class="headline">Lade den Graph herunter</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col sm="8" align="right">
              <v-text-field
                id="fileName"
                required
                label="Name"
                v-model="filename"
                :counter="10"
                :rules="nameRules"
                lazy-validation
              ></v-text-field>
            </v-col>
            <v-col sm="3">
              <v-select
                id="formatselect"
                required
                v-model="format"
                :items="formatname"
                :rules="[v => !!v || 'Dateiformat muss gewählt werden']"
                label="Format"
              ></v-select>
            </v-col>
            <v-col sm="1" class="mt-5">
              <v-icon @click="helpDialog = true">mdi-help-circle-outline</v-icon>
              <v-snackbar color="#ffffff" :timeout="helpTimeout" multi-line v-model="helpDialog">
                <p style="color: #000000">
                  <br />Wähle das Format
                  <b>.json</b> oder
                  <b>.xml</b> aus, um den Graphen in einem Format herunterzuladen, welches du später wieder importieren kannst.
                </p>
                <p style="color: #000000">
                  <br />Wähle
                  <b>.png</b> oder
                  <b>.svg</b> aus, um den Graphen in einem Bildvormat herunterzuladen.
                </p>
                <v-btn color="primary" text @click="helpDialog = false">Schließen</v-btn>
              </v-snackbar>
            </v-col>
          </v-row>
          <v-row class="mt-8">
            <v-col sm="6">
              <v-btn color="success" block :disabled="!valid" outlined id="download-menu-save" @click="download">Download</v-btn>
            </v-col>
            <v-col sm="6">
              <v-btn color="error" block outlined id="download-menu-cancel" @click="clearFields">Abbrechen</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import importExport from "@/vargraph/importExport.js";
import graph from "@/vargraph/index.js";

/* eslint-disable no-console */
export default {
  data: () => ({
    dialog: false,
    format: "",
    formatname: [".json", ".xml", ".png", ".svg", ".jpg"],
    filename: "",
    helpDialog: false,
    helpTimeout: 10000,
    successDialog: false,
    successTimeout: 2000,
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Downloadname ist erforderlich",
      v =>
        (v && v.length <= 10) || "Downloadname muss kürzer als 10 Zeichen sein"
    ]
  }),

  methods: {
    setdialog: function(boolean) {
      this.dialog = boolean;
    },
    download: function() {
      // Check form inputs
      if (this.$refs.form.validate()) {
        // generate filename
        switch (this.format) {
          case ".json":
            importExport.saveGraphAsJson(graph.getCytoGraph(), this.filename);
            break;

          case ".png":
            importExport.saveGraphAsPng(graph.getCytoGraph(), this.filename);
            break;

          case ".jpg":
            importExport.saveGraphAsJpg(graph.getCytoGraph(), this.filename);
            break;

          default:
            alert("Sorry, hier fehlt noch was!");
            break;
        }
        this.clearFields();
      }
    },
    clearFields: function() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialog = false;
    }
  }
};
</script>