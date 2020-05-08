<template>
  <div class="zoom-controls">
    <v-card class="pr-2 pl-2 pt-2 pb-2">
      <v-row>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="ma-2"
              @click="ZoomPlus"
              id="zoom-plus"
              text
              icon
              color="lightgrey"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Zoomt rein</span>
        </v-tooltip>
      </v-row>

      <v-row>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="ma-2" @click="ZoomMinus" id="zoom-minus" icon color="lightgrey">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </template>
          <span>Zoomt raus</span>
        </v-tooltip>
      </v-row>

      <v-row>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              class="ma-2"
              @click="ZoomOut"
              id="zoom-view-all"
              text
              icon
              color="lightgrey"
            >
              <v-icon>mdi-arrow-expand-all</v-icon>
            </v-btn>
          </template>
          <span>Zeig alle Elemente</span>
        </v-tooltip>
      </v-row>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "ZoomControls",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },

    ZoomPlus() {
      if (
        this.getGraph().getMaxZoom(this.getGraph()) ===
        this.getGraph().getZoom(this.getGraph())
      ) {
        // eslint-disable-next-line no-console
        console.log(
          "No more zooming in: " + this.getGraph().getMaxZoom(this.getGraph())
        );
      } else {
        let CurrentZoom = this.getGraph().getZoom(this.getGraph()) + 0.1;
        this.getGraph().setZoom(this.getGraph(), CurrentZoom);
      }
    },

    ZoomMinus() {
      if (
        this.getGraph().getMinZoom(this.getGraph()) ===
        this.getGraph().getZoom(this.getGraph())
      ) {
        // eslint-disable-next-line no-console
        console.log(
          "No more zooming out: " + this.getGraph().getMinZoom(this.getGraph())
        );
      } else {
        let CurrentZoom = this.getGraph().getZoom(this.getGraph());
        CurrentZoom -= 0.1;
        this.getGraph().setZoom(this.getGraph(), CurrentZoom);
      }
    },

    ZoomOut() {
      this.getGraph().ZoomOut(this.getGraph());
      dialogComponent.dialogInfo("Graph wurde zentriert", 2000);
    }
  }
};
</script>
