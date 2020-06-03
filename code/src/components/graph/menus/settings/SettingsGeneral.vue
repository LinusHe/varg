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
      <v-card-subtitle>Darkmode</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-row>
          <v-col sm="10">
            <v-card-text>Darkmode aktivieren</v-card-text>
          </v-col>
          <v-col sm="2">
            <v-switch
              v-model="darkmodeSetting"
              @change="toggleDarkmodeSetting"
              ref="toggleDarkmodeSetting"
              hide-details
              class="mt-3 darkmodetoggle"
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
import Darkmode from 'darkmode-js';
let dialogComponent;
export default {
  
  name: "GeneralSettings",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
      let darkmode = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["darkmode"];
    this.darkmodeSetting=darkmode.isActivatedSetting();
  },
  data: () => ({
    alternativePopUp: false,
    darkmodeSetting:false,
  }),
  methods: {
    toggleDarkmodeSetting() {
    let darkmode = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["darkmode"];
      darkmode.toggleDarkmode();
    },
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
