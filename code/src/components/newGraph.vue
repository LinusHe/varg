<template>
  <v-list-item three-line class="newgraph-container">
    <v-list-item-content>
      <v-list-item-title
        align="center"
        class="newgraph-headline mb-1 font-weight-black"
      >Neues Produkt</v-list-item-title>
      <p class="mt-4 mb-8 font-weight-light" align="center">
        um einen neuen VARG-Variantengraph zu erstellen,
        musst du zunächst die Produkt-Ausgangsdaten eingeben:
      </p>

      <v-col sm="7">
        <v-text-field
          id="prodname"
          label="Produktname"
          counter="25"
          error-message="Produktname ist zu lang"
        ></v-text-field>
      </v-col>
      <v-col sm="5">
        <v-text-field id="prodquantity" label="Stückzahl"></v-text-field>
      </v-col>

      <v-col sm="7">
        <v-text-field id="prodfirststate" label="Name des ersten Zustands"></v-text-field>
      </v-col>
      <v-col sm="5">
        <router-link to="/graph" tag="button" class="btn-creategraph-link" block>
          <v-btn block large color="primary" class="btn-creategraph">Starten</v-btn>
        </router-link>
      </v-col>

      <v-row>
        <a class="additional-state"><v-icon>mdi-plus</v-icon> weiteren Erstzustand anlegen</a>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>

<script>

export default {
  name: "NewGraph"
};
</script>