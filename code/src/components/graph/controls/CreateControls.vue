/* eslint-disable no-undef */
<template>
  <div class="create-controls-container">
    <!-- Selection Hover-Button -->
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
              <v-btn v-model="fab" v-on="on" color="primary" dark fab large>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Erstellen</span>
          </v-tooltip>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn @click="openNodeGui" v-on="on" fab dark color="secondary" id="dial-add-node">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Neuer Zustand</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn @click="openEdgeGui" v-on="on" fab dark color="secondary" id="dial-add-edge">
              <v-icon>mdi-link-variant-plus</v-icon>
            </v-btn>
          </template>
          <span>Neue Verknüpfung</span>
        </v-tooltip>
      </v-speed-dial>
    </div>

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
          class="white--text align-end"
          style="height: 150px"
          v-bind:style="{ background: '#'+nodeCreateColor }"
        >
          <v-card-subtitle style="color: #ffffff" class="pb-0">Neuer Zustand:</v-card-subtitle>
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
        <v-btn class="btn-close ma-2" @click="nodeCreateGui= false" text icon color="#ffffff">
          <v-icon color="#ffffff">mdi-close</v-icon>
        </v-btn>

        <v-form
          ref="formNodes"
          v-model="validNodes"
          lazy-validation
          class="d-inline-block mr-5 ml-5 mb-4"
          @submit="createNode()"
          @focus="getNodeItemsName()"
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
          <v-row>
            <v-col sm="6" align="right">
              <v-btn
                :disabled="!validNodes"
                color="success"
                id="btn-create-node"
                @click="createNode()"
              >Hinzufügen</v-btn>
            </v-col>
            <v-col sm="6">
              <v-btn color="error" id="btn-cancel-node"  @click="cancel()">Abbrechen</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-slide-x-reverse-transition>

    <!-- Create-Edge Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="edgeCreateGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="edgeCreateGui= false" text icon color="primary">
          <v-icon color="#ffffff">mdi-close</v-icon>
        </v-btn>

        <!-- Colored Div -->
        <div
          class="white--text align-end"
          style="height: 100px; background: #2699FB; background-color: #2699FB"
        >
          <v-card-subtitle style="color: #ffffff" class="pb-0">Neue Verknüpfung:</v-card-subtitle>
          <v-card-title class="pt-12">{{showEdgeTitle}}</v-card-title>
        </div>

        <div class="scrolling-container">
          <v-form
            ref="formEdges"
            v-model="validEdges"
            lazy-validation
            class="d-inline-block mr-5 ml-5 mb-4"
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
                  v-model="startSelect"
                  id="Startzustand"
                  :items="itemsName"
                  label="Startzustand"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12">
                <v-select
                  @focus="getNodeItemsID(); getNodeItemsName()"
                  v-model="endSelect"
                  id="Endzustand"
                  :items="itemsName"
                  :rules="startEndRule"
                  label="Endzustand"
                ></v-select>
              </v-col>
            </v-row>

            <!-- Time & Costs  -->
            <v-row>
              <v-col sm="6">
                <v-text-field
                  id="edgeCreateCosts"
                  label="Kosten / Stück"
                  suffix="€"
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
                  suffix="Sek."
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
                  label="Kosten / Rüst"
                  suffix="€"
                  type="number"
                  v-model="edgeCreatesuCosts"
                  :rules="suCostRules"
                  @keyup.enter="createEdge()"
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  id="edgeCreatesuTime"
                  label="Zeit / Rüst"
                  suffix="Sek."
                  type="number"
                  v-model="edgeCreatesuTime"
                  :rules="suTimeRules"
                  @keyup.enter="createEdge()"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Create Buttons -->
            <v-row class="mb-5">
              <v-col sm="6" align="right">
                <v-btn
                  :disabled="!validEdges"
                  color="success"
                  id="btn-create-edge"
                  @click="createEdge()"
                >Hinzufügen</v-btn>
              </v-col>
              <v-col sm="6">
                <v-btn color="error" id="btn-cancel-edge" @click="cancel()">Abbrechen</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
let dialogComponent;

export default {
  name: "CreateControls",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      nodeCreateGui: false,
      nodeCreateName: "",
      nodeCreateShort: "",
      nodeCreateImgPath: "",
      nodeCreateColor: "2699FB",
      edgeCreateGui: false,
      edgeCreateName: "",
      edgeCreateShort: "",
      edgeCreateCosts: "",
      edgeCreateTime: "",
      edgeCreatesuCosts: "",
      edgeCreatesuTime: "",
      itemsName: [],
      itemsID: [],
      edgeNames: [],
      startSelect: "",
      endSelect: "",
      fab: false,
      showNodeTitle: "Erstelle einen Zustand",
      showEdgeTitle: "Erstelle eine Verknüpfung",
      validNodes: false,
      validEdges: false,
      nameNodeRules: [
        v => !!v || "Zustands-Name wird benötigt",
        v => (v && v.length <= 18) || "Name ist zu lang",
        v => (!this.itemsName.includes(v))  || "Name ist bereits vergeben"
      ],
      nameEdgeRules: [
        v => !!v || "Verknüpfung-Name wird benötigt",
        v => (v && v.length <= 18) || "Name ist zu lang",
        v => (!this.edgeNames.includes(v))|| "Name ist bereits vergeben"
      ],
      shortRules: [
        v => !!v || "Kürzel wird benötigt",
        v => (v && v.length <= 3) || "Kürzel ist zu lang"
      ],
      imgRules: [
        v => !v || v.match(/\.(jpeg|jpg|gif|png)$/) || "Falsches Format"
      ],
      costRules: [
        v => !!v || "Darf nicht leer sein",
        v => v > 0 || "nicht negativ"
      ],
      timeRules: [
        v => !!v || "Darf nicht leer sein",
        v => v > 0 || "nicht negativ"
      ],
      suCostRules: [
        v => !!v || "Darf nicht leer sein",
        v => v > 0 || "nicht negativ"
      ],
      suTimeRules: [
        v => !!v || "Darf nicht leer sein",
        v => v > 0 || "nicht negativ"
      ],
      startEndRule: [
        v => v != this.startSelect || "Ende muss sich vom Start unterscheiden"
      ]
    };
  },
  methods: {
    getGraph() {
      return this.$parent.$refs["vargraph"];
    },
    checkImg(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
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
          this.showEdgeTitle = this.nodeEdgeName;
        }
      }
    },
    deactivateGui() {
      this.nodeCreateGui = false;
      this.edgeCreateGui = false;
    },
    openNodeGui() {
      this.$parent.$refs.detailControls.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.nodeCreateGui = true;
      this.edgeCreateGui = false;
    },
    openEdgeGui() {
      this.$parent.$refs.detailControls.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.nodeCreateGui = false;
      this.edgeCreateGui = true;
    },
    getNodeItemsID() {
      this.itemsID = this.getGraph().getNodeID(this.getGraph());
    },
    getNodeItemsName() {
      this.itemsName = this.getGraph().getNodeName(this.getGraph());
    },
    getEdgeItemsName() {
      this.edgeNames = this.getGraph().getEdgeName(this.getGraph());
    },
    createEdge() {
      if (this.$refs.formEdges.validate()) {
        let newcost = parseFloat(this.edgeCreateCosts);
        let newtime = parseFloat(this.edgeCreateTime);
        let newsucost = parseFloat(this.edgeCreatesuCosts);
        let newsutime = parseFloat(this.edgeCreatesuTime);

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
          newsutime
        );
        dialogComponent.dialogSuccess("Verknüpfung erfolgreich angelegt");
        this.clearFields();
        this.edgeCreateGui = false;
      }
    },
    createNode() {
      if (this.$refs.formNodes.validate()) {
        this.nodeCreateShort = this.nodeCreateShort.toUpperCase();
        this.getGraph().createNode(
          this.getGraph(),
          this.nodeCreateName,
          this.nodeCreateShort,
          this.nodeCreateImgPath,
          this.nodeCreateColor
        ),
          this.itemsName.push(this.nodeCreateName);
        this.itemsID = this.getGraph().getNodeID(this.getGraph());

        this.clearFields();
        this.nodeCreateGui = false;
        dialogComponent.dialogSuccess("Zustand erfolgreich angelegt");
      }
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
      this.$refs.formEdges.reset();
    }
  }
};
</script>