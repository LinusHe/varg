<template>
  <v-card flat id="save-menu">
    <v-card-text>
      <v-form ref="formDB" v-model="validDB" lazy-validation>
        <v-row class="ml-2 mt-4 mr-2">
          <p>
            Unter folgendem Namen kann der aktuelle Graph
            <b>in der Datenbank</b> gespeichert werden. Über das Menü 'Datenbank' kann er wieder geladen werden.
          </p>
        </v-row>
        <v-row class="ml-2 mt-0 mr-2 mb-12">
          <v-col sm="12">
            <v-text-field
              class="mt-6"
              id="DatabaseName"
              label="Datenbankname"
              v-model="DataBaseName"
              required
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col sm="3">
            <v-btn
              color="green darken-1"
              text
              :disabled="!validDB"
              id="save-menu-save"
              @click="saveDB"
            >Speichern</v-btn>
          </v-col>
          <v-col sm="4">
            <v-btn color="grey" text id="save-menu-cancel" @click="closeDialog()">Abbrechen</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-dialog v-model="overwriteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{DataBaseName}} überschreiben?</v-card-title>
        <v-card-text>
          Der Graph
          <b>{{DataBaseName}}</b> ist bereits in der Datenbank enthalten.
          <br />Soll der Graph
          <b>{{DataBaseName}}</b> überschrieben werden? Diese Aktion kann nicht rückgängig gemacht werden.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="confirmOverwrite()">Überschreiben</v-btn>
          <v-btn color="grey" text @click="clearFields()">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  name: "ExportMenu",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      nameRules: [
        v => !!v || "Datenbankname ist erforderlich",
        v =>
          (v && v.length <= 20) ||
          "Datenbankname muss kürzer als 20 Zeichen sein"
      ],
      validDB: true,
      DataBaseName: "",
      database: this.getGraph().vars.testDatabase,
      overwriteDialog: false
    };
  },

  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },
    clearFields() {
      this.DataBaseName = "";
      this.$refs.formDB.reset();
      this.$refs.formDB.resetValidation();
      this.overwriteDialog = false;
    },
    closeDialog() {
      this.clearFields();
      this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.setdialog(
        false
      );
    },
    saveDB() {
      //Checks if menu formular was filled in correctly
      if (this.$refs.formDB.validate()) {
        // update cytoscape filename
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("filename", this.DataBaseName);

        // get json
        let content = ExJSon.CreateJSon(this.getGraph());

        if (this.database.save(content, false)) {
          this.closeDialog();
          dialogComponent.dialogSuccess("Graph erfolgreich gespeichert");
          this.checkNewGraph();
        } else {
          // database.save(..) returns false if graph exists
          this.overwriteDialog = true;
        }
      }
    },
    confirmOverwrite() {
      // get json
      let content = ExJSon.CreateJSon(this.getGraph());
      // force overwrite
      this.database.save(content, true);

      this.closeDialog();
      dialogComponent.dialogSuccess("Graph erfolgreich überschrieben");

      this.checkNewGraph();
    },
    checkNewGraph() {
      // check dialog was opened by new Graph menu
      if (
        this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.getNewGraph()
      ) {
        // continue with newGraph function
        this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs[
          "newGraphMenu"
        ].discard();
      }
    }
  }
};
</script>
