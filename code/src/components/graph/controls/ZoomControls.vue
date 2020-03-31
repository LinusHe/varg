<template>
  <div class="zoom-controls">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="ma-2" @click="ZoomOut" id="zoom-view-all" text icon color="grey">
          <v-icon>mdi-arrow-expand-all</v-icon>
        </v-btn>
      </template>
      <span>Zeig alle Elemente</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="ma-2" @click="ZoomPlus" id="zoom-plus" text icon color="grey">
          <v-icon>mdi-magnify-plus-outline</v-icon>
        </v-btn>
      </template>
      <span>Zoomt rein</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="ma-2" @click="ZoomMinus" id="zoom-minus" icon color="grey">
          <v-icon>mdi-magnify-minus-outline</v-icon>
        </v-btn>
      </template>
      <span>Zoomt raus</span>
    </v-tooltip>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
let dialogComponent;

export default {
  name: "ZoomControls",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  methods: {
    getGraph() {
      return this.$parent.$refs["vargraph"];
    },

    ZoomPlus() {
      if (this.getGraph().getMaxZoom(this.getGraph()) === this.getGraph().getZoom(this.getGraph())) {
        // eslint-disable-next-line no-console
        console.log("No more zooming in: " + this.getGraph().getMaxZoom(this.getGraph()));
      } else {
        let CurrentZoom = this.getGraph().getZoom(this.getGraph()) + 0.1;
        this.getGraph().setZoom(this.getGraph(), CurrentZoom);
      }
    },

    ZoomMinus() {
      if (this.getGraph().getMinZoom(this.getGraph()) === this.getGraph().getZoom(this.getGraph())) {
        // eslint-disable-next-line no-console
        console.log("No more zooming out: " + this.getGraph().getMinZoom(this.getGraph()));
      } else {
        let CurrentZoom = this.getGraph().getZoom(this.getGraph());
        CurrentZoom -= 0.1;
        this.getGraph().setZoom(this.getGraph(), CurrentZoom);
      }
    },

    ZoomOut() {
      this.getGraph().ZoomOut(this.getGraph());
      dialogComponent.dialogInfo("Graph wurde zentriert", 2000)
    }
  }
};
</script>