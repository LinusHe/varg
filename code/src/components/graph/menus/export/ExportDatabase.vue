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
              @input="switchbtntext"
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
              @click="save"
            >Speichern</v-btn>
          </v-col>
          <v-col sm="4">
            <v-btn color="grey" text id="save-menu-cancel" @click="clearFields">Abbrechen</v-btn>
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
          <v-btn color="error" text @click="deleteEdge()">Überschreiben</v-btn>
          <v-btn color="grey" text @click="edgeDeleteDialog = false">Abbrechen</v-btn>
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
      overwriteDialog: true
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
    },
    setbtntext(value) {
      this.btntext = value;
    },
    setmsg(value) {
      this.message = value;
    },
    setLabel(value) {
      this.DataBaseName = "";
      this.label = value;
    },
    save() {
      //Checks if menu formular was filled in correctly
      if (this.$refs.formDB.validate()) {
        //switching on string values is possible in JS and
        //is used here to determine in which state the menu is
        switch (this.btntext) {
          case "Speichern":
            if (this.DataBaseName != "" && this.DataBaseName != null) {
              let content = ExJSon.CreateJSon(this.getGraph());
              content.data.filename = this.DataBaseName;
              //Stringify makes content readable
              if (this.database.save(content, false)) {
                //no dupe
                // eslint-disable-next-line no-console
                console.log("save");
                this.setdialog(false);
                this.clearFields();
                if (this.$parent.$parent.$refs.newGraphMenu.dialog) {
                  this.$router.push({ name: "newGraph" });
                }
              } else {
                //dupe case
                this.setmsg(
                  "Es existiert bereits eine Datei unter diesen Namen. Wollen Sie diese überschreiben ?"
                );
                this.setbtntext("Überschreiben");
              }
            }
            break;

          case "Überschreiben":
            if (this.DataBaseName != "" && this.DataBaseName != null) {
              //Creates raw JSon Data that is unreadable
              let content = ExJSon.CreateJSon(this.getGraph());
              content.data.filename = this.DataBaseName;
              //Stringify makes content readable
              this.database.save(content, true);
              //  eslint-disable-next-line no-console
              console.log("overwrite");
              // > Little trick: this should only be true if the user has previously opened
              //   the newGraph menu - which creates the intended UX.
              this.setdialog(false);
              this.clearFields();
              if (this.$parent.$parent.$refs.newGraphMenu.dialog) {
                this.$router.push({ name: "newGraph" });
              }
            }
            break;

          default:
            break;
        }
      }
    }
  }
};
</script>
