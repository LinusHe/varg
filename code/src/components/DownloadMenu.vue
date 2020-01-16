<template>
  <v-dialog v-model="dialog" max-width="450">
    <v-card>
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
                @focus="getFormat()"
                required
                v-model="format"
                :items="formatname"
                :rules="[v => !!v || 'Dateiformat muss gewählt werden']"
                label="Format"
              ></v-select>
            </v-col>
            <v-col sm="1" class="mt-4">
              <v-icon @click="helpDialog = true">mdi-help</v-icon>
              <v-snackbar color="#ffffff" multi-line v-model="helpDialog" timeout=10000>
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
          <v-row>
            <v-col sm="6">
              <v-btn color="success" :disabled="!valid" outlined @click="download">Download</v-btn>
            </v-col>
            <v-col sm="6">
              <v-btn color="error" outlined @click="clearFields">Abbrechen</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-snackbar color="success" v-model="successDialog" timeout=2000>
          Download Erfolgreich!
        </v-snackbar>
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
    formatname: [],
    filename: "",
    helpDialog: false,
    successDialog: false,
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Downloadname ist erforderlich",
      v =>
        (v && v.length <= 10) || "Downloadname muss kürzer als 10 Zeichen sein"
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.helpDialog = true;
      }
    },
    setdialog: function(boolean) {
      this.dialog = boolean;
    },
    download: function() {
      // Check form inputs
      if (this.$refs.form.validate()) {
        // generate filename
        switch (this.format) {
          case ".json":
            importExport.saveJson(graph.getCytoGraph(), this.filename);
            break;

          case ".png":
            importExport.saveGraphAsPng(graph.getCytoGraph(), this.filename);
            break;

          default:
            alert("Sorry, hier fehlt noch was!")
            break;
        }
        this.successDialog = true;
        this.clearFields();
      }
    },
    getFormat: function() {
      this.formatname.push(".json");
      this.formatname.push(".xml");
      this.formatname.push(".png");
      this.formatname.push(".svg");
    },
    clearFields: function() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialog = false;
    }
  }
};
</script>