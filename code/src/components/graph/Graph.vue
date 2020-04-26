<template>
  <div class="graph">
    <!-- Header -->
    <div class="header-bg">
      <v-row>
        <!-- Hamburger Btn to toggle Header -->
        <v-btn icon class="toggleHeader" @click="header = !header">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>

        <v-expand-transition>
          <!-- Header with Btns -->
          <GraphHeader v-show="header" ref="graphHeader" />
        </v-expand-transition>
      </v-row>
    </div>

    <!-- Body Card -->
    <v-card class="content-card">
      <!-- Graph Name, Quant, Optimization Bar -->
      <GraphInfo ref="graphInfo" />

      <!-- Graph Component + Controls + Menus -->
      <v-row class="card-bottom ma-0">
        <!-- CytoGraph Component -->
        <VarGraph class ref="vargraph" />
        <!-- Controls: -->
        <CreateControls ref="createControls" />
        <DetailControls ref="detailControls" />
        <ZoomControls ref="zoomControls" />
        <OptimizeControls ref="optimizeControls" />
        <!-- Menus:  -->
        <NewGraphMenu ref="newGraphMenu" />
        <ExportMenu ref="exportMenu" />
        <RightClickMenu ref="rightClickMenu" />
        <SettingsMenu ref="settingsMenu" />
        <DatabaseMenu ref="databaseMenu" />
      </v-row>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import GraphHeader from "./elements/GraphHeader";
import GraphInfo from "./elements/GraphInfo";
import VarGraph from "./elements/VarGraph";
import CreateControls from "./controls/CreateControls";
import DetailControls from "./controls/DetailControls";
import ZoomControls from "./controls/ZoomControls";
import OptimizeControls from "./controls/OptimizeControls";
import NewGraphMenu from "./menus/NewGraphMenu";
import ExportMenu from "./menus/ExportMenu";
import RightClickMenu from "./menus/RightClickMenu";
import SettingsMenu from "./menus/SettingsMenu";
import DatabaseMenu from "./menus/DatabaseMenu";

export default {
  /* eslint-disable no-console */
  name: "Graph",
  components: {
    GraphHeader,
    VarGraph,
    GraphInfo,
    CreateControls,
    DetailControls,
    OptimizeControls,
    NewGraphMenu,
    ExportMenu,
    RightClickMenu,
    ZoomControls,
    SettingsMenu,
    DatabaseMenu,
  },
  data() {
    return {
      header: true
    };
  },
  methods: {
    toggleHeader() {
      this.header = !this.header;
    }
  }
};
</script>
