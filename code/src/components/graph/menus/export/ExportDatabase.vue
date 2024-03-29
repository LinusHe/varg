<template>
  <v-card flat id="save-menu">
    <v-card-text>
      <v-form ref="formDB" v-model="validDB" lazy-validation v-on:submit.prevent="uploadGraph()">
        <v-row class="ml-2 mt-4 mr-2">
          <p>
            Unter folgendem Namen kann der aktuelle Graph
            <b>in der Datenbank</b> gespeichert werden. Über das Menü 'Datenbank' kann er wieder geladen werden.
          </p>
        </v-row>
        <v-row class="ml-2 mt-n5 mr-2 mb-12">
          <v-col sm="12">
            <v-text-field
              class="mt-6"
              id="DatabaseName"
              label="Dateiname"
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
              @click="uploadGraph()"
            >Speichern</v-btn>
          </v-col>
          <v-col sm="4">
            <v-btn color="grey" text id="save-menu-cancel" @click="closeDialog()">Abbrechen</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-dialog v-model="overwriteDialog" persistent max-width="400">
      <v-card id="overwriteDialog">
        <v-card-title class="headline">{{DataBaseName}} überschreiben?</v-card-title>
        <v-card-text>
          Der Graph
          <b>{{DataBaseName}}</b> ist bereits in der Datenbank enthalten.
          <br />Soll der Graph
          <b>{{DataBaseName}}</b> überschrieben werden? Diese Aktion kann nicht rückgängig gemacht werden.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" id="overwriteOK" text @click="confirmOverwrite(DataBaseName)">Überschreiben</v-btn>
          <v-btn color="grey" id="overwriteCancel" text @click="clearFields()">Abbrechen</v-btn>
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
import axios from 'axios';

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
        v => !!v || "Dateiname ist erforderlich",
        v =>
          (v && v.length <= 25) ||
          "Dateiname darf maximal 25 Zeichen lang sein"
      ],
      validDB: true,
      DataBaseName: "",
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
    // requesting to post a graph to the DB
    uploadGraph() {
      // Checks if menu formular was filled in correctly
      if (this.$refs.formDB.validate()) {
        dialogComponent.dialogInfo('Graph wird hochgeladen, bitte warte einen Augenblick...');
        const CONTENT = ExJSon.CreateJSon(this.getGraph()); // creating a json object containing the current cytoscape instance with JSonPersistence.js
        axios // axios.post request
          .post('http://192.168.99.101:1110/VarG/graph', {
            // appending different data to save in the DB
            name: this.DataBaseName,  // name aka fileName in the DB
            user: this.$store.state.user.name,  // user aka userName
            json: JSON.stringify(CONTENT) // json aka graphObject
          })
          .then(response => {
            this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.databaseMenu.$refs.databaseGUI.loadItems();  // refreshing the graph-items array to add the posted graph to the list
            this.closeDialog(); // closing the DB menu
            dialogComponent.dialogSuccess('Graph erfolgreich in Datenbank hochgeladen');
            this.checkNewGraph(); // check if the upload menu was opened from the newgraph menu
          })
          .catch(error => {
            if (error.message === 'Request failed with status code 403') {
              this.overwriteDialog = true;
              dialogComponent.dialogInfo('Bitte folge den Anweisungen in dem neuen Fenster');
            }
            else { dialogComponent.dialogError('Hochladen fehlgeschlagen: <b>Ein Fehler ist aufgetreten</b> - bitte versuche es später erneut oder wende dich an einen Admin'); }
          });
      }
    },
    // requesting to overwrite the graph with the given name in the DB
    confirmOverwrite(fileName) {
      const URL = 'http://192.168.99.101:1110/VarG/graph/' + fileName;
      const CONTENT = ExJSon.CreateJSon(this.getGraph());
      axios // axios.put request
        .put(URL, {
          user: this.$store.state.user.name,
          role: this.$store.state.user.role,
          author: this.$store.state.user.name,  // theoretically we don't actually need the author in this request, but the API needs it if the user is an admin
          json: JSON.stringify(CONTENT)
        })
        .then(response => {
          this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.databaseMenu.$refs.databaseGUI.loadItems();
          this.closeDialog();
          dialogComponent.dialogSuccess('Graph erfolgreich in der Datenbank überschrieben');
          this.checkNewGraph();
        })
        .catch(error => {
          dialogComponent.dialogError('Hochladen fehlgeschlagen: <b>Ein Fehler ist aufgetreten</b> - bitte versuche es später erneut oder wende dich an einen Admin');
        });
    },
    checkNewGraph() {
      // check if dialog was opened from newgraph menu
      if (this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.getNewGraph()) {
        // continue with newGraph function
        this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.newGraphMenu.discard();
      }
    }
  }
};
</script>
