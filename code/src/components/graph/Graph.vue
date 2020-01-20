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
          <CreateControls ref="createControls" />
          <DetailControls ref="detailControls" />
          <ModifyDataControls ref="modifyDataControls" />
          <OptimizeControls ref="optimizeControls" />

          <!-- Menus:  -->
          <NewGraphMenu ref="newGraphMenu" />
          <SaveMenu ref="saveMenu" />

          <!-- <VarGraph />
          <MenuControls />
          <ZoomControls />
          <OptimizeControls />
          <NodeControls /> -->

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
import ModifyDataControls from "@/components/graph/controls/ModifyDataControls";
import OptimizeControls from "@/components/graph/controls/OptimizeControls";
import NewGraphMenu from "@/components/graph/menus/NewGraphMenu";
import SaveMenu from "@/components/graph/menus/SaveMenu";

export default {
  name: "NodeControls",
  components: {
    GraphHeader,
    Toolbar,
    VarGraph,
    CreateControls,
    DetailControls,
    ModifyDataControls,
    OptimizeControls,
    NewGraphMenu,
    SaveMenu
  }
};
</script>