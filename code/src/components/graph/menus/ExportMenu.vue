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
        </v-tab-item>
        <v-tab-item>
          <v-card flat id="save-menu">
            <v-card-text>
              <v-form ref="formDB" v-model="validDB" lazy-validation>
                <v-row class="ml-2 mt-4 mr-2">
                  <p v-html="message"></p>
                </v-row>
                <v-row class="ml-2 mt-0 mr-2 mb-12">
                  <v-col sm="12">
                    <v-text-field
                      class="mt-6"
                      id="DatabaseName"
                      label="Datenbankname"
                      v-model="DataBaseName"
                      required
                      :rules="[v => !!v || 'Fehlender Name']"
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
                    >{{btntext}}</v-btn>
                  </v-col>
                  <v-col sm="4">
                    <v-btn color="grey" text id="save-menu-cancel" @click="clearFields">Abbrechen</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import fileManager from "../../../vargraph/importExport/FileManager.js";
import ExJSon from "../../../vargraph/JSonPersistence.js";

let dialogComponent;

export default {
  name: "ExportMenu",
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
    },
    switchbtntext() {
      if (this.btntext == "Überschreiben") {
        this.setbtntext("Speichern");
        this.setmsg(
          "Unter folgendem Namen kann der aktuelle Graph <b>in der Datenbank</b> gespeichert werden. Über das Menü 'Datenbank' kann er wieder geladen werden."
        );
      }
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
              //Stringify makes content readable
              content = JSON.stringify(content, null, 2);
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
              //Stringify makes content readable
              content = JSON.stringify(content, null, 2);
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
