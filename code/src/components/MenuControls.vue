<template>
  <div class="controls">
    <v-card class="button-card">
      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
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
  <DownloadMenu ref="DownloadMenu"></DownloadMenu>
  <SaveMenu ref="SaveMenu" v-on:onSaveConfirm="onSaveConfirm"></SaveMenu>
  </div>
</template>

<script>
import graph from "@/vargraph/index.js";
import ExJSon from "@/vargraph/JSonPersistence.js"
// eslint-disable-next-line no-unused-vars
import BasicData from "@/vargraph/BasicData.js";
import TestDatabase from "@/vargraph/TestDatabase.js";
import DownloadMenu from "@/components/DownloadMenu.vue";
import SaveMenu from "@/components/SaveMenu.vue"

export default {
  name: "MenuControls",
  components: {
    'DownloadMenu' : DownloadMenu,
    'SaveMenu'  :   SaveMenu,
  },
  created() {
    this.vars = {
      testDatabase: new TestDatabase()
    };
  },
  methods: {
    Download : function(){
      //not-best-practice aka coupling of components is not wanted
      //in order to make components reusable
      this.$refs.DownloadMenu.setdialog(true)
    },
    onSaveConfirm (value){
      if (value != "" && value != null) {
      let content=ExJSon.CreateJSon()
      //Stringify makes content readable
      content = JSON.stringify(content, null, 2)
      // eslint-disable-next-line no-console
      console.log(content)
      let date = new Date();
        let save = new BasicData(value, date, content);
        this.vars.testDatabase.save(save);
        this.vars.testDatabase.logContent();
        this.$refs.SaveMenu.setdialog(false)
      }
      else if (value == "" || value == null) {
        this.$refs.SaveMenu.setLabel("Fehlender Name")
      }
    },
    SaveJSon: function () {
      this.$refs.SaveMenu.setdialog(true)
    },
    LoadJSon() {
      let Input = prompt("GraphName: ");
      // Checks if data was input by the user
      if (Input === "") {
        // eslint-disable-next-line no-console
        console.log("Missing graphName");
      } else {
        let instance = this.vars.testDatabase.load(Input);
        // eslint-disable-next-line no-console
        this.vars.testDatabase.logContent()
        ExJSon.LoadJSon(instance.getGraph());
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
