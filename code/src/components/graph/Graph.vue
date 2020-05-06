<template>
  <div class="graph">
    <!-- Header -->
    <div class="header-bg">
      <v-row>
        <!-- Hamburger Btn to toggle Header -->
        <v-btn icon class="toggleHeader" @click="toggleHeader()">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>

        <v-expand-transition>
          <!-- Header with Btns -->
          <GraphHeader v-show="header" ref="graphHeader" />
        </v-expand-transition>
      </v-row>
    </div>

    <!-- Body Card -->
      <v-card id="card-content" class="content-card">
        <!-- Graph Name, Quant, Optimization Bar -->
        <GraphInfo ref="graphInfo" id="graph-info"/>

        <!-- Graph Component + Controls + Menus -->
        <v-row class="card-bottom ma-0">
          <!-- CytoGraph Component -->
          <VarGraph class ref="vargraph" />
          <!-- Controls: -->
          <CreateControls ref="createControls" />
          <DetailControls ref="detailControls" />
          <ZoomControls ref="zoomControls" />
          <!-- Menus:  -->
          <NewGraphMenu ref="newGraphMenu" />
          <ExportMenu ref="exportMenu" />
          <RightClickMenu ref="rightClickMenu" />
          <SettingsMenu ref="settingsMenu" />
          <DatabaseMenu ref="databaseMenu" />

          <!-- Test -->
          <HTTPRequest ref="httpRequest" />
        </v-row>
      </v-card>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable standard/computed-property-even-spacing */
import GraphHeader from "./elements/GraphHeader";
import GraphInfo from "./elements/GraphInfo";
import VarGraph from "./elements/VarGraph";
import CreateControls from "./controls/CreateControls";
import DetailControls from "./controls/DetailControls";
import ZoomControls from "./controls/ZoomControls";
import NewGraphMenu from "./menus/NewGraphMenu";
import ExportMenu from "./menus/export/ExportMenu";
import RightClickMenu from "./menus/RightClickMenu";
import SettingsMenu from "./menus/settings/SettingsMenu";
import DatabaseMenu from "./menus/DatabaseMenu";
import HTTPRequest from "./HTTPRequest";

export default {
  /* eslint-disable no-console */
  name: "Graph",
  components: {
    GraphHeader,
    VarGraph,
    GraphInfo,
    CreateControls,
    DetailControls,
    NewGraphMenu,
    ExportMenu,
    RightClickMenu,
    ZoomControls,
    SettingsMenu,
    DatabaseMenu,
    HTTPRequest
  },
  data() {
    return {
      header: true
    };
  },
  methods: {
    toggleHeader() {
      this.header = !this.header;
      this.$refs.vargraph.calculateHeightOfCy(this.header);
    }
  }
};
</script>
