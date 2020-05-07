<template>
  <v-card flat>
    <v-card-text class="scrolling-container pb-10" style="max-height: 55vh">
      <v-card-subtitle>Grundeinstellungen</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-row>
          <v-col sm="10">
            <v-card-text>Nach jeder Optimierung das Fenster mit alternativen Wegen anzeigen</v-card-text>
          </v-col>
          <v-col sm="2">
            <v-switch
              v-model="alternativePopUp"
              ref="edgeShowCost"
              hide-details
              class="mt-3"
            ></v-switch>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "GeneralSettings",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data: () => ({
    alternativePopUp: false
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },

    getAlternativePopUp() {
      return this.alternativePopUp;
    },

    // get Settings
    getGeneralSettings() {
      // ...
    },

    // apply settings to cytoscape element
    setGeneralSettings() {
      // ...
    }
  }
};
</script>
