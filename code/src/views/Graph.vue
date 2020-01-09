<style lang="less"></style>

<template>
  <div class="graph-page">
    <GraphHeader />
    <div class="graph-container dotted-background">
      <v-container fill-height grid-list-md>
        <v-layout row wrap align-center align="center">
          <VarGraph />
          <MenuControls />
          <ZoomControls />
          <OptimizeControls />
          <NodeControls />
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuControls from "@/components/MenuControls.vue";
import VarGraph from "@/components/VarGraph.vue";
import GraphHeader from "@/components/GraphHeader.vue";
import ZoomControls from "@/components/ZoomControls.vue";
import OptimizeControls from "@/components/OptimizeControls.vue";
import NodeControls from "@/components/NodeControls.vue";


export default {
  name: "graph",
  components: {
    GraphHeader,
    MenuControls,
    VarGraph,
    ZoomControls,
    OptimizeControls,
    NodeControls
  }
};
</script>
