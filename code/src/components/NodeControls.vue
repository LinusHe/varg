<template>
  <div class="node-controls">
    <DetailControls />
    <CreateControls />
    <RightClickMenu ref="rcmenu" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import DetailControls from "@/components/DetailControls.vue";
import CreateControls from "@/components/CreateControls.vue";
import RightClickMenu from "@/components/RightClickMenu.vue";
import graph from "@/vargraph/index.js";
export default {
  name: "NodeControls",
  components: {
    DetailControls,
    CreateControls,
    RightClickMenu
  },
  mounted: function() {
    // this.$refs.rcmenu.test();
    // Right-Click:
    graph
      .getCytoGraph()
      .on("cxttap", e => this.$refs.rcmenu.openMenu(window.event, e.target));
    // graph
    //   .getCytoGraph()
    //   .on("cxttap", "node", e => this.$refs.rcmenu.openNodeMenu(window.event));
    // graph
    //   .getCytoGraph()
    //   .on("cxttap", "edge", e => this.$refs.rcmenu.openEdgeMenu(window.event));
    // graph.getCytoGraph().on("cxttap", "core", e => this.$refs.rcmenu.openEdgeMenu(window.event));
  }
};
</script>