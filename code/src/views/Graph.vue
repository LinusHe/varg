<style lang="less"></style>

<template>
  <div class="graph-page">
    <GraphHeader />
    <div class="graph-container dotted-background">
      <v-container fill-height grid-list-md>
        <v-layout row wrap align-center align="center">
          <VarGraph />
<<<<<<< HEAD
          <Controls />
          <ZoomControls />
          <OptimizeControls />
          <DetailControls />
          <CreateControls />
=======
          <MenuControls />
          <ZoomControls />
          <OptimizeControls />
          <NodeControls />
>>>>>>> LoginBranch
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
<<<<<<< HEAD
import Controls from "@/components/Controls.vue";
=======
import MenuControls from "@/components/MenuControls.vue";
>>>>>>> LoginBranch
import VarGraph from "@/components/VarGraph.vue";
import GraphHeader from "@/components/GraphHeader.vue";
import ZoomControls from "@/components/ZoomControls.vue";
import OptimizeControls from "@/components/OptimizeControls.vue";
<<<<<<< HEAD
import DetailControls from "@/components/DetailControls.vue";
import CreateControls from "@/components/CreateControls.vue";
=======
import NodeControls from "@/components/NodeControls.vue";

>>>>>>> LoginBranch

export default {
  name: "graph",
  components: {
    GraphHeader,
<<<<<<< HEAD
    Controls,
    VarGraph,
    ZoomControls,
    OptimizeControls,
    DetailControls,
    CreateControls
=======
    MenuControls,
    VarGraph,
    ZoomControls,
    OptimizeControls,
    NodeControls
>>>>>>> LoginBranch
  }
};
</script>
