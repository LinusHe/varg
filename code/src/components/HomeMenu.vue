<template>
  <v-container fill-height grid-list-md class="homemenu-container">
    <v-layout row wrap align-center>
      <v-card class="login-card mx-auto mb-4" max-width="600" align="center">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title align="center" class="login-pre-headline mt-5">Variantengraph-Editor</v-list-item-title>
            <v-list-item-title align="center" class="login-headline mb-1">varg</v-list-item-title>
            <v-row class="button-container">

              <v-col sm="4">
                <v-card outlined align="center">
                  <router-link to="/graph" tag="button">
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
                  <router-link to="/database" tag="button">
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
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Menu"
};
</script>