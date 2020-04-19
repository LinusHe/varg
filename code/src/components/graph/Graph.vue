<template>
  <div class="graph">
    <!-- Header: -->

    <div class="header-bg">
      <v-row>
        <v-btn icon class="toggleHeader" @click="header = !header">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
        <v-expand-transition>
          <GraphHeader v-show="header" ref="graphHeader" />
        </v-expand-transition>
      </v-row>
    </div>

    <v-card class="content-card">
      <v-row class="card-top pt-2 ma-0">
        <v-col sm="3">
          <v-row>
            <v-card align="center" class="mt-2 ml-8 mb-2" width="60px" height="60px">
              <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-rocket</v-icon>
            </v-card>
            <p class="mb-0">
              <v-card-subtitle class="pb-0">Produktname:</v-card-subtitle>
              <v-card-title class="pt-0 pb-0">
                Name
                <v-icon color="lightgrey" class="ml-2 mb-1" small>mdi-pencil</v-icon>
              </v-card-title>
            </p>
          </v-row>
        </v-col>

        <v-col sm="3">
          <v-row>
            <v-divider class="mx-4" vertical></v-divider>
            <v-card align="center" class="mt-2 ml-4" width="60px" height="60px">
              <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-counter</v-icon>
            </v-card>
            <p class="mb-0">
              <v-card-subtitle class="pb-0">Stückzahl:</v-card-subtitle>
              <v-card-title class="pt-0 pb-0">
                1000
                <v-icon color="lightgrey" class="ml-2 mb-1" small>mdi-pencil</v-icon>
              </v-card-title>
            </p>
          </v-row>
        </v-col>

        <v-col sm="3">
          <v-row>
            <v-divider class="mx-4" vertical></v-divider>
            <v-card align="center" class="mt-2 ml-4" width="60px" height="60px">
              <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-cash</v-icon>
            </v-card>
            <p class="mb-0">
              <v-card-subtitle class="pb-0">
                Gesamtkosten:
                <v-icon color="#636364" class="ml-2 mb-1" small>mdi-cog</v-icon>
              </v-card-subtitle>
              <v-card-title class="pt-0 pb-0">1546,5€</v-card-title>
            </p>
          </v-row>
        </v-col>

        <v-col sm="3">
          <v-row>
            <v-divider class="mx-4" vertical></v-divider>
            <v-card align="center" class="mt-2 ml-4" width="60px" height="60px">
              <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-clock-outline</v-icon>
            </v-card>
            <p class="mb-0">
              <v-card-subtitle class="pb-0">
                Gesamtzeit:
                <v-icon color="#636364" class="ml-2 mb-1" small>mdi-cog</v-icon>
              </v-card-subtitle>
              <v-btn class="ml-4 pa-0" text color="#6c7dff">Graph optimieren</v-btn>
            </p>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="card-bottom ma-0">
        <VarGraph class ref="vargraph" />
        <CreateControls ref="createControls" />
        <!--        <OptimizeControls ref="optimizeControls" />-->
        <DetailControls ref="detailControls" />
        <ZoomControls ref="zoomControls" />

        <!-- Menus:  -->
        <NewGraphMenu ref="newGraphMenu" />
        <SaveMenu ref="saveMenu" />
        <DownloadMenu ref="downloadMenu" />
        <RightClickMenu ref="rightClickMenu" />
        <SettingsMenu ref="settingsMenu" />
        <DatabaseMenu ref="databaseMenu" />
      </v-row>
    </v-card>
    <!--    <div class="graph-container dotted-background">-->
    <!--      <v-container fill-height grid-list-md>-->
    <!--        <v-layout row wrap align-center align="center">-->

    <!--          &lt;!&ndash; Elements:  &ndash;&gt;-->
    <!--          <VarGraph ref="vargraph"/>-->
    <!--          <Toolbar ref="toolbar"/>-->

    <!--          &lt;!&ndash; Controls:  &ndash;&gt;-->
    <!--          <OptimizeControls ref="optimizeControls" />-->
    <!--          <CreateControls ref="createControls" />-->
    <!--          <DetailControls ref="detailControls" />-->
    <!--          <ZoomControls ref="zoomControls" />-->

    <!--          &lt;!&ndash; Menus:  &ndash;&gt;-->
    <!--          <NewGraphMenu ref="newGraphMenu" />-->
    <!--          <SaveMenu ref="saveMenu" />-->
    <!--          <DownloadMenu ref="downloadMenu" />-->
    <!--          <RightClickMenu ref="rightClickMenu" />-->
    <!--          <SettingsMenu ref="settingsMenu" />-->
    <!--          <DatabaseMenu ref="databaseMenu" />-->

    <!--        </v-layout>-->
    <!--      </v-container>-->
    <!--    </div>-->
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import GraphHeader from "@/components/graph/elements/GraphHeader";
import Toolbar from "@/components/graph/elements/Toolbar";
import VarGraph from "@/components/graph/elements/VarGraph";
import CreateControls from "@/components/graph/controls/CreateControls";
import DetailControls from "@/components/graph/controls/DetailControls";
import ZoomControls from "@/components/graph/controls/ZoomControls";
import OptimizeControls from "@/components/graph/controls/OptimizeControls";
import NewGraphMenu from "@/components/graph/menus/NewGraphMenu";
import SaveMenu from "@/components/graph/menus/SaveMenu";
import DownloadMenu from "@/components/graph/menus/DownloadMenu";
import RightClickMenu from "@/components/graph/menus/RightClickMenu";
import SettingsMenu from "@/components/graph/menus/SettingsMenu";
import DatabaseMenu from "@/components/graph/menus/DatabaseMenu";

export default {
  /* eslint-disable no-console */
  name: "NodeControls",
  components: {
    GraphHeader,
    Toolbar,
    VarGraph,
    CreateControls,
    DetailControls,
    OptimizeControls,
    NewGraphMenu,
    SaveMenu,
    DownloadMenu,
    RightClickMenu,
    ZoomControls,
    SettingsMenu,
    DatabaseMenu
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
