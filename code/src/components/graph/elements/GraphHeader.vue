<template>
  <div class="header-graph-container">
    <div id="headertext_out">
      <div id="headertext_in">
      <p align="left" id="header-prodName">
          Produkt:
          <span v-if="!isEditingName">{{prodName}}</span>
          <input v-else v-model="prodName" value="prodName">
          <v-btn v-if="!isEditingName" @click="isEditingName=true" fab dark small depressed color="primary">
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
          <v-btn v-else @click="saveNewName()" fab dark small depressed color="primary">
            <v-icon dark>mdi-content-save-edit</v-icon>
          </v-btn>
        </p>
        <p align="left" id="header-prodQuant">
          Anzahl:
          <span v-if="!isEditingQuant">{{prodQuant}}</span>
          <input v-else v-model="prodQuant" value="prodQuant">
          <v-btn v-if="!isEditingQuant" @click="isEditingQuant=true" fab dark small depressed color="primary">
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
          <v-btn v-else @click="saveNewQuant()" fab dark small depressed color="primary">
            <v-icon dark>mdi-content-save-edit</v-icon>
          </v-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import graph from '@/vargraph/index.js';

export default {
  name: 'GraphHeader',
  data () {
    return {
      prodName: 'prodName',
      prodQuant: 0,
      isEditingName: false,
      isEditingQuant: false
    };
  },
  methods: {
    updateData (newProdName, newProdQuant) {
      this.prodName = newProdName;
      this.prodQuant = newProdQuant;
      this.saveNewName();
      this.saveNewQuant();
    },
    saveNewName () {
      if (this.prodName != '') {
        this.isEditingName = false;
        graph.getCytoGraph().data('prodName', this.prodName);
      }
      else {
        alert('Bitte Namen eingeben');
      }
    },
    saveNewQuant () {
      if (this.prodQuant != '' && !isNaN(this.prodQuant)) {
        this.isEditingQuant = false;
        graph.getCytoGraph().data('prodQuant', this.prodQuant);
      }
      else {
        alert('Bitte Zahl eingeben');
      }
    }
  }/*,
  mounted () {
    this.prodName = graph.getCytoGraph().data('prodName');
    this.prodQuant = graph.getCytoGraph().data('prodQuant');
  }*/
}
</script>
