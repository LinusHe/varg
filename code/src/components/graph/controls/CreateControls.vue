/* eslint-disable no-undef */
<template>
  <div class="create-controls-container">
    <!-- Selection-Button -->
    <div class="create-controls">
      <v-speed-dial
        v-model="fab"
        bottom
        right
        direction="top"
        transition="slide-y-reverse-transition"
        id="dial-open"
      >
        <template v-slot:activator>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                class="darkmode-ign blackbtngraph"
                v-model="fab"
                v-on="on"
                color="primary"
                dark
                fab
                large
              >
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Erstellen</span>
          </v-tooltip>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="openNodeGui"
              v-on="on"
              fab
              dark
              color="secondary"
              id="dial-add-node"
              class="darkmode-ign"
            >
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Neues Teil</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="openEdgeGui"
              v-on="on"
              fab
              dark
              color="secondary"
              id="dial-add-edge"
              class="darkmode-ign"
            >
              <v-icon>mdi-link-variant-plus</v-icon>
            </v-btn>
          </template>
          <span>Neuer Bearbeitungsschritt</span>
        </v-tooltip>
      </v-speed-dial>
    </div>

    <!-- CREATE NODE - CONTROLS -->
    <div ref="createNodes" @keyup.esc="deactivateGui()" tabindex="0">
      <!-- Create-Zustand Controls -->
      <v-slide-x-reverse-transition>
        <v-card
          class="detail-card"
          id="node-create"
          v-show="nodeCreateGui"
          transition="scroll-y-transition"
        >
          <!-- Colored Div -->
          <div
            class="white--text align-end darkmode-ign"
            style="height: 150px"
            v-bind:style="{ background: '#'+nodeCreateColor }"
            v-ripple
          >
            <v-card-subtitle style="color: #ffffff" class="pb-0">Neues Teil:</v-card-subtitle>
            <v-card-title class="pt-12">{{showNodeTitle}}</v-card-title>
            <!-- Color Selection -->
            <v-row class="radio-row">
              <v-col sm="12" class="pb-0 pt-0 pl-5">
                <div class="radio-container">
                  <v-radio-group v-model="nodeCreateColor" id="nodeCreateColor" row required>
                    <!-- Attention: If you change the color, change also the corresponding color in the color-class
                    in the src/styles/components/DetailControls.less-->
                    <v-radio checked="checked" class="color-radio-1" color="#2699FB" value="2699FB"></v-radio>
                    <v-radio class="color-radio-2" color="#00CEC9" value="00CEC9"></v-radio>
                    <v-radio class="color-radio-3" color="#6C5CE7" value="6C5CE7"></v-radio>
                    <v-radio class="color-radio-4" color="#FD79A8" value="FD79A8"></v-radio>
                    <v-radio class="color-radio-5" color="#FF7675" value="FF7675"></v-radio>
                    <v-radio class="color-radio-6" color="#FAB1A0" value="FAB1A0"></v-radio>
                    <v-radio class="color-radio-7" color="#FDCB6E" value="FDCB6E"></v-radio>
                    <v-radio class="color-radio-8" color="#FFEAA7" value="FFEAA7"></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
            </v-row>
          </div>
          <v-btn class="btn-close ma-2" @click="cancel()" text icon color="#ffffff">
            <v-icon color="#ffffff">mdi-close</v-icon>
          </v-btn>

          <v-form
            ref="formNodes"
            v-model="validNodes"
            lazy-validation
            class="d-inline-block mr-5 ml-5 mb-4 hueshift"
            @submit="createNode()"
            onsubmit="return false;"
          >
            <!-- Name Selection -->
            <v-row>
              <v-col sm="12">
                <v-text-field
                  class="mt-2"
                  id="nodeCreateName"
                  label="Bezeichnung"
                  v-model="nodeCreateName"
                  :rules="nameNodeRules"
                  @input="generateNodeShort()"
                  @keyup.enter="createNode()"
                  @focus="getNodeItemsName()"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Shortcut & Icon Upload -->
            <v-row>
              <v-col sm="3">
                <v-text-field
                  id="nodeCreateShort"
                  label="Kürzel"
                  v-model="nodeCreateShort"
                  :rules="shortRules"
                  @keyup.enter="createNode()"
                ></v-text-field>
              </v-col>
              <v-col sm="9">
                <v-text-field
                  id="nodeCreateImgPath"
                  label="Icon/Bild"
                  v-model="nodeCreateImgPath"
                  clearable
                  @keyup.enter="createNode()"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Create Buttons -->
            <v-row justify="end">
              <v-col sm="4">
                <v-btn
                  class="darkmode-ign"
                  :disabled="!validNodes"
                  color="green darken-1"
                  text
                  id="btn-create-node"
                  @click="createNode()"
                >Hinzufügen</v-btn>
              </v-col>
              <v-col sm="4">
                <v-btn color="grey" text id="btn-cancel-node" @click="cancel()">Abbrechen</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-slide-x-reverse-transition>
    </div>

    <!-- CREATE EDGE - CONTROLS -->
    <div ref="createEdges" @keyup.esc="deactivateGui()" tabindex="0">
      <!-- Create-Edge Controls -->
      <v-slide-x-reverse-transition>
        <v-card
          id="edge-create"
          class="detail-card"
          v-show="edgeCreateGui"
          transition="scroll-y-transition"
        >
          <v-btn class="btn-close ma-2" @click="cancel()" text icon color="primary">
            <v-icon color="#ffffff">mdi-close</v-icon>
          </v-btn>

          <!-- Colored Div -->
          <div
            class="white--text align-end darkmode-ign"
            style="background: #2699FB; background-color: #2699FB"
          >
            <v-card-subtitle style="color: #ffffff" class="pb-0">Neuer Bearbeitungsschritt:</v-card-subtitle>
            <v-card-title class="pt-12">{{showEdgeTitle}}</v-card-title>
            <v-row class="mr-2 ml-2">
              <v-col sm="6" class="pt-0 pb-0">
                <v-btn
                  style="border-radius: 15px 15px 0 0"
                  v-show="edgeFormStep==1"
                  depressed
                  tile
                  block
                  color="#ffffff"
                >Allgemein</v-btn>
                <v-btn
                  style="border-radius: 15px 15px 0 0"
                  v-show="edgeFormStep==2"
                  depressed
                  tile
                  block
                  color="primary darken-1"
                  @click="changeEdgeFormStep(1)"
                >Allgemein</v-btn>
              </v-col>
              <v-col sm="6" class="pt-0 pb-0">
                <v-btn
                  style="border-radius: 15px 15px 0 0"
                  v-show="edgeFormStep==1"
                  depressed
                  tile
                  block
                  color="primary darken-1"
                  @click="changeEdgeFormStep(2)"
                  :disabled="!validEdges1"
                >Zeit & Kosten</v-btn>
                <v-btn
                  style="border-radius: 15px 15px 0 0"
                  v-show="edgeFormStep==2"
                  depressed
                  tile
                  block
                  color="#ffffff"
                >Zeit & Kosten</v-btn>
              </v-col>
            </v-row>
          </div>

          <div style="min-height: 305px">

            <!-- STEP 1 - PAGE -->
            <v-slide-x-reverse-transition>
              <div v-show="edgeFormStep == 1" ref="scrollingContainer">
                <v-form
                  ref="formEdges1"
                  v-model="validEdges1"
                  lazy-validation
                  class="d-inline-block mr-5 ml-5 mb-4 hueshift"
                  @submit="createEdge()"
                  onsubmit="return false;"
                  style="max-height: 300px; overflow: scroll-y"
                >
                  <!-- Name Selection -->
                  <v-row>
                    <v-col sm="9">
                      <v-text-field
                        class="mt-2"
                        id="edgeCreateName"
                        label="Bezeichnung"
                        v-model="edgeCreateName"
                        :rules="nameEdgeRules"
                        @input="generateEdgeShort()"
                        @keyup.enter="createEdge()"
                        @focus="getEdgeItemsName()"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="3">
                      <v-text-field
                        class="mt-2"
                        id="edgeCreateShort"
                        label="Kürzel"
                        v-model="edgeCreateShort"
                        :rules="shortRules"
                        @keyup.enter="createEdge()"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!-- Start und Endzustand -->
                  <v-row>
                    <v-col sm="12">
                      <v-select
                        @focus="getNodeItemsID(); getNodeItemsName()"
                        @change="validateStartEnd()"
                        v-model="startSelect"
                        id="Startzustand"
                        ref="startzustand"
                        :items="itemsName"
                        :rules="startRules"
                        label="Startzustand"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="12">
                      <v-select
                        @focus="getNodeItemsID(); getNodeItemsName()"
                        @change="validateStartEnd()"
                        v-model="endSelect"
                        id="Endzustand"
                        ref="endzustand"
                        :items="itemsName"
                        :rules="endRules"
                        label="Endzustand"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-slide-x-reverse-transition>

            <!-- EDGE-STEP 2 - PAGE -->
            <v-slide-x-transition>
              <div
                style="position: absolute; top: 136px"
                v-show="edgeFormStep == 2"
                ref="scrollingContainer"
              >
                <v-form
                  ref="formEdges2"
                  v-model="validEdges2"
                  lazy-validation
                  class="d-inline-block mr-5 ml-5 mb-4 hueshift"
                  @submit="createEdge()"
                  onsubmit="return false;"
                  style="max-height: 300px; overflow: scroll-y"
                >
                  <!-- Time & Costs  -->
                  <v-row>
                    <v-col sm="6">
                      <v-text-field
                        id="edgeCreateCosts"
                        label="Kosten / Stück"
                        :suffix="unitCost"
                        type="number"
                        v-model="edgeCreateCosts"
                        :rules="costRules"
                        @keyup.enter="createEdge()"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="6">
                      <v-text-field
                        id="edgeCreateTime"
                        label="Zeit / Stück"
                        :suffix="unitTime"
                        type="number"
                        v-model="edgeCreateTime"
                        :rules="timeRules"
                        @keyup.enter="createEdge()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col sm="6">
                      <v-text-field
                        id="edgeCreatesuCosts"
                        label="Rüstkosten"
                        :suffix="unitCost"
                        type="number"
                        v-model="edgeCreatesuCosts"
                        :rules="suCostRules"
                        @keyup.enter="createEdge()"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="6">
                      <v-text-field
                        id="edgeCreatesuTime"
                        label="Rüstzeit"
                        :suffix="unitTime"
                        type="number"
                        v-model="edgeCreatesuTime"
                        :rules="suTimeRules"
                        @keyup.enter="createEdge()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- LotSize  -->
                  <v-row>
                    <v-col sm="6">
                      <v-text-field
                        id="edgeCreateLotSize"
                        label="Losgröße"
                        type="number"
                        suffix="Stück"
                        v-model="edgeCreateLotSize"
                        @keyup.enter="createEdge()"
                        :rules="lotSizeRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-slide-x-transition>
          </div>

          <!-- Create Buttons -->
          <v-row class="mb-4" justify="end">
            <v-col v-show="edgeFormStep == 1" sm="4">
              <v-btn
                class="darkmode-ign"
                :disabled="!validEdges1"
                color="green darken-1"
                text
                id="btn-create-edge"
                @click="changeEdgeFormStep(2)"
              >Weiter</v-btn>
            </v-col>
            <v-col v-show="edgeFormStep == 2" sm="4">
              <v-btn
                class="darkmode-ign"
                :disabled="!validEdges2"
                color="green darken-1"
                text
                id="btn-create-edge"
                @click="createEdge()"
              >Hinzufügen</v-btn>
            </v-col>
            <v-col sm="4">
              <v-btn color="grey" text id="btn-cancel-edge" @click="cancel()">Abbrechen</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-slide-x-reverse-transition>
    </div>
  </div>
</template>

<script>
import cyStore from "@/vargraph/graph/cyStore";
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "CreateControls",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
  },
  data() {
    return {
      nodeCreateGui: false,
      nodeCreateName: "",
      nodeCreateShort: "",
      nodeCreateImgPath: "",
      nodeCreateColor: "2699FB",
      edgeCreateGui: false,
      edgeFormStep: 1,
      edgeCreateName: "",
      edgeCreateShort: "",
      edgeCreateCosts: "",
      edgeCreateTime: "",
      edgeCreatesuCosts: "",
      edgeCreatesuTime: "",
      edgeCreateLotSize: "",
      unitCost: "€",
      unitTime: "Sek",
      itemsName: [],
      itemsID: [],
      edgeNames: [],
      startSelect: "",
      endSelect: "",
      fab: false,
      showNodeTitle: "Erstelle einen Zustand",
      showEdgeTitle: "Erstelle eine Verknüpfung",
      validNodes: false,
      validEdges1: false,
      validEdges2: false,
      clickX: 500,
      clickY: 300,
      nameNodeRules: [
        v => !!v || "Zustandsname wird benötigt",
        v => (v && v.length <= 18) || "Name ist zu lang",
        v => !this.itemsName.includes(v) || "Name ist bereits vergeben"
      ],
      nameEdgeRules: [
        v => !!v || "Verknüpfungsname wird benötigt",
        v => (v && v.length <= 18) || "Name ist zu lang",
        v => !this.edgeNames.includes(v) || "Name ist bereits vergeben"
      ],
      shortRules: [
        v => !!v || "Kürzel wird benötigt",
        v => (v && v.length <= 3) || "Kürzel ist zu lang"
      ],
      imgRules: [
        v => !v || v.match(/\.(jpeg|jpg|gif|png)$/) || "Falsches Format"
      ],
      costRules: [
        v => !!v || "Kosten werden benötigt",
        v => v >= 0 || "Darf nicht negativ sein"
      ],
      timeRules: [
        v => !!v || "Zeit werden benötigt",
        v => v >= 0 || "Darf nicht negativ sein"
      ],
      suCostRules: [
        v => !!v || "Rüstkosten werden benötigt",
        v => v >= 0 || "Darf nicht negativ sein"
      ],
      suTimeRules: [
        v => !!v || "Rüstzeit werden benötigt",
        v => v >= 0 || "Darf nicht negativ sein"
      ],
      startRules: [v => !!v || "Startzustand wird benötigt"],
      endRules: [
        v => !!v || "Endzustand wird benötigt",
        v =>
          v != this.startSelect ||
          "Endzustand muss sich vom Startzustand unterscheiden"
      ],
      lotSizeRules: [
        v => !!v || "Losgröße wird benötigt",
        v => v > 0 || "Darf nicht negativ sein",
        v => v < 9999999999999999 || "bist du dir sicher?",
        v => Number.isInteger(+v) || "Nur ganzzahlige Werte!"
      ]
    };
  },
  methods: {
    /**
     * Another approach might have been to convert ../vargraph/graph/cyStore.js to a vuex store and use subscribe() to monitor changes.
     * Unfortunately this would need many changes throughout our code and at this point success cannot be guaranteed.
     * Godspeed!
     */
    backupGraph() { //saves current graph to store
      this.$store.commit("saveGraph", cyStore.data.cy.json());
    },
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    getNodeCreateGui() {
      return this.nodeCreateGui;
    },
    getEdgeCreateGui() {
      return this.edgeCreateGui;
    },
    checkImg(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    },
    setNodePos(x, y) {
      this.clickX = x;
      this.clickY = y;
      this.backupGraph();
    },
    setStart(start) {
      this.startSelect = start;
      this.backupGraph();
    },
    setEnd(end) {
      this.endSelect = end;
      this.backupGraph();
    },
    generateNodeShort() {
      if (this.nodeCreateName != null) {
        if (this.nodeCreateName.length > 0 && this.nodeCreateName != " ") {
          let words = this.nodeCreateName.split(" ");
          if (words.length >= 2 && words.length <= 3) {
            this.nodeCreateShort = words
              .map(words => words[0])
              .join("")
              .toUpperCase();
          } else if (words.length == 1) {
            this.nodeCreateShort = this.nodeCreateName
              .substring(0, 3)
              .toUpperCase();
          }
        }
        if (this.nodeCreateName.length <= 18) {
          this.showNodeTitle = this.nodeCreateName;
        }
      }
    },
    generateEdgeShort() {
      if (this.edgeCreateName != null) {
        if (this.edgeCreateName.length > 0 && this.edgeCreateName != " ") {
          let words = this.edgeCreateName.split(" ");
          if (words.length >= 2 && words.length <= 3) {
            this.edgeCreateShort = words
              .map(words => words[0])
              .join("")
              .toUpperCase();
          } else if (words.length == 1) {
            this.edgeCreateShort = this.edgeCreateName
              .substring(0, 3)
              .toUpperCase();
          }
        }
        if (this.edgeCreateName.length <= 18) {
          this.showEdgeTitle = this.edgeCreateName;
        }
      }
    },
    deactivateGui() {
      this.nodeCreateGui = false;
      this.edgeCreateGui = false;
      this.fab = false;
      this.edgeFormStep = 1;
    },
    changeEdgeFormStep(step) {
      if (this.edgeFormStep == 1) {
        // validate form step 1
        if (this.$refs.formEdges1.validate()) {
          this.edgeFormStep = step;
        }
      } else if (this.edgeFormStep == 2) {
        // step 2 need no validation
        this.edgeFormStep = step;
      }
    },
    openNodeGui() {
      this.$parent.$parent.$refs.detailControls.deactivateGui();
      this.nodeCreateGui = true;
      this.edgeCreateGui = false;
      this.$refs.createNodes.focus();
    },
    openEdgeGui() {
      this.$parent.$parent.$refs.detailControls.deactivateGui();
      this.nodeCreateGui = false;
      this.edgeCreateGui = true;
      this.$refs.createEdges.focus();
      this.getUnits();
    },
    getUnits() {
      this.unitCost = this.getGraph()
        .getCytoGraph()
        .data("settingsUnitCostSelection");
      this.unitTime = this.getGraph()
        .getCytoGraph()
        .data("settingsUnitTimeSelection");
    },
    getNodeItemsID() {
      this.itemsID = this.getGraph().getNodeID(this.getGraph());
    },
    getNodeItemsName() {
      this.itemsName = this.getGraph().getNodeName(this.getGraph());
      console.log(this.itemsName);
    },
    getEdgeItemsName() {
      this.edgeNames = this.getGraph().getEdgeName(this.getGraph());
    },
    createEdge() {
      if (this.$refs.formEdges2.validate()) {
        let newcost = parseFloat(this.edgeCreateCosts);
        let newtime = parseFloat(this.edgeCreateTime);
        let newsucost = parseFloat(this.edgeCreatesuCosts);
        let newsutime = parseFloat(this.edgeCreatesuTime);
        let newlotsize = parseFloat(this.edgeCreateLotSize);

        if (newcost < 0 || newtime < 0 || newsucost < 0 || newsutime < 0) {
          alert("You can't use negative numbers");
          return;
        }

        let indexStart = this.itemsName.indexOf(this.startSelect);
        let startID = this.itemsID[indexStart];
        let indexEnd = this.itemsName.indexOf(this.endSelect);
        let endID = this.itemsID[indexEnd];

        this.getGraph().createEdge(
          this.getGraph(),
          this.edgeCreateName,
          this.edgeCreateShort,
          startID,
          endID,
          newcost,
          newtime,
          newsucost,
          newsutime,
          newlotsize
        );
        dialogComponent.dialogSuccess("Verknüpfung erfolgreich angelegt");

        this.clearFields();
        this.edgeCreateGui = false;
        this.edgeFormStep = 1;
        // remove optimization
        this.getGraph().removeOptimization();
      }

      // QuickEdge
      this.createQuickEdge();

      this.backupGraph();
    },
    createQuickEdge(){
      if (this.$refs.formEdges1.validate()) {
        let indexStart = this.itemsName.indexOf(this.startSelect);
        let startID = this.itemsID[indexStart];
        let indexEnd = this.itemsName.indexOf(this.endSelect);
        let endID = this.itemsID[indexEnd];

        this.getGraph().createEdge(
          this.getGraph(),
          this.edgeCreateName,
          this.edgeCreateShort,
          startID,
          endID,
          null,
          null,
          null,
          null,
          null
        );

        // add QuickEdge Class
        let id = this.getGraph().getCytoGraph(this.getGraph).data("IDCount") -1;
        this.getGraph().getCytoGraph(this.getGraph).getElementById(id).addClass("quick-edge");

        // remove optimization
        this.getGraph().removeOptimization();

      }
    },
    setTarget(id) {},
    createNode() {
      if (this.$refs.formNodes.validate()) {
        this.nodeCreateShort = this.nodeCreateShort.toUpperCase();
        this.getGraph().createNode(
          this.getGraph(),
          this.nodeCreateName,
          this.nodeCreateShort,
          this.nodeCreateImgPath,
          this.nodeCreateColor,
          this.clickX,
          this.clickY
        ),
          this.itemsName.push(this.nodeCreateName);
        this.itemsID = this.getGraph().getNodeID(this.getGraph());

        this.clearFields();
        this.nodeCreateGui = false;
        dialogComponent.dialogSuccess("Zustand erfolgreich angelegt");
      }
      this.backupGraph();
    },
    cancel() {
      this.clearFields();
      this.deactivateGui();
    },
    clearFields() {
      this.nodeCreateName = null;
      this.nodeCreateShort = "";
      this.nodeCreateImgPath = "";
      this.nodeCreateColor = "2699FB";
      this.edgeCreateName = "";
      this.edgeCreateShort = "";
      this.edgeCreateCosts = "";
      this.edgeCreateTime = "";
      this.edgeCreatesuCosts = "";
      this.edgeCreatesuTime = "";
      this.startSelect = "";
      this.endSelect = "";
      this.showNodeTitle = "Erstelle einen Zustand";
      this.showEdgeTitle = "Erstelle eine Verknüpfung";
      this.$refs.formNodes.reset();
      this.$refs.formEdges1.reset();
      this.$refs.formEdges2.reset();
      this.$refs.scrollingContainer.scrollTop = 0;
      this.backupGraph();
    },
    validateStartEnd() {
      this.$refs.startzustand.validate();
      this.$refs.endzustand.validate();
    }
  }
};
</script>
