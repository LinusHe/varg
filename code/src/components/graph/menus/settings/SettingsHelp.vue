<template>
  <v-card flat>
    <v-card-text class="scrolling-container pb-10" style="max-height: 55vh">
      <v-card-subtitle>Handbuch</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-row>
          <v-col class="pr-0 pl-6" sm="6">
            <v-card-text
              class="pr-0"
            >Handbuch herunterladen, um mehr über die Benutzung der WebApp zu erfahren</v-card-text>
          </v-col>
          <v-col sm="6">
            <v-card-text class="pr-6">
              <a href="handbuch.pdf" target="_blank">
                <v-btn large depressed color="primary" :value="false">
                  <v-icon>mdi-download</v-icon>Handbuch herunterladen
                </v-btn>
              </a>
            </v-card-text>
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
  name: "HelpSettings",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data: () => ({
    // ...
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },

    // get Settings
    getHelpSettings() {
      // ...
    },

    // apply settings to cytoscape element
    setHelpSettings() {
      // ...
    }
  }
};
</script>
