<template>
  <v-card flat id="download-menu">
    <v-card-text>
      <v-form ref="formLocal" v-model="validLocal" lazy-validation>
        <v-row class="ml-2 mt-4 mr-2">
          <p>
            Speichere den Graphen in einem Format deiner Wahl
            <b>lokal auf deinem Rechner</b> ab. Je nach gewähltem Format kann der Graph wieder importiert werden.
          </p>
        </v-row>
        <v-row class="ml-2 mt-0 mr-2 mb-12">
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
              :disabled="!validLocal"
              id="download-menu-save"
              @click="download"
            >Download</v-btn>
          </v-col>
          <v-col sm="4">
            <v-btn color="grey" text id="download-menu-cancel" @click="clearFields">Abbrechen</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import fileManager from "../../../../vargraph/importExport/FileManager.js";
import ExJSon from "../../../../vargraph/JSonPersistence.js";

let dialogComponent;

export default {
  name: "ExportDownload",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      format: "",
      formatname: [".json", ".xml", ".png", ".svg", ".jpg"],
      filename: "",
      validLocal: true,
      name: "",
      nameRules: [
        v => !!v || "Downloadname ist erforderlich",
        v =>
          (v && v.length <= 10) ||
          "Downloadname muss kürzer als 10 Zeichen sein"
      ]
    };
  },

  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },
    download() {
      console.log(this.getGraph());
      dialogComponent.dialogInfo("test");
      // Check form inputs
      if (this.$refs.formLocal.validate()) {
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
    clearFields() {
      this.DataBaseName = "";
      // catch undefined form:
      // if one of the tabs arent selected yet -> the form is undefined
      if (typeof this.$refs.formLocal !== "undefined") {
        this.$refs.formLocal.reset();
        this.$refs.formLocal.resetValidation();
      }
      if (typeof this.$refs.formDB !== "undefined") {
        this.$refs.formDB.reset();
        this.$refs.formDB.resetValidation();
      }
      this.dialog = false;
    },
    openHelpDialog() {
      dialogComponent.dialogInfo(
        "Wähle das Format <b>.json</b> oder<b>.xml</b> aus, um den Graphen in einem Format herunterzuladen, welches du später wieder im Editor importieren kannst. <br /> <br /> Wähle<b>.png</b> oder<b>.svg</b> aus, um den Graphen in einem Bildvormat herunterzuladen.",
        15000
      );
    }
  }
};
</script>
