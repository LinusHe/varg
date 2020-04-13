<style lang="less"></style>

<template>
  <div class="graph-page">
    <Graph />
  </div>
</template>

<script>
// @ is an alias to /src
import Graph from "@/components/graph/Graph.vue";

export default {
  name: "graph",
  components: {
    Graph
  }
};
</script>
