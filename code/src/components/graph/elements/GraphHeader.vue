<template>
  <div class="header-graph-container">
    <div id="headertext_out">
      <div id="headertext_in">
        <p align="left" id="header-prodName">
          Produkt:
          <span v-show="!isEditingName" @click="editName()">{{prodName}}</span>
          <input
            v-show="isEditingName"
            v-model="prodName"
            ref="nameInput"
            id="nameInput"
            value="prodName"
          />
          <v-icon
            v-if="!isEditingName"
            @click="editName()"
            color="lightgrey"
            class="ml-2 mb-3"
            small
          >mdi-pencil</v-icon>
          <v-icon v-else @click="saveNewName()" small dark color="green">mdi-check-bold</v-icon>
        </p>

        <p align="left" id="header-prodQuant">
          Anzahl:
          <span v-show="!isEditingQuant" @click="editQuant()">{{prodQuant}}</span>
          <input
            v-show="isEditingQuant"
            v-model="prodQuant"
            ref="quantInput"
            id="quantInput"
            value="prodQuant"
          />
          <v-icon
            v-if="!isEditingQuant"
            @click="editQuant()"
            color="lightgrey"
            class="ml-2 mb-3"
            small
          >mdi-pencil</v-icon>
          <v-icon v-else @click="saveNewQuant()" small dark color="green">mdi-content-save-edit</v-icon>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import graph from "@/vargraph/index.js";

export default {
  name: "GraphHeader",
  data() {
    return {
      prodName: "prodName",
      prodQuant: 0,
      isEditingName: false,
      isEditingQuant: false
    };
  },
  methods: {
    updateData(newProdName, newProdQuant) {
      this.prodName = newProdName;
      this.prodQuant = newProdQuant;
      this.saveNewName();
      this.saveNewQuant();
    },
    editName() {
      this.isEditingName = true;
      this.$nextTick(() => this.$refs.nameInput.focus());
    },
    saveNewName() {
      if (this.prodName != "") {
        this.isEditingName = false;
        graph.getCytoGraph().data("prodName", this.prodName);
      } else {
        alert("Bitte Namen eingeben");
      }
    },
    editQuant() {
      this.isEditingQuant = true;
      this.$nextTick(() => this.$refs.quantInput.focus());
    },
    saveNewQuant() {
      if (this.prodQuant != "" && !isNaN(this.prodQuant)) {
        this.isEditingQuant = false;
        graph.getCytoGraph().data("prodQuant", this.prodQuant);
      } else {
        alert("Bitte Zahl eingeben");
      }
    }
  } /*,
  mounted () {
    this.prodName = graph.getCytoGraph().data('prodName');
    this.prodQuant = graph.getCytoGraph().data('prodQuant');
  }*/
};
</script>
