<template>
  <v-row class="card-top pt-2 ma-0">
    <v-col sm="3" class="graph-info">
      <v-row>
        <v-card align="center" class="icon-card mt-2 ml-8 mb-2" width="60px" height="60px">
          <v-icon size="40px" class="mt-2 darkmode-ign" color="#2699FB">mdi-rocket</v-icon>
        </v-card>
        <p class="mb-0 hueshift">
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
                :rules="[v => !!v || 'Bitte Produktnamen eingeben', v => (v || '').length <= 25 || 'Produktname ist zu lang', v => (v || '')[0] != ' ' || 'Produktname darf nicht mit Leerzeichen beginnen']"
              ></v-text-field>
            </v-form>
            <v-tooltip bottom v-if="!isEditingName">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-if="!isEditingName"
                  v-on="on"
                  @click="editName();"
                  color="lightgrey"
                  class="ml-2 mb-1 darkmode-ign"
                  small
                >mdi-pencil</v-icon>
              </template>
              <span>Produktname bearbeiten</span>
            </v-tooltip>
            <v-tooltip bottom v-if="isEditingName">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-if="isEditingName"
                  v-on="on"
                  @click="saveNewName()"
                  :disabled="!validName"
                  dark
                  color="success"
                  class="ml-2 darkmode-ign"
                >mdi-check-bold</v-icon>
              </template>
              <span>Speichern</span>
            </v-tooltip>
          </v-card-title>
        </p>
      </v-row>
    </v-col>

    <v-col sm="3">
      <v-row>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card align="center" class="icon-card mt-2 ml-4" width="60px" height="60px">
          <v-icon size="40px" class="mt-2 darkmode-ign" color="#2699FB">mdi-counter</v-icon>
        </v-card>
        <p class="mb-0 hueshift">
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
                :rules="[v => !!v || 'Bitte Stückzahl eingeben', v => v > 0 || 'Stückzahl ist zu klein', v => v < 9999999999999999 || 'Stückzahl ist zu groß', v => Number.isInteger(+v) || 'Stückzahl muss ganzzahlig sein']"
              ></v-text-field>
            </v-form>
            <v-tooltip bottom v-if="!isEditingQuant">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-if="!isEditingQuant"
                  @click="editQuant()"
                  v-on="on"
                  color="lightgrey"
                  class="ml-2 mb-1"
                  small
                >mdi-pencil</v-icon>
              </template>
              <span>Stückzahl bearbeiten</span>
            </v-tooltip>
            <v-tooltip bottom v-if="isEditingQuant">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-if="isEditingQuant"
                  @click="saveNewQuant()"
                  v-on="on"
                  :disabled="!validQuant"
                  dark
                  color="success"
                  class="ml-2 darkmode-ign"
                >mdi-check-bold</v-icon>
              </template>
              <span>Speichern</span>
            </v-tooltip>
          </v-card-title>
        </p>
      </v-row>
    </v-col>

    <v-col sm="3">
      <v-row>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card align="center" class="icon-card mt-2 ml-4" width="60px" height="60px">
          <v-icon size="40px" class="mt-2 darkmode-ign" v-bind:style="{ color: '#'+iconColorCost }">mdi-cash</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0" v-bind:style="{ color: '#'+iconColorCost }">
            Gesamtkosten:
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  id="cost-open-optimize"
                  v-on="on"
                  @click="openOptimize"
                  color="#636364"
                  class="ml-2 mb-1"
                  small
                >mdi-cog</v-icon>
              </template>
              <span>Optimieruns-Einstellungen öffnen</span>
            </v-tooltip>
            <v-tooltip top v-if="optimized">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-if="optimized"
                  v-on="on"
                  @click="runOptC"
                  color="#636364"
                  class="ml-2 mb-1"
                  small
                >mdi-refresh</v-icon>
              </template>
              <span>Erneut Optimieren</span>
            </v-tooltip>
          </v-card-subtitle>
          <v-card-title v-if="optimized" class="pt-0 pb-0">{{costs}}</v-card-title>
          <v-btn
            v-if="!optimized"
            @click="runOptC"
            class="ml-4 pa-0 darkmode-ign"
            text
            color="#2699FB"
          >Graph optimieren</v-btn>
        </p>
      </v-row>
    </v-col>

    <v-col sm="3">
      <v-row>
        <v-divider class="mx-4" vertical></v-divider>
        <v-card align="center" class="icon-card mt-2 ml-4" width="60px" height="60px" >
          <v-icon size="40px" class="mt-2 darkmode-ign" v-bind:style="{ color: '#'+iconColorTime }">mdi-clock-outline</v-icon>
        </v-card>
        <p class="mb-0">
          <v-card-subtitle class="pb-0" v-bind:style="{ color: '#'+iconColorTime }">
            Gesamtzeit:
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  id="time-open-optimize"
                  v-on="on"
                  @click="openOptimize"
                  color="#636364"
                  class="ml-2 mb-1"
                  small
                >mdi-cog</v-icon>
              </template>
              <span>Optimieruns-Einstellungen öffnen</span>
            </v-tooltip>
            <v-tooltip top v-if="optimized">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-on="on"
                  v-if="optimized"
                  @click="runOptT"
                  color="#636364"
                  class="ml-2 mb-1"
                  small
                >mdi-refresh</v-icon>
              </template>
              <span>Erneut Optimieren</span>
            </v-tooltip>
          </v-card-subtitle>
          <v-card-title v-if="optimized" class="pt-0 pb-0">{{time}}</v-card-title>
          <v-btn
            v-if="!optimized"
            @click="runOptT"
            class="ml-4 pa-0 darkmode-ign"
            text
            color="#2699FB"
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
      iconColorCost: "2699FB",
      iconColorTime: "2699FB"
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
      // Checks if menu formular was filled in correctly
      if (this.$refs.formName.validate()) {
        this.isEditingName = false;
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("prodName", this.prodName);
        dialogComponent.dialogSuccess("Produktname erfolgreich geändert");
        this.$store.commit("setCyProdName", this.prodName);
      } else if (this.prodName.length > 25) {
        dialogComponent.dialogError(
          "Produktname nicht geändert: <b>Bitte Namen mit maximal 25 Zeichen eingeben</b>"
        );
      } else if (this.prodName.length == 0) {
        dialogComponent.dialogError(
          "Produktname nicht geändert: <b>Bitte Namen eingeben</b>"
        );
      } else if ((this.prodName || '')[0] == ' ') {
        dialogComponent.dialogError(
          "Produktname nicht geändert: <b>Name darf nicht mit Leerzeichen beginnen</b>"
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
        this.$store.commit("setCyProdQuant", this.prodQuant);
      } else if (this.prodQuant.length == 0) {
        dialogComponent.dialogError(
          "Stückzahl nicht geändert: <b>Bitte Stückzahl eingeben</b>"
        );
      } else if (this.prodQuant < 1) {
        dialogComponent.dialogError(
          "Stückzahl nicht geändert: <b>Es sind nur positive Stückzahlen erlaubt</b>"
        );
      } else if (this.prodQuant > 9999999999999998) {
        dialogComponent.dialogError(
          "Stückzahl nicht geändert: <b>Stückzahl ist zu groß</b>"
        );
      } else if (!Number.isInteger(+this.prodQuant)) {
        dialogComponent.dialogError(
          "Stückzahl nicht geändert: <b>Stückzahl muss ganzzahlig sein</b>"
        );
      } 
    },
    openOptimize() {
      this.$parent.$parent.$refs.settingsMenu.setActiveTab(2);
      this.$parent.$parent.$refs.settingsMenu.openDialog();
      this.$nextTick(() => {
        this.$parent.$parent.$refs.settingsMenu.$refs.settingsOptimize.getNodeItemsName()
        this.$parent.$parent.$refs.settingsMenu.$refs.settingsOptimize.getOption() })
    },
    scrollToAlternativeOptimizations() {
      this.$parent.$parent.$refs.settingsMenu.$refs.settingsOptimize.scrollToAlternatives();
    },
    setOptimized(bool) {
      this.optimized = bool;
    },
    runOptC() {
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationOption", "optionCost")

      this.startOptimizing()
    },
    runOptT() {
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationOption", "optionTime")

      this.startOptimizing()
    },
    markOption() {
      if(this.getGraph().getCytoGraph(this.getGraph()).data("settingsOptimizationOption") == 'optionCost') {
        this.iconColorCost = "FF7675"
        this.iconColorTime = "2699FB"
      }
      else {
        this.iconColorTime = "FF7675"
        this.iconColorCost = "2699FB"
      }
    },
    runOptimization() {
      this.getGraph().optimizing();
      let option = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("settingsOptimizationOption")
      if(option == 'optionCost') {
        this.option = true
      }
      else {
        this.option = false
      }

      // get best path
      let bestPaths = this.getGraph()
        .getCytoGraph(this.getGraph())
        .data("bestPaths");

      // map costs
      this.costs =
        this.getGraph().getTotalCost(bestPaths[0]).toFixed(2) +
        " " +
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsUnitCostSelection")

      // map time
      this.time =
        this.getGraph().getTotalTime(bestPaths[0]) +
        " " +
        this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsUnitTimeSelection");



      switch(this.getGraph()
          .getCytoGraph(this.getGraph())
          .data("settingsUnitTimeSelection")){


          case "Sekunden" :
             this.time = this.toHHMMSS(parseInt(this.time) )
            break;
          case "Minuten" :
           this.time = this.toHHMMSS(parseInt(this.time) * 60)
            break;
          case "Stunden" :
             this.time = this.toHHMMSS(parseInt(this.time)* 60 *60)
            break;
          case "Tage" :
             this.time = this.toHHMMSS(parseInt(this.time) * 60 *60 * 24 )
            break;
          default:
            this.time = "etwas ist schief gelaufen"
      }


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

    toHHMMSS( seconds ) {seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + "d " : "";
        var hDisplay = h > 0 ? h + "h " : "";
        var mDisplay = m > 0 ? m + "m ": "";
        var sDisplay = s > 0 ? s +  "s ": "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
},

    startOptimizing() {
      this.markOption()

      console.log(
        "Startknoten: " +
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .data("settingsOptimizationStartNames")
      );



      if (!this.getGraph().hasQuickEdges(this.getGraph())) {
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
      } else {
        dialogComponent.dialogError(
          "Dein Graph enthält noch Bearbeitungsschritte mit unvollständigen Angaben. Bitte gib Kosten und Zeiten bei den gestrichelten Bearbeitungsschritte an!"
        );
      }
    }
  }
};
</script>
