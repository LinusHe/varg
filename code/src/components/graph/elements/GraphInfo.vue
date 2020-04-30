<template>
  <v-row class="card-top pt-2 ma-0">
    <v-col sm="3" class="graph-info">
      <v-row>
        <v-card align="center" class="mt-2 ml-8 mb-2" width="60px" height="60px">
          <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-rocket</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0">Produktname:</v-card-subtitle>
          <v-card-title class="pt-0 pb-0" id="header-prodName">
            <span v-show="!isEditingName" @click="editName()">{{prodName}}</span>
            <v-form
              ref="formName"
              v-model="validName"
              lazy-validation
              class="d-inline-block graphDataForm"
              @submit="saveNewName()"
              onsubmit="return false;"
            >
              <v-text-field
                id="nameInput"
                ref="nameInput"
                v-if="isEditingName"
                v-model="prodName"
                class="d-inline-block"
                dense
                hide-details
                counter="25"
                @submit="saveNewName()"
                v-on:blur="saveNewName()"
                :rules="[v => !!v || 'Fehlender Name', v => (v || '').length <= 25  ||'Name ist zu lang']"
              ></v-text-field>
            </v-form>
            <v-icon
              v-if="!isEditingName"
              @click="editName()"
              color="lightgrey"
              class="ml-2 mb-1"
              small
            >mdi-pencil</v-icon>
            <v-icon
              v-else
              @click="saveNewName()"
              :disabled="!validName"
              dark
              color="success"
              class="ml-2"
            >mdi-check-bold</v-icon>
          </v-card-title>
        </p>
      </v-row>
    </v-col>

    <v-col sm="3">
      <v-row>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card align="center" class="mt-2 ml-4" width="60px" height="60px">
          <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-counter</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0">Stückzahl:</v-card-subtitle>
          <v-card-title class="pt-0 pb-0" id="header-prodQuant">
            <span v-show="!isEditingQuant" @click="editQuant()">{{prodQuant}}</span>
            <v-form
              ref="formQuant"
              v-model="validQuant"
              lazy-validation
              class="d-inline-block graphDataForm"
              @submit="saveNewQuant()"
              onsubmit="return false;"
            >
              <v-text-field
                v-if="isEditingQuant"
                v-model="prodQuant"
                ref="quantInput"
                id="quantInput"
                value="prodQuant"
                class="d-inline-block"
                dense
                hide-details
                type="number"
                width="100px"
                v-on:blur="saveNewQuant()"
                :rules="[v => !!v || 'Feld darf nicht leer sein', v => v > 0 ||'mindestens 1', v => v < 9999999999999999 ||'bist du wahnsinnig!?']"
              ></v-text-field>
            </v-form>
            <v-icon
              v-if="!isEditingQuant"
              @click="editQuant()"
              color="lightgrey"
              class="ml-2 mb-1"
              small
            >mdi-pencil</v-icon>
            <v-icon
              v-else
              @click="saveNewQuant()"
              :disabled="!validQuant"
              dark
              color="success"
              class="ml-2"
            >mdi-check-bold</v-icon>
          </v-card-title>
        </p>
      </v-row>
    </v-col>

    <v-col sm="3">
      <v-row>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card align="center" class="mt-2 ml-4" width="60px" height="60px">
          <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-cash</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0">
            Gesamtkosten:
            <v-icon @click="openOptimize" color="#636364" class="ml-2 mb-1" small>mdi-cog</v-icon>
          </v-card-subtitle>
          <v-card-title class="pt-0 pb-0">1546,5€</v-card-title>
        </p>
      </v-row>
    </v-col>

    <v-col sm="3">
      <v-row>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card align="center" class="mt-2 ml-4" width="60px" height="60px">
          <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-clock-outline</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0">
            Gesamtzeit:
            <v-icon @click="openOptimize" color="#636364" class="ml-2 mb-1" small>mdi-cog</v-icon>
          </v-card-subtitle>
          <v-btn @click="startOptimizing" class="ml-4 pa-0" text color="#6c7dff">Graph optimieren</v-btn>
        </p>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable standard/computed-property-even-spacing */
/* eslint-disable no-unused-vars */
let dialogComponent;

export default {
  name: "GraphInfo",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
  },
  data() {
    return {
      prodName: null,
      prodQuant: null,
      isEditingName: false,
      isEditingQuant: false,
      validQuant: false,
      validName: false
    };
  },
  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    refresh() {
      this.prodName = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("prodName");
      this.prodQuant = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("prodQuant");
    },
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
      //Checks if menu formular was filled in correctly
      if (this.$refs.formName.validate()) {
        this.isEditingName = false;
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("prodName", this.prodName);
        dialogComponent.dialogSuccess("Produktname erfolgreich geändert");
      } else if (this.prodName.length > 25) {
        dialogComponent.dialogError(
          "Produktname nicht geändert: <b>Bitte Namen mit maximal 25 Zeichen eingeben</b>"
        );
      } else if (this.prodName.length == 0) {
        dialogComponent.dialogError(
          "Produktname nicht geändert: <b>Bitte Namen eingeben</b>"
        );
      }
    },
    editQuant() {
      this.isEditingQuant = true;
      this.$nextTick(() => this.$refs.quantInput.focus());
    },
    saveNewQuant() {
      if (this.$refs.formQuant.validate()) {
        this.isEditingQuant = false;
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("prodQuant", this.prodQuant);
        dialogComponent.dialogSuccess("Stückzahl erfolgreich geändert");
      } else if (this.prodQuant.length == 0) {
        dialogComponent.dialogError(
          "Stückzahl nicht geändert: <b>Bitte Stückzahl eingeben</b>"
        );
      } else if (this.prodQuant < 1) {
        dialogComponent.dialogError(
          "Stückzahl nicht geändert: <b>Es sind nur positive Stückzahlen erlaubt</b>"
        );
      }
    },
    openOptimize() {
      this.$parent.$parent.$refs.settingsMenu.setActiveTab(2);
      this.$parent.$parent.$refs.settingsMenu.openDialog();
      // this.$parent.$parent.$refs["optimizeControls"].setDialog(true);
    },
    startOptimizing() {
      this.$parent.$parent.$refs["optimizeControls"].optimizing();
    }
  }
};
</script>
