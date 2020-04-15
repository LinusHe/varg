<template>
  <v-list-item three-line class="homemenu-container" align="center">
    <v-list-item-content>
      <v-list-item-title align="center" class="login-pre-headline mt-5">Variantengraph-Editor</v-list-item-title>
      <v-list-item-title align="center" class="login-headline mb-1">varg</v-list-item-title>
      <v-row class="button-container">
        <v-col sm="4">
          <v-card outlined align="center">
            <router-link to="new" tag="button" id="newGraph">
              <v-btn depressed fab color="primary" class="mt-4">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
          </v-card>
          <a>Neuen Graphen erstellen</a>
        </v-col>

        <v-col sm="4">
          <v-card outlined align="center">
            <v-btn depressed fab color="primary" class="mt-4">
              <v-icon>mdi-import</v-icon>
            </v-btn>
          </v-card>
          <a>Graphen importieren</a>
        </v-col>

        <v-col sm="4">
          <v-card outlined align="center">
            <router-link to="database" tag="button" id="database">
              <v-btn depressed fab color="primary" class="mt-4">
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
export default {
  name: "Menu"
};
</script>