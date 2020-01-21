<template>
  <div id="cy"></div>
</template>

<script>
import graph from "@/vargraph/index.js";
export default {
  name: "VarGraph",
  mounted: function() {
    graph.run();

    // Event Listeners:
    //  Left Click
    graph
      .getCytoGraph()
      .on("tap", e =>
        this.$parent.$refs.detailControls.handleDetails(e.target)
      );
    // graph
    //   .getCytoGraph()
    //   .on("tap", "node", n =>
    //     this.$parent.$refs.detailControls.openNodeDetails(n.target)
    //   );
    // graph
    //   .getCytoGraph()
    //   .on("tap", "edge", e =>
    //     this.$parent.$refs.detailControls.openEdgeDetails(e.target)
    //   );
    // Right Click
    graph
      .getCytoGraph()
      .on("cxttap", e =>
        this.$parent.$refs.rightClickMenu.openMenu(window.event, e.target)
      );
  }
};
</script>
