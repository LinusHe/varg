<template>
  <div class="header-graph-container" id="graph-header">
    <!-- <div id="headertext_out">
      <div id="headertext_in">
        <v-row>
          <p align="left" id="header-prodName">
            Produkt:
            <span v-show="!isEditingName" @click="editName()">{{prodName}}</span>
            <v-form
              ref="formName"
              v-model="validName"
              lazy-validation
              class="d-inline-block"
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
              class="ml-2 mb-3"
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
          </p>
        </v-row>
        <v-row>
          <p align="left" id="header-prodQuant">
            Anzahl:
            <span v-show="!isEditingQuant" @click="editQuant()">{{prodQuant}}</span>
            <v-form
              ref="formQuant"
              v-model="validQuant"
              lazy-validation
              class="d-inline-block"
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
                v-on:blur="saveNewQuant()"
                :rules="[v => !!v || 'Feld darf nicht leer sein', v => v > 0 ||'mindestens 1', v => v < 9999999999999999 ||'bist du wahnsinnig!?']"
              ></v-text-field>
            </v-form>
            <v-icon
              v-if="!isEditingQuant"
              @click="editQuant()"
              color="lightgrey"
              class="ml-2 mb-3"
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
          </p>
        </v-row>
      </div>
    </div>-->
    <v-row>
      <v-col align="left" sm="1"><h1 class="headline mb-1">varg</h1></v-col>

      <v-col align="center">
        <v-btn outlined tile color="#b9c5ff">
          <v-icon dark>mdi-plus</v-icon>
          Neuer Graph
        </v-btn>
        <v-btn outlined tile color="#b9c5ff">
          <v-icon class="mr-1">mdi-database</v-icon>
          Datenbank
        </v-btn>
        <v-btn outlined tile color="#b9c5ff">
          <v-icon class="mr-1">mdi-import</v-icon>
          Import
        </v-btn>
        <v-btn outlined tile color="#b9c5ff">
          <v-icon class="mr-1">mdi-export</v-icon>
          Export
        </v-btn>
        <v-btn outlined tile color="#b9c5ff">
          <v-icon class="mr-1">mdi-cog</v-icon>
          Einstellungen
        </v-btn>
      </v-col>

      <v-col align="right" sm="1">
        <v-avatar color="red">
          <span class="white--text headline">CJ</span>
        </v-avatar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  /* eslint-disable no-unused-vars */
  let dialogComponent;

  export default {
    mounted: function () {
      dialogComponent = this.$parent.$parent.$parent.$parent.$refs["dialogs"];
    },
    name: "GraphHeader",
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
        return this.$parent.$refs["vargraph"];
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
      }
    }
  };
</script>
