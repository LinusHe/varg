<template>
  <div class="zoom-controls">
<<<<<<< HEAD
    <v-btn class="ma-2" @click="ZoomOut" text icon color="grey">
      <v-icon>mdi-arrow-expand-all</v-icon>
    </v-btn>
    <v-btn class="ma-2" @click="ZoomPlus" text icon color="grey">
      <v-icon>mdi-magnify-plus-outline</v-icon>
    </v-btn>
    <v-btn class="ma-2" @click="ZoomMinus" icon color="grey">
      <v-icon>mdi-magnify-minus-outline</v-icon>
    </v-btn>
=======

  <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on ="on" class="ma-2" @click="ZoomOut" text icon color="grey">
         <v-icon>mdi-arrow-expand-all</v-icon>
        </v-btn>
      </template>
      <span>Zeig alle Elemente</span>
  </v-tooltip>
    
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on ="on" class="ma-2" @click="ZoomPlus" text icon color="grey">
        <v-icon>mdi-magnify-plus-outline</v-icon>
      </v-btn>
    </template>
    <span>Zoomt rein</span>
  </v-tooltip>

  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn  v-on ="on" class="ma-2" @click="ZoomMinus" icon color="grey">
        <v-icon>mdi-magnify-minus-outline</v-icon>
      </v-btn>
    </template>
    <span>Zoomt raus</span>
  </v-tooltip>    
  
>>>>>>> LoginBranch
  </div>
</template>

<script>
import Zoom from "@/vargraph/Zoom.js";

export default {
  name: "ZoomControls",
  methods: {

      ZoomPlus() {
        if (Zoom.getMaxZoom() === Zoom.getZoom()){
          // eslint-disable-next-line no-console
          console.log('No more zooming in: ' + Zoom.getMaxZoom())
        }
        else {
<<<<<<< HEAD
          let CurrentZoom = Zoom.getZoom()
          CurrentZoom+=0.1
=======
          let CurrentZoom = Zoom.getZoom() + 0.1
>>>>>>> LoginBranch
          Zoom.setZoom(CurrentZoom)
        }
      },

      ZoomMinus(){
        if (Zoom.getMinZoom() === Zoom.getZoom()){
          // eslint-disable-next-line no-console
          console.log('No more zooming out: ' + Zoom.getMinZoom())
        }
        else {
          let CurrentZoom = Zoom.getZoom()
          CurrentZoom-=0.1
          Zoom.setZoom(CurrentZoom)
        }
      },

      ZoomOut(){
        Zoom.ZoomOut()
      }
  }
};
</script>