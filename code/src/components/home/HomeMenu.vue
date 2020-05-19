<template>
  <v-list-item three-line class="homemenu-container" align="center">
    <v-list-item-content>
      <v-list-item-title align="center" class="login-pre-headline mt-5 mb-3 darkmode-ign">Variantengraph-Editor</v-list-item-title>
      <v-list-item-title align="center" class="login-headline mb-1 darkmode-ign">VarG</v-list-item-title>
      <v-row class="button-container">
        <v-col sm="4">
          <v-card outlined align="center">
            <router-link to="new" tag="button" id="newGraph">
              <v-btn depressed fab color="primary" class="mt-4 darkmode-ign">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-card>
          <a>Neuen Graphen erstellen</a>
        </v-col>

        <v-col sm="4">
          <v-card outlined align="center">
            <v-btn :loading="loading" depressed fab :color="importBtnColor" @click="openFromFile()" class="mt-4 darkmode-ign">
              <v-icon>mdi-import</v-icon>
            </v-btn>
            <input type="file" ref="file" accept=".json" style="display: none" />
          </v-card>
          <a>Graphen importieren</a>
        </v-col>

        <v-col sm="4">
          <v-card outlined align="center">
            <router-link to="database" tag="button" id="database">
              <v-btn depressed fab color="primary" class="mt-4 darkmode-ign">
                <v-icon>mdi-database-export</v-icon>
              </v-btn>
            </router-link>
          </v-card>
          <a>Vorlage aus Datenbank öffnen</a>
        </v-col>
      </v-row>

      <p align="center" class="login-bottom-links mt-10" color="lightgrey">
        <a>Backend</a> |
        <a>Impressum</a> |
        <a>Datenschutz</a>
      </p>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import fileManager from "../../vargraph/importExport/FileManager";

let dialogComponent;

export default {
  name: "Menu",
  data() {
    return {
      loading: false,
      importBtnColor: "primary",
    };
  },
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  methods: {
    openFromFile() {
      this.$refs.file.click();
      this.loading = true;
      this.importBtnColor = "warning";

      this.loading = true;

      this.$refs.file.addEventListener("change", onChange);
      this.$store.commit(
        "setCyProdName",
        "Importiertes Produkt wird geladen..."
      );
      function onChange(event) {
        
        fileManager.loadGraphFromJson(event, null);
        dialogComponent.dialogSuccess("Graph erfolgreich geladen");
      }
      
    }
  }
};
</script>