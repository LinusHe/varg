<template>
  <div class="header-graph-container" id="graph-header">
    <v-row>
      <v-col align="left" xs="12" sm="1">
        <h1 class="headline mb-1 ml-12">VarG</h1>
      </v-col>

      <v-col align="center">
        <v-btn
          outlined
          tile
          color="#ececec"
          class="bora-l-10 bo-r-0 blackbtn"
          id="newgraph-btn"
          @click="NewGraph"
        >
          <v-icon dark>mdi-plus</v-icon>Neuer Graph
        </v-btn>
        <v-btn outlined tile color="#ececec" class="bo-r-0 blackbtn" id="database-btn" @click="datenbank()">
          <v-icon class="mr-1">mdi-database</v-icon>Datenbank
        </v-btn>
        <v-btn outlined tile color="#ececec" class="bo-r-0 blackbtn" @click="LoadJSon" id="ImportGraph">
          <input type="file" ref="file" accept=".json" style="display: none" />
          <v-icon class="mr-1">mdi-import</v-icon>Import
        </v-btn>
        <v-btn outlined tile color="#ececec" class="bo-r-0 blackbtn" @click="Download" id="download-btn">
          <v-icon class="mr-1">mdi-export</v-icon>Export
        </v-btn>
        <v-btn
          outlined
          tile
          color="#ececec"
          class="bora-r-10 blackbtn"
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
                <span class="white--text headline">{{usershort}}</span>
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
import cyStore from "@/vargraph/graph/cyStore";
let dialogComponent;

export default {
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
    this.usershort = this.$store.state.user.name.substring(0, 2).toUpperCase();
  },
  data() {
    return {
      usershort: "CJ",
    };
  },
  name: "GraphHeader",
  methods: {
    getGraph() {
      return this.$parent.$refs["vargraph"];
    },
    NewGraph() {
      this.$parent.$refs.newGraphMenu.setdialog(true);
    },
    Download: function() {
      //not-best-practice aka coupling of components is not wanted
      //in order to make components reusable
      this.$parent.$refs.exportMenu.setActiveTab(0);
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
        console.log(dialogComponent);
        fileManager.loadGraphFromJson(event, graphComponent, dialogComponent);
        dialogComponent.dialogSuccess("Graph erfolgreich geladen");
      }
    },
    account() {
      this.$parent.$refs.settingsMenu.setActiveTab(3);
      this.$parent.$refs.settingsMenu.prepAccountInfo();
      this.$parent.$refs.settingsMenu.openDialog();
    },
    logout() {
      this.$store.commit("logout");
      //this.$router.push({ name: "login" });
      location.reload();
    },
    datenbank() {
      this.$parent.$refs.databaseMenu.openDialog();
    }
  }
};
</script>
