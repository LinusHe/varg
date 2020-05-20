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
          <v-btn color="error" id="overwriteOK" text @click="confirmOverwrite(hashkey)">Überschreiben</v-btn>
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
      database: this.getGraph().vars.testDatabase,
      overwriteDialog: false,
      hashkey: -1
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

      // copy pasted hash generator (TODO remove when primary key is changed from fileId to userName+fileName)
      String.prototype.hashCode = function() {
        var hash = 0;
        if (this.length == 0) {
          return hash;
        }
        for (var i = 0; i < this.length; i++) {
          var char = this.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
      }

      // Checks if menu formular was filled in correctly, then makes an axios.post request
      if (this.$refs.formDB.validate()) {
        const CONTENT = ExJSon.CreateJSon(this.getGraph());
        this.hashkey = this.DataBaseName.hashCode();
        axios
          .post('http://192.168.1.102:1110/VarG/graph', {
            fileId: this.hashkey,
            filename: this.DataBaseName,
            user: 'eheldt', // TODO replace with actual login info
            json: JSON.stringify(CONTENT)
          })
          .then(response => {
            this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.databaseMenu.$refs.databaseGUI.loadItems();
            this.closeDialog();
            dialogComponent.dialogSuccess('Graph erfolgreich in Datenbank hochgeladen');
            this.checkNewGraph(); // TODO what does this do?
          })
          .catch(error => {
            /* TODO to use these error distinctions, the API must return proper errors instead of ERR_EMPTY_RESPONSE

            if (error.response) {
              console.log(error.response)*/
              this.overwriteDialog = true;  // TODO check if error.response actually says duplicate key error, if not then show varg-dialog with "Hochladen fehlgeschlagen"
            /*}
            else if (error.request) {
              console.log(error.request)
              dialogComponent.dialogError('Hochladen fehlgeschlagen: <b>Konnte nicht zum Server verbinden</b>');
            }
            else {
              dialogComponent.dialogError('Hochladen fehlgeschlagen: <b>Unbekannter Fehler</b>');
            }*/
          }); 
          
        /* TODO remove code for TestDatabase.js
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
        }*/
      }
    },
    confirmOverwrite(fileId) {
      // get json
      const URL = 'http://192.168.1.102:1110/VarG/graph/' + fileId;
      const CONTENT = ExJSon.CreateJSon(this.getGraph());
      axios
        .put(URL, {
          user: 'eheldt', // TODO replace with actual login info
          json: JSON.stringify(CONTENT)
        })
        .then(response => {
          this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.databaseMenu.$refs.databaseGUI.loadItems();
          this.closeDialog();
          dialogComponent.dialogSuccess('Graph erfolgreich in der Datenbank überschrieben');
          this.checkNewGraph(); // TODO what does this do?
        })
        .catch(error => {
          dialogComponent.dialogError('Hochladen fehlgeschlagen: <b>Unbekannter Fehler</b>');
        });

      /* TODO remove code for TestDatabase.js
      // force overwrite
      this.database.save(content, true);

      this.closeDialog();
      dialogComponent.dialogSuccess("Graph erfolgreich überschrieben");

      this.checkNewGraph();*/
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
