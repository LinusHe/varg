<template>
  <v-list-item three-line class="newgraph-container">
    <v-list-item-content>
      <v-list-item-title align="left" class="newgraph-headline mb-1">Neues Produkt</v-list-item-title>
      <p class="mt-4 mb-4">
        um einen neuen VARG-Variantengraph zu erstellen,
        musst du zunächst die Produkt-Ausgangsdaten eingeben:
      </p>
      <v-row>
        <v-col sm="7">
          <v-text-field id="prodname" placeholder="Produktname" outlined></v-text-field>
        </v-col>
        <v-col sm="5">
          <v-text-field id="prodquantity" placeholder="Stückzahl" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="7">
          <v-text-field id="prodfirststate" placeholder="Name des ersten Zustands" outlined></v-text-field>
        </v-col>
        <v-col sm="5">
          <router-link to="menu" tag="button">
            <v-btn block large color="primary">Starten</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NewGraph"
};
</script>