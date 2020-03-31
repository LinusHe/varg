<template>
  <div class="graph">

    <!-- Header: -->
    <GraphHeader ref="graphHeader"/>

    <div class="graph-container dotted-background">
      <v-container fill-height grid-list-md>
        <v-layout row wrap align-center align="center">

          <!-- Elements:  -->
          <VarGraph ref="vargraph"/>
          <Toolbar ref="toolbar"/>

          <!-- Controls:  -->
          <OptimizeControls ref="optimizeControls" />
          <CreateControls ref="createControls" />
          <DetailControls ref="detailControls" />
          <ZoomControls ref="zoomControls" />

          <!-- Menus:  -->
          <NewGraphMenu ref="newGraphMenu" />
          <SaveMenu ref="saveMenu" />
          <DownloadMenu ref="downloadMenu" />
          <RightClickMenu ref="rightClickMenu" />

        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
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

export default {
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
    ZoomControls
  }
};
</script>
