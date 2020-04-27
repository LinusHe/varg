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
                data-cy="formatselect"
              ></v-select>
            </v-col>
            <v-col sm="1" class="mt-5">
              <v-icon @click="openHelpDialog()">mdi-help-circle-outline</v-icon>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col sm="3">
              <v-btn
                color="green darken-1"
                text
                :disabled="!valid"
                id="download-menu-save"
                @click="download"
              >Download</v-btn>
            </v-col>
            <v-col sm="4">
              <v-btn
                color="grey"
                text
                id="download-menu-cancel"
                @click="clearFields"
              >Abbrechen</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import fileManager from "@/vargraph/importExport/FileManager.js";
let dialogComponent;

export default {
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
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
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
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
            fileManager.saveGraphAsJson(
              this.getGraph().getCytoGraph(this.getGraph()),
              this.filename
            );
            break;

          case ".png":
            fileManager.saveGraphAsPng(
              this.getGraph().getCytoGraph(this.getGraph()),
              this.filename
            );
            break;

          case ".jpg":
            fileManager.saveGraphAsJpg(
              this.getGraph().getCytoGraph(this.getGraph()),
              this.filename
            );
            break;

          default:
            alert("Sorry, hier fehlt noch was!");
            break;
        }
        dialogComponent.dialogInfo("Datei wird heruntergeladen...");
        this.clearFields();
      }
    },
    clearFields: function() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialog = false;
    },
    openHelpDialog() {
      dialogComponent.dialogInfo(
        "Wähle das Format <b>.json</b> oder<b>.xml</b> aus, um den Graphen in einem Format herunterzuladen, welches du später wieder im Editor importieren kannst. <br /> <br /> Wähle<b>.png</b> oder<b>.svg</b> aus, um den Graphen in einem Bildvormat herunterzuladen."
      );
    }
  }
};
</script>