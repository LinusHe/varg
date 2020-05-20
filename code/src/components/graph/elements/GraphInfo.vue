<template>
  <v-row class="card-top pt-2 ma-0">
    <v-col sm="3" class="graph-info">
      <v-row>
        <v-card align="center" class="icon-card mt-2 ml-8 mb-2" width="60px" height="60px">
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
                :rules="[v => !!v || '', v => v.length <= 25 || '', v => v[0] != ' ' || '']"
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
        <v-card align="center" class="icon-card mt-2 ml-4" width="60px" height="60px">
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
                :rules="[v => !!v || '', v => v > 0 || '', v => v < 9999999999999999 || '', v => Number.isInteger(+v) || '']"
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
        <v-card align="center" class="icon-card mt-2 ml-4" width="60px" height="60px">
          <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-cash</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0">
            Gesamtkosten:
            <v-icon @click="openOptimize" color="#636364" class="ml-2 mb-1" small>mdi-cog</v-icon>
            <v-icon
              v-if="optimized"
              @click="startOptimizing"
              color="#636364"
              class="ml-2 mb-1"
              small
            >mdi-refresh</v-icon>
          </v-card-subtitle>
          <v-card-title v-if="optimized" class="pt-0 pb-0">{{costs}}</v-card-title>
          <v-btn
            v-if="!optimized"
            @click="startOptimizing"
            class="ml-4 pa-0"
            text
            color="#6c7dff"
          >Graph optimieren</v-btn>
        </p>
      </v-row>
    </v-col>

    <v-col sm="3">
      <v-row>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card align="center" class="icon-card mt-2 ml-4" width="60px" height="60px">
          <v-icon size="40px" class="mt-2" color="#6c7dff">mdi-clock-outline</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0">
            Gesamtzeit:
            <v-icon @click="openOptimize" color="#636364" class="ml-2 mb-1" small>mdi-cog</v-icon>
            <v-icon
              v-if="optimized"
              @click="startOptimizing"
              color="#636364"
              class="ml-2 mb-1"
              small
            >mdi-refresh</v-icon>
          </v-card-subtitle>
          <v-card-title v-if="optimized" class="pt-0 pb-0">{{time}}</v-card-title>
          <v-btn
            v-if="!optimized"
            @click="startOptimizing"
            class="ml-4 pa-0"
            text
            color="#6c7dff"
          >Graph optimieren</v-btn>
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
      validName: false,
      optimized: false,
      costs: "",
      time: ""
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
        this.prodQuant = +this.prodQuant;
        this.isEditingQuant = false;
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("prodQuant", this.prodQuant);
        dialogComponent.dialogSuccess("Stückzahl erfolgreich geändert");
        // remove optimization
        this.getGraph().removeOptimization();
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
    },
    scrollToAlternativeOptimizations() {
      this.$parent.$parent.$refs.settingsMenu.$refs.settingsOptimize.scrollToAlternatives();
    },
    setOptimized(bool) {
      this.optimized = bool;
    },

    runOptimization() {
      this.getGraph().optimizing();

      // get best path
      let bestPaths = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("bestPaths");

      // map costs
      this.costs =
        this.getGraph().getTotalCost(bestPaths[0]) +
        " " +
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsUnitCostSelection");

      // map time
      this.time =
        this.getGraph().getTotalTime(bestPaths[0]) +
        " " +
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsUnitTimeSelection");

      // set optimized
      this.optimized = true;

      // call ranking function in settingsOptimize.vue
      if (
        typeof this.$parent.$parent.$refs.settingsMenu.$refs
          .settingsOptimize !== "undefined"
      ) {
        this.$parent.$parent.$refs.settingsMenu.$refs.settingsOptimize.applyRanking();
      }

      // select best way
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationSelection", 0);

      // open dialog, if in settings enabled
      if (
        typeof this.$parent.$parent.$refs.settingsMenu.$refs.settingsGeneral !==
          "undefined" &&
        this.$parent.$parent.$refs.settingsMenu.$refs.settingsGeneral.getAlternativePopUp()
      ) {
        // open graph settings and scroll to alternative paths
        this.openOptimize();
        this.scrollToAlternativeOptimizations();
      }
    },

    startOptimizing() {
      console.log(
        "Länge der Startknoten: " +
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .data("settingsOptimizationStartNames").length
      );

      if (
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartNames").length != 0 &&
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationEndID") != -1
      ) {
        this.runOptimization();

        // notify with dialog
        dialogComponent.dialogSuccess(
          "Graph wurde erfolgreich optimiert." +
            "<br><em>Derzeit wird der beste Weg angezeigt.</em>" +
            "<br>Öffne die <b>Optimierungs-Einstellungen</b> für weitere Wege!",
          8000
        );
      } else if (
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartNames") == 0 &&
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationEndID") != -1
      ) {
        this.runOptimization();
        dialogComponent.dialogWarning(
          "Die Startzustände wurden automatisch eingestellt. Wenn du sie ändern möchtest öffne die Optimierungseinstellungen!",
          6000
        );
      } else if (
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationEndID") == -1 &&
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsOptimizationStartNames") != 0
      ) {
        this.runOptimization();
        dialogComponent.dialogWarning(
          "Der Endzustand wurde automatisch eingestellt. Wenn du ihn ändern möchtest öffne die Optimierungseinstellungen!",
          6000
        );
      } else {
        this.runOptimization();
        dialogComponent.dialogWarning(
          "Die Start- und Endzustände wurden automatisch eingestellt. Wenn du sie ändern möchtest öffne die Optimierungseinstellungen!",
          6000
        );
      }
    }
  }
};
</script>
