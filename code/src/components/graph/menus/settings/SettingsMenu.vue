<template>
  <v-dialog v-model="dialog" max-width="750">
    <v-card class="settings-dialog hueshift">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <h1>Einstellungen</h1>
      </v-card-title>
      <v-tabs centered v-model="activeTab">
        <v-tab>
          <v-icon class="rot-270" left>mdi-graph</v-icon>Graph
        </v-tab>
        <v-tab>
          <v-icon left>mdi-cog</v-icon>Allgemein
        </v-tab>
        <v-tab>
          <v-icon left>mdi-checkbox-multiple-marked-circle-outline</v-icon>Optimierung
        </v-tab>
        <v-tab>
          <v-icon left>mdi-account</v-icon>Benutzer
        </v-tab>
        <v-tab>
          <v-icon left>mdi-help</v-icon>Hilfe
        </v-tab>

        <v-tab-item>
          <SettingsGraph ref="settingsGraph"></SettingsGraph>
        </v-tab-item>
        <v-tab-item>
          <SettingsGeneral ref="settingsGeneral"></SettingsGeneral>
        </v-tab-item>
        <v-tab-item>
          <SettingsOptimize ref="settingsOptimize"></SettingsOptimize>
        </v-tab-item>
        <v-tab-item>
          <SettingsAccount ref="settingsGeneral"></SettingsAccount>
        </v-tab-item>
        <v-tab-item>
          <SettingsHelp ref="settingsHelp"></SettingsHelp>
        </v-tab-item>
      </v-tabs>
      <v-card-actions class="pr-5 pb-5 mt-3">
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="saveSettings()">Anwenden</v-btn>
        <v-btn color="grey" text @click="dialog = false">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import SettingsGraph from "./SettingsGraph";
import SettingsAccount from "./SettingsAccount";
import SettingsOptimize from "./SettingsOptimize";
import SettingsGeneral from "./SettingsGeneral";
import SettingsHelp from "./SettingsHelp";
let dialogComponent;

export default {
  name: "SettingsMenu",
  components: {
    SettingsGraph,
    SettingsAccount,
    SettingsOptimize,
    SettingsGeneral,
    SettingsHelp
  },
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
  },
  data: () => ({
    activeTab: -1,
    dialog: false
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    setActiveTab(int) {
      // 0: Graph
      // 1: Allgemein
      // 2: Optimierung
      // 3: Benutzer
      // 4: Hilfe
      this.activeTab = int;
    },
    openDialog() {
      this.dialog = true;
    },
    saveSettings() {
      // if user clicks on save, but tab wasnt activated before -> type is undefined
      if (typeof this.$refs.settingsGraph !== "undefined") {
        this.$refs.settingsGraph.setGraphSettings();
        console.log("updated graph Settings:", this.getGraph())
      }
      if (typeof this.$refs.settingsOptimize !== "undefined") {
        this.$refs.settingsOptimize.setOptimizeSettings();
        console.log("updated optimize Settings:", this.getGraph())
      }
      // run update-settings function
      this.getGraph().applySettings(this.getGraph());
      this.dialog = false;
      dialogComponent.dialogSuccess("Einstellungen erfolgreich gespeichert");
    }
  }
};
</script>
