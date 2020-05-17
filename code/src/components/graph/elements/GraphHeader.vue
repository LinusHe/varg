<template>
  <div class="header-graph-container" id="graph-header">
    <v-row>
      <v-col align="left" xs="12" sm="1">
        <h1 class="headline mb-1 ml-12">varg</h1>
      </v-col>

      <v-col align="center">
        <v-btn
          outlined
          tile
          color="#b9c5ff"
          class="bora-l-10 bo-r-0"
          id="newgraph-btn"
          @click="NewGraph"
        >
          <v-icon dark>mdi-plus</v-icon>Neuer Graph
        </v-btn>
        <v-btn outlined tile color="#b9c5ff" class="bo-r-0" id="database-btn" @click="datenbank()">
          <v-icon class="mr-1">mdi-database</v-icon>Datenbank
        </v-btn>
        <v-btn outlined tile color="#b9c5ff" class="bo-r-0" @click="LoadJSon" id="ImportGraph">
          <input type="file" ref="file" accept=".json" style="display: none" />
          <v-icon class="mr-1">mdi-import</v-icon>Import
        </v-btn>
        <v-btn outlined tile color="#b9c5ff" class="bo-r-0" @click="Download" id="download-btn">
          <v-icon class="mr-1">mdi-export</v-icon>Export
        </v-btn>
        <v-btn
          outlined
          tile
          color="#b9c5ff"
          class="bora-r-10"
          @click="openSettings"
          id="SettingsBtn"
        >
          <v-icon class="mr-1">mdi-cog</v-icon>Einstellungen
        </v-btn>
      </v-col>

      <!-- User Icon-->
      <v-col align="right" sm="1" class="mr-12">
        <v-menu bottom left offset-y>
          <template v-slot:activator="{ on }">
            <v-btn id="avatar-btn" height="48px" color="primary" icon v-on="on">
              <v-avatar color="red">
                <span class="white--text headline">CJ</span>
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item key="account" @click="account()">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
            <v-list-item key="logout" id="logout-btn" @click="logout()">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import fileManager from "../../../vargraph/importExport/FileManager.js";
import TestDatabase from "../../../vargraph/TestDatabase.js";

let dialogComponent;

export default {
  created() {
    this.vars = {
      // initializes new instance of TestDatabase when Toolbar is loaded for the first time
      testDatabase: new TestDatabase()
    };
  },
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
  },
  name: "GraphHeader",
  methods: {
    getGraph() {
      return this.$parent.$refs["vargraph"];
    },
    NewGraph() {
      this.$parent.$refs.newGraphMenu.setObject(this.testDatabase);
      this.$parent.$refs.newGraphMenu.setdialog(true);
    },
    Download: function() {
      //not-best-practice aka coupling of components is not wanted
      //in order to make components reusable
      this.$parent.$refs.exportMenu.setdialog(true);
    },
    openSettings() {
      this.$parent.$refs.settingsMenu.setActiveTab(0);
      this.$parent.$refs.settingsMenu.openDialog();
    },
    SaveJSon: function() {
      this.$parent.$refs.saveMenu.setdialog(true);
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
    account() {
      this.$parent.$refs.settingsMenu.setActiveTab(3);
      this.$parent.$refs.settingsMenu.openDialog();
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "login" });
    },
    datenbank() {
      this.$parent.$refs.databaseMenu.openDialog();
    }
  }
};
</script>
