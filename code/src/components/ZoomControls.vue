<template>
  <div class="zoom-controls">
    <v-btn class="ma-2" text icon color="grey">
      <v-icon>mdi-arrow-expand-all</v-icon>
    </v-btn>
    <v-btn class="ma-2" @click="ZoomPlus" text icon color="grey">
      <v-icon>mdi-magnify-plus-outline</v-icon>
    </v-btn>
    <v-btn class="ma-2" @click="ZoomMinus" icon color="grey">
      <v-icon>mdi-magnify-minus-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
import graph from "@/vargraph/index.js";

export default {
  name: "ZoomControls",
  methods: {

      ZoomPlus() {
        if (graph.getMaxZoom() === graph.getZoom()){
          // eslint-disable-next-line no-console
          console.log('No more zooming in: ' + graph.getMaxZoom())
        }
        else {
          let CurrentZoom = graph.getZoom()
          CurrentZoom+=0.1
          graph.setZoom(CurrentZoom)
        }
      },

      ZoomMinus(){
        if (graph.getMinZoom() === graph.getZoom()){
          // eslint-disable-next-line no-console
          console.log('No more zooming out: ' + graph.getMinZoom())
        }
        else {
          let CurrentZoom = graph.getZoom()
          CurrentZoom-=0.1
          graph.setZoom(CurrentZoom)
        }
      }
  }
};
</script>