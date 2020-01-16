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
            <v-btn @click="ExportJSon" v-on="on" fab dark small depressed color="primary">
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
          </template>
          <span>Graph laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="ExportJSon" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-image</v-icon>
            </v-btn>
          </template>
          <span>Als JSon speichern</span>
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
               <v-btn class="btn" @click="ExportJSon" href="/home/new">Speichern</v-btn> <!--ExportJSon wird abgeruft, um den Graph zu speichern-->
               <v-btn class="btn" href="/home/new">Verwerfen</v-btn> <!--Graph verwerfen und direkt an die Seite der Erstellung eines neuen Graphs weiterleiten-->
               <v-btn class="btn" href="#">Abbrechen</v-btn> <!--Popup-Fenster ausblenden und der Graph weiter bearbeiten-->
               </div>
           </div>
       </div>
  </div>
</template>

<script>
import graph from "@/vargraph/index.js";
import {eventBus} from "@/main.js"
import ExJSon from "@/vargraph/JSonPersistence.js"
import BasicData from "@/vargraph/BasicData.js";
import TestDatabase from "@/vargraph/TestDatabase.js";

export default {
  name: "MenuControls",
  created() {
    this.vars = {
      // initializes new instance of TestDatabase when MenuControls is loaded for the first time
      testDatabase: new TestDatabase(),
      instance: BasicData
    },
    // event bus listens to signal "saveNewData" with instance attached
    eventBus.$on("saveNewData", (newInstance) => {
      this.updateData(newInstance)
    })
  },
  methods: {
    modifyData() {
      // event bus broadcasts signal "modifyData" and attaches instance to it
      eventBus.$emit("modifyData", this.vars.instance)
    },
    updateData(newInstance) {
      this.vars.testDatabase.forceSave(newInstance, this.vars.instance.getName())
      this.vars.instance = newInstance
    },
    ExportJSon: function () {
      let content=ExJSon.CreateJSon()
      //Stringify makes content readable
      content = JSON.stringify(content, null, 2)
      // eslint-disable-next-line no-console
      console.log(content)
      // let link = document.createElement('link')
      // link.download='Graph.json'
      // let file = new Blob([content],{type: 'text/plain'})
      // link.href = URL.createObjectURL(file)
      // link.click()
      // URL.revokeObjectURL(link.href)
      let name = prompt("Name:");
      let date = new Date();
      if (name != "" && name != null) {
        let save = new BasicData(name, date, content);
        this.vars.testDatabase.save(save);
        // eslint-disable-next-line no-console
        this.vars.testDatabase.logContent();
      }
      else if (name === "") {
        alert("Fehlender Name");
      }
    },
    LoadJSon() {
      let Input = prompt("GraphName: ");
      // Checks if data was input by the user
      if (Input === "") {
        // eslint-disable-next-line no-console
        console.log("Missing graphName");
      } else {
        this.vars.instance = this.vars.testDatabase.load(Input);
        // eslint-disable-next-line no-console
        this.vars.testDatabase.logContent()
        ExJSon.LoadJSon(this.vars.instance.getGraph());
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
      items: ["a", "b", "c"]
    };
  }
};
</script>
