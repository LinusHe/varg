<template>
  <v-list-item three-line class="newgraph-container">
    <v-list-item-content>
      <v-list-item-title
        align="center"
        class="newgraph-headline mb-1 font-weight-black"
      >Neues Produkt</v-list-item-title>
      <p class="mt-4 mb-8 font-weight-light" align="center">
        um einen neuen VarGraph zu erstellen,<br>
        musst du zunächst die Produkt-Ausgangsdaten eingeben:
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col sm="7">
            <v-text-field
              id="prodname"
              label="Produktname"
              v-model="prodname"
              counter="25"
              @keyup.enter="start()"
              :rules="[v => !!v || 'Fehlender Name', v => (v || '').length <= 25  ||'Name ist zu lang']"
            ></v-text-field>
          </v-col>
          <v-col sm="5">
            <v-text-field
              id="prodquantity"
              v-model="prodquant"
              label="Stückzahl"
              type="number"
              @keyup.enter="start()"
              :rules="[v => !!v || 'Feld darf nicht leer sein', v => v > 0 ||'mindestens 1', v => v < 9999999999999999 ||'bist du wahnsinnig!?']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col sm="3" class="mt-3">
            <v-btn
              @click="start()"
              :disabled="!valid"
              color="primary"
              text
              class="btn-creategraph"
            >Starten</v-btn>
          </v-col>
          <v-col sm="3" class="mt-3">
            <v-btn
              @click="back()"
              color="grey"
              text
              class="newgraph-btn-back"
            >Zurück</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "NewGraph",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      prodname: null,
      prodquant: null,
      valid: true
    };
  },
  methods: {
    start() {
      //Checks if menu formular was filled in correctly
      if (this.$refs.form.validate()) {
        
        // store name and quantity in store.js --> will be loaded in init.js
        this.$store.commit("setCyProdName", this.prodname);
        this.$store.commit("setCyProdQuant", this.prodquant);

        // go to graph page
        this.$router.push({ name: "graph" });
      }
    },
    back() {
      // go to home page
      this.$router.push({ name: "menu" });
    }
  }
};
</script>