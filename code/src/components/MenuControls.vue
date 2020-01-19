<template>
  <div class="controls">
    <v-card class="button-card">
      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary" href="#popup1">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Neuer Graph</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="datenbank()" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-database-export</v-icon>
            </v-btn>
          </template>
          <span>Graph aus Datenbank laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="modifyData()" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-card-bulleted-settings</v-icon>
            </v-btn>
          </template>
          <span>Daten bearbeiten</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="SaveJSon" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span>Speichern</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="LoadJSon" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-open-in-app</v-icon>
            </v-btn>
            <input type="file" ref="file" accept=".json" style="display: none" />
          </template>
          <span>Graph laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="Download" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-file-download</v-icon>
            </v-btn>
          </template>
          <span>Download</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-settings</v-icon>
            </v-btn>
          </template>
          <span>Einstellungen</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="home" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Ausloggen</span>
        </v-tooltip>
      </v-row>
    </v-card>
    <!--Popup-Fenster-->
    <div id="popup1" class="overlay"> <!-- Popupfenster (Solange der Button der Erstellung eines neuen Graphs nicht gedrückt ist, bleibt dieses Fenster versteckt) -->
        <div class="popup">
           <div class="modal-header"> <!--Header des Popupfenesters -->
             <h2>Neuer Graph ?</h2>
             <a class="close" href="#">&times;</a>
             </div>
             <div class="content">
               Dieser Graph Speichern ?  <!-- Inhalt des Popup-Fensters-->
               </div>
               <div class="modal-footer"> <!--Footer des Popupfenesters, wo die Funktionsbuttons platziert sind -->
               <v-btn class="btn" @click="SaveJSon" href="/home/new" >Speichern</v-btn> <!--ExportJSon wird abgeruft, um den Graph zu speichern-->
               <v-btn class="btn" href="/home/new">Verwerfen</v-btn> <!--Graph verwerfen und direkt an die Seite der Erstellung eines neuen Graphs weiterleiten-->
               <v-btn class="btn" href="#">Abbrechen</v-btn> <!--Popup-Fenster ausblenden und der Graph weiter bearbeiten-->
               </div>
           </div>
       </div>
  <DownloadMenu ref="DownloadMenu"></DownloadMenu>
  <SaveMenu ref="SaveMenu" v-on:onSaveConfirm="onSaveConfirm" v-on:onOverwrite="onOverwrite"></SaveMenu>
  </div>
</template>

<script>
/* eslint-disable no-console */
import graph from "@/vargraph/index.js";
import {eventBus} from "@/main.js"
import ExJSon from "@/vargraph/JSonPersistence.js"
import BasicData from "@/vargraph/BasicData.js";
import TestDatabase from "@/vargraph/TestDatabase.js";
import DownloadMenu from "@/components/DownloadMenu.vue";
import SaveMenu from "@/components/SaveMenu.vue";
import importExport from "@/vargraph/importExport.js";

export default {
  name: "MenuControls",
  components: {
    'DownloadMenu' : DownloadMenu,
    'SaveMenu'  :   SaveMenu,
  },
  created() {
    this.vars = {
      // initializes new instance of TestDatabase when MenuControls is loaded for the first time
      testDatabase: new TestDatabase()
    };
  },
  methods: {
    modifyData() {
      eventBus.$emit("modifyData", this.vars.testDatabase)
    },
    Download : function(){
      //not-best-practice aka coupling of components is not wanted
      //in order to make components reusable
      this.$refs.DownloadMenu.setdialog(true)
    },
    onSaveConfirm (value){
      if (value != "" && value != null) {
        let content=ExJSon.CreateJSon()
        //Stringify makes content readable
        content = JSON.stringify(content, null, 2);
        let date = new Date();
        let save = new BasicData(value, date, content);
        if(this.vars.testDatabase.save(save, false)){
          //no dupe
          // eslint-disable-next-line no-console
          console.log('save')
          this.$refs.SaveMenu.setdialog(false)
        }
        else {
          //dupe case
          this.$refs.SaveMenu.setmsg("Es existiert bereits eine Datei unter diesen Namen. Wollen Sie diese überschreiben ?")
          this.$refs.SaveMenu.setbtntext("Überschreiben")
        }
      }
      else if (value == "" || value == null) {
        //do nothing
      }
    },
    onOverwrite(value) {
      let content=ExJSon.CreateJSon()
      //Stringify makes content readable
      content = JSON.stringify(content, null, 2);
      // eslint-disable-next-line no-console
      console.log('overwrite')
      let date = new Date();
      let save = new BasicData(value, date, content);
      this.vars.testDatabase.save(save,true)
      this.$refs.SaveMenu.setdialog(false)
    },
    SaveJSon: function () {
      this.$refs.SaveMenu.setdialog(true)
    },
    LoadJSon() {
      (this.$refs.file);
      this.$refs.file.click();
      this.$refs.file.addEventListener("change", onChange);

      function onChange(event) {
        importExport.loadGraphFromJson(event);
      }
      
    },

    findPathForCosts() {
      graph.findPath("optionCosts");
    },
    findPathForTime() {
      graph.findPath("optionTime");
    },

    home() {
      window.location.href = "/home/login";
    },
    datenbank() {
      window.location.href = "/database";
    }
  },
  data: function() {
    return {
      items: ["a", "b", "c"],
    };
  }
};
</script>
