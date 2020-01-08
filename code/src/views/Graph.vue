<style lang="less"></style>

<template>
  <div class="graph-page">
    <GraphHeader />
    <div class="graph-container dotted-background">
      <v-container fill-height grid-list-md>
        <v-layout row wrap align-center align="center">
          <VarGraph />
          <Controls />
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
import Controls from "@/components/Controls.vue";
import VarGraph from "@/components/VarGraph.vue";
import GraphHeader from "@/components/GraphHeader.vue";
import ZoomControls from "@/components/ZoomControls.vue";
import OptimizeControls from "@/components/OptimizeControls.vue";
import NodeControls from "@/components/NodeControls.vue";


export default {
  name: "graph",
  components: {
    GraphHeader,
    Controls,
    VarGraph,
    ZoomControls,
    OptimizeControls,
    NodeControls
  }
};
</script>
