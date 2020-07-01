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
              :counter="30"
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
            <v-btn color="grey" text id="download-menu-cancel" @click="closeDialog()">Abbrechen</v-btn>
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
      formatname: [".json", ".png", ".jpg"],
      filename: "",
      validLocal: true,
      name: "",
      nameRules: [
        v => !!v || "Downloadname ist erforderlich",
        v =>
          (v && v.length <= 30) ||
          "Downloadname muss kürzer als 30 Zeichen sein"
      ]
    };
  },

  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },
    download() {
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
        this.closeDialog();
        this.checkNewGraph();
      }
    },
    clearFields() {
      this.filename = "";
      this.$refs.formLocal.reset();
      this.$refs.formLocal.resetValidation();
    },
    closeDialog() {
      this.clearFields();
      this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.setdialog(
        false
      );
    },
    openHelpDialog() {
      dialogComponent.dialogInfo(
        "Wähle das Format <b>.json</b> aus, wenn du den VarGraph später wieder über die Import-Funktion in die Anwendung laden willst. <br /> <br /> Wähle <b>.png</b> oder <b>.jpg</b> aus, um den VarGraph als Bild herunterzuladen.",
        15000
      );
    },
    checkNewGraph() {
      // check dialog was opened by new Graph menu
      if (
        this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.getNewGraph()
      ) {
        // continue with newGraph function
      /*this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs[
          "newGraphMenu"
        ].discard();*/
        this.$store.commit("setDownload",1);
        this.$store.commit("resetGraph");  // After Download Graph will be reseted
        this.$router.replace("/");        //Loadingscreen will take us to home/menu
      }
    }
  }
};
</script>
