<template>
  <div class="controls">
    <v-card class="button-card">
      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              id="newgraph-btn"
              fab
              dark
              small
              depressed
              color="primary"
              @click="NewGraph"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Neuer Graph</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="datenbank()"
              id="database-btn"
              v-on="on"
              fab
              dark
              small
              depressed
              color="primary"
            >
              <v-icon dark>mdi-database-export</v-icon>
            </v-btn>
          </template>
          <span>Graph aus Datenbank laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="SaveJSon"
              id="save-btn"
              v-on="on"
              fab
              dark
              small
              depressed
              color="primary"
            >
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
            <v-btn
              @click="Download"
              id="download-btn"
              v-on="on"
              fab
              dark
              small
              depressed
              color="primary"
            >
              <v-icon dark>mdi-file-download</v-icon>
            </v-btn>
          </template>
          <span>Download</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="openSettings" fab dark small depressed color="primary">
              <v-icon dark>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>Einstellungen</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="logout()"
              id="logout-btn"
              v-on="on"
              fab
              dark
              small
              depressed
              color="primary"
            >
              <v-icon dark>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Ausloggen</span>
        </v-tooltip>
      </v-row>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable standard/computed-property-even-spacing */
import TestDatabase from "@/vargraph/TestDatabase.js";
import fileManager from "@/vargraph/importExport/FileManager.js";
import router from "@/router/index.js";

export default {
  name: "Toolbar",
  created() {
    this.vars = {
      // initializes new instance of TestDatabase when Toolbar is loaded for the first time
      testDatabase: new TestDatabase()
    };
  },
  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    //Shows Menu to open up a new Graph with options
    NewGraph() {
      this.$parent.$parent.$refs.newGraphMenu.setObject(this.vars.testDatabase);
      this.$parent.$parent.$refs.newGraphMenu.setdialog(true);
    },
    Download: function() {
      //not-best-practice aka coupling of components is not wanted
      //in order to make components reusable
      this.$parent.$parent.$refs.downloadMenu.setdialog(true);
    },
    openSettings() {
      this.$parent.$parent.$refs.settingsMenu.openDialog();
    },
    SaveJSon: function() {
      this.$parent.$parent.$refs.saveMenu.setdialog(true);
    },
    LoadJSon() {
      this.$refs.file;
      this.$refs.file.click();

      this.$refs.file.addEventListener("change", onChange);

      let graphComponent = this.getGraph();
      function onChange(event) {
        console.log("Graph Component to load:", graphComponent);
        fileManager.loadGraphFromJson(event, graphComponent);
      }
    },

    findPathForCosts() {
      this.getGraph().findPath(this.getGraph(), "optionCosts");
    },
    findPathForTime() {
      this.getGraph().findPath(this.getGraph(), "optionTime");
    },
    logout() {
      this.$store.commit("logout");
      router.push({ name: "login" });
    },
    datenbank() {
      this.$parent.$refs.databaseMenu.openDialog();
    }
  },
  data: function() {
    return {
      items: ["a", "b", "c"]
    };
  }
};
</script>
