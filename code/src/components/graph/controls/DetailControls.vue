<template>
  <div class="detail-controls">
    <!-- Detail-Zustand Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="nodeGui" transition="scroll-y-transition">
        <!-- Colored Div  -->
        <div
          class="white--text align-end"
          style="height: 150px"
          v-bind:style="{ background: '#'+nodeColor }"
        >
          <v-card-subtitle style="color: #ffffff" class="pb-0">Zustand bearbeiten:</v-card-subtitle>
          <v-card-title class="pt-12">{{showNodeTitle}}</v-card-title>
          <!-- <p class="prodname ml-3 mr-12 mb-0 pt-10">{{nodeCreateName}}</p> -->
          <!-- Color Selection -->
          <v-row class="radio-row">
            <v-col sm="12" class="pb-0 pt-0 pl-5">
              <div class="radio-container">
                <v-radio-group v-model="nodeColor" id="nodeColor" row required>
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
        <v-btn class="btn-close ma-2" @click="nodeGui= false" text icon color="#ffffff">
          <v-icon color="#ffffff">mdi-close</v-icon>
        </v-btn>

        <v-form
          ref="formNodes"
          v-model="validNodes"
          lazy-validation
          class="d-inline-block mr-5 ml-5 mb-4"
          @submit="saveNode()"
          onsubmit="return false;"
        >
          <!-- Name Selection -->
          <v-row>
            <v-col sm="12">
              <v-text-field
                class="mt-2"
                id="nodeName"
                label="Bezeichnung"
                v-model="nodeName"
                :rules="nameNodeRules"
                @input="generateNodeShort()"
                @keyup.enter="saveNode()"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Shortcut & Icon Upload -->
          <v-row>
            <v-col sm="3">
              <v-text-field
                id="nodeShort"
                label="Kürzel"
                v-model="nodeShort"
                :rules="shortRules"
                @keyup.enter="saveNode()"
              ></v-text-field>
            </v-col>
            <v-col sm="9">
              <v-text-field
                id="nodeImgPath"
                label="Icon/Bild"
                v-model="nodeImgPath"
                clearable
                @keyup.enter="saveNode()"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Save & Delete Buttons -->
          <v-row>
            <v-spacer sm="4" />
            <v-col sm="4" align="right">
              <v-btn color="success" :disabled="!validNodes" @click="saveNode()">Speichern</v-btn>
            </v-col>
            <v-col sm="4" align="right">
              <v-btn color="warning" @click="openNodeDeleteMenu()">Löschen</v-btn>
            </v-col>
            <v-col sm="4" align="right">
              <v-btn color="error" @click="cancel()">Abbrechen</v-btn>
            </v-col>
            <v-dialog v-model="nodeDeleteDialog" persistent max-width="400">
              <v-card>
                <v-card-title class="headline">Zustand löschen</v-card-title>
                <v-card-text>
                  Soll der Zustand
                  <b>{{nodeName}}</b> endgültig gelöscht werden? Diese Aktion kann nicht rückgängig gemacht werden.
                  <span
                    v-show="deleteInvEdges"
                  >
                    <br />
                    <br />
                    <b>ACHTUNG!</b>
                    <br />Die folgenden Verbindungen werden ebenfalls gelöscht:
                    <br />
                    <b style="white-space: pre-line">{{ involvedEdges }}</b>
                  </span>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="deleteNode()">Löschen</v-btn>
                  <v-btn color="grey" text @click="nodeDeleteDialog = false">Abbrechen</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-form>
      </v-card>
    </v-slide-x-reverse-transition>

    <!-- Detail-Verbindung Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="edgeGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="edgeGui= false" text icon color="#ffffff">
          <v-icon color="#ffffff">mdi-close</v-icon>
        </v-btn>

        <!-- Colored Div -->
        <div
          class="white--text align-end"
          style="height: 100px; background: #2699FB; background-color: #2699FB"
        >
          <v-card-subtitle style="color: #ffffff" class="pb-0">Verknüpfung bearbeiten:</v-card-subtitle>
          <v-card-title class="pt-12">{{showEdgeTitle}}</v-card-title>
        </div>

        <div class="scrolling-container">
          <v-form
            ref="formEdges"
            v-model="validEdges"
            lazy-validation
            class="d-inline-block mr-5 ml-5 mb-4"
            @submit="saveEdge()"
            onsubmit="return false;"
            style="max-height: 300px; overflow: scroll-y"
          >
            <!-- Name Selection -->
            <v-row>
              <v-col sm="9">
                <v-text-field
                  class="mt-2"
                  id="edgeName"
                  label="Bezeichnung"
                  v-model="edgeName"
                  :rules="nameEdgeRules"
                  @input="generateEdgeShort()"
                  @keyup.enter="saveEdge()"
                  @focus="getEdgeItemsName()"
                ></v-text-field>
              </v-col>
              <v-col sm="3">
                <v-text-field
                  class="mt-2"
                  id="edgeShort"
                  label="Kürzel"
                  v-model="edgeShort"
                  :rules="shortRules"
                  @keyup.enter="saveEdge()"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Start und Endzustand -->
            <v-row>
              <v-col sm="12">
                <v-select
                  @focus="getNodeItemsName(); getNodeItemsID();"
                  v-model="startSelect"
                  :items="itemsName"
                  id="detailStartzustand"
                  label="Startzustand"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12">
                <v-select
                  @focus="getNodeItemsName(); getNodeItemsID()"
                  v-model="endSelect"
                  :items="itemsName"
                  id="detailEndzustand"
                  label="Endzustand"
                  :rules="startEndRule"
                ></v-select>
              </v-col>
            </v-row>

            <!-- Time & Costs  -->
            <v-row>
              <v-col sm="6">
                <v-text-field
                  id="edgeCosts"
                  label="Kosten / Stück"
                  suffix="€"
                  type="number"
                  v-model="edgeCosts"
                  :rules="costRules"
                  @keyup.enter="saveEdge()"
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  id="edgeTime"
                  label="Zeit / Stück"
                  suffix="Sek."
                  v-model="edgeTime"
                  type="number"
                  :rules="timeRules"
                  @keyup.enter="saveEdge()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-text-field
                  id="edgesuCosts"
                  label="Kosten / Rüst"
                  suffix="€"
                  type="number"
                  v-model="edgesuCosts"
                  :rules="suCostRules"
                  @keyup.enter="saveEdge()"
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  id="edgesuTime"
                  label="Zeit / Rüst"
                  suffix="Sek."
                  v-model="edgesuTime"
                  type="number"
                  :rules="suTimeRules"
                  @keyup.enter="saveEdge()"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- Save & Delete Buttons -->
            <v-row>
              <v-spacer sm="4" />
              <v-col sm="4" align="right">
                <v-btn color="success" :disabled="!validEdges" @click="saveEdge()">Speichern</v-btn>
              </v-col>
              <v-col sm="4" align="right">
                <v-btn color="warning" @click="openEdgeDeleteMenu">Löschen</v-btn>
              </v-col>
              <v-col sm="4" align="right">
                <v-btn color="error" @click="cancel">Abbrechen</v-btn>
              </v-col>
              <v-dialog v-model="edgeDeleteDialog" persistent max-width="400">
                <v-card>
                  <v-card-title class="headline">Verbindung löschen</v-card-title>
                  <v-card-text>
                    Soll die Verbindung
                    <b>{{edgeName}}</b> endgültig gelöscht werden? Diese Aktion kann nicht rückgängig gemacht werden.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="deleteEdge()">Löschen</v-btn>
                    <v-btn color="grey" text @click="edgeDeleteDialog = false">Abbrechen</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
  name: "DetailControls",
  mounted: function() {
    this.getNodeItemsID();
    this.getNodeItemsName();
    dialogComponent = this.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      nodeDeleteDialog: false,
      edgeDeleteDialog: false,
      nodeGui: false,
      id: "",
      nodeName: "",
      nodeShort: "",
      nodeImgPath: "",
      nodeColor: "",
      edgeGui: false,
      edgeName: "",
      edgeShort: "",
      edgeCosts: "",
      edgeTime: "",
      edgesuCosts: "",
      edgesuTime: "",
      itemsName: [],
      itemsID: [],
      edgeNames: [],
      startSelect: "",
      endSelect: "",
      deleteInvEdges: false,
      involvedEdges: "",
      showNodeTitle: "Erstelle einen Zustand",
      showEdgeTitle: "Erstelle eine Verknüpfung",
      validNodes: false,
      validEdges: false,
      nameNodeRules: [
        v => !!v || "Zustands-Name wird benötigt",
        v => (v && v.length <= 18) || "Name ist zu lang",
        // todo: other given name
        v =>
          v == this.nodeName ||
          !this.itemsName.includes(v) ||
          "Name ist bereits vergeben"
      ],
      nameEdgeRules: [
        v => !!v || "Verknüpfung-Name wird benötigt",
        v => (v && v.length <= 18) || "Name ist zu lang",
        // todo: other given name
        v => v != this.edgeNames || "Name ist bereits vergeben"
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
        v => v >= 0 || "Darf nicht negativ sein"
      ],
      timeRules: [
        v => !!v || "Darf nicht leer sein",
        v => v >= 0 || "Darf nicht negativ sein"
      ],
      suCostRules: [
        v => !!v || "Darf nicht leer sein",
        v => v >= 0 || "Darf nicht negativ sein"
      ],
      suTimeRules: [
        v => !!v || "Darf nicht leer sein",
        v => v >= 0 || "Darf nicht negativ sein"
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
    loadNodeData(node) {
      // this.$refs.formNodes.reset();
      this.id = node.id();
      this.nodeName = node.data("name");
      this.nodeShort = node.data("short");
      this.nodeImgPath = node.data("imgUrl");
      this.nodeColor = node.data("color");
      this.showNodeTitle = this.nodeName;
    },
    loadEdgeData(edge) {
      // this.$refs.formEdges.reset();
      this.getNodeItemsID();
      this.getNodeItemsName();
      let startIndex = this.itemsID.indexOf(edge.data("source"));
      let startName = this.itemsName[startIndex];
      let endIndex = this.itemsID.indexOf(edge.data("target"));
      let endName = this.itemsName[endIndex];

      this.id = edge.id();
      this.edgeName = edge.data("name");
      this.edgeShort = edge.data("short");
      this.edgeCosts = edge.data("cost");
      this.edgeTime = edge.data("time");
      this.edgesuCosts = edge.data("sucost");
      this.edgesuTime = edge.data("sutime");
      this.startSelect = startName;
      this.endSelect = endName;
      this.showEdgeTitle = this.edgeName;
    },
    handleDetails(target) {
      if (target === this.getGraph().getCytoGraph(this.getGraph())) {
        this.closeMenus();
      } else if (target.group() == "nodes") {
        this.openNodeDetails(target);
      } else if (target.group() == "edges") {
        this.openEdgeDetails(target);
      }
    },
    closeMenus() {
      this.deactivateGui();
      this.$parent.$refs.createControls.deactivateGui();
    },
    generateNodeShort() {
      if (this.nodeName != null) {
        if (this.nodeName.length > 0 && this.nodeName != " ") {
          let words = this.nodeName.split(" ");
          if (words.length >= 2 && words.length <= 3) {
            this.nodeShort = words
              .map(words => words[0])
              .join("")
              .toUpperCase();
          } else if (words.length == 1) {
            this.nodeShort = this.nodeName.substring(0, 3).toUpperCase();
          }
        }
        if (this.nodeName.length <= 18) {
          this.showNodeTitle = this.nodeName;
        }
      }
    },
    generateEdgeShort() {
      console.log(this.showEdgeTitle);

      if (this.edgeName != null) {
        if (this.edgeName.length > 0 && this.edgeName != " ") {
          let words = this.edgeName.split(" ");
          if (words.length >= 2 && words.length <= 3) {
            this.edgeShort = words
              .map(words => words[0])
              .join("")
              .toUpperCase();
          } else if (words.length == 1) {
            this.edgeShort = this.edgeName.substring(0, 3).toUpperCase();
          }
        }
        if (this.edgeName.length <= 18) {
          this.showEdgeTitle = this.edgeName;
        }
      }
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
    openNodeDetails(node) {
      this.loadNodeData(node);
      this.$parent.$refs.createControls.deactivateGui();
      this.edgeGui = false;
      this.nodeGui = true;
    },
    openEdgeDetails(edge) {
      this.loadEdgeData(edge);
      this.$parent.$refs.createControls.deactivateGui();
      this.nodeGui = false;
      this.edgeGui = true;
    },
    deactivateGui() {
      this.nodeGui = false;
      this.edgeGui = false;
    },
    saveNode() {
      if (this.$refs.formNodes.validate()) {
        this.getGraph().updateNode(
          this.getGraph(),
          this.id,
          this.nodeName,
          this.nodeShort,
          this.nodeImgPath,
          this.nodeColor
        );

        this.nodeGui = false;
        dialogComponent.dialogSuccess("Knoten erfolgreich aktualisiert");
      }
    },
    saveEdge() {
      if (this.$refs.formEdges.validate()) {
        let indexStart = this.itemsName.indexOf(this.startSelect);
        let startID = this.itemsID[indexStart];
        let indexEnd = this.itemsName.indexOf(this.endSelect);
        let endID = this.itemsID[indexEnd];

        this.getGraph().updateEdge(
          this.getGraph(),
          this.id,
          this.edgeName,
          this.edgeShort,
          startID,
          endID,
          this.edgeCosts,
          this.edgeTime,
          this.edgesuCosts,
          this.edgesuTime
        );
        this.edgeGui = false;
        dialogComponent.dialogSuccess("Kante erfolgreich aktualisiert");
      }
    },
    deleteEdge() {
      this.getGraph().removeEdge(this.getGraph(), this.id);

      this.edgeDeleteDialog = false;
      this.edgeGui = false;
      dialogComponent.dialogWarning("Kante erfolgreich gelöscht");
    },
    openEdgeDeleteMenu() {
      this.edgeDeleteDialog = true;
    },
    openNodeDeleteMenu() {
      this.getInvolvedEdges();
      this.nodeDeleteDialog = true;
    },
    getInvolvedEdges() {
      this.involvedEdges = "";
      // check if edges are involved with node
      let edgesArray = this.getGraph().getEdgesByNode(this.getGraph(), this.id);
      if (edgesArray.length > 0) {
        edgesArray.forEach(
          edge => (this.involvedEdges += "• " + edge.data("name") + "\n")
        );
        this.deleteInvEdges = true;
      }
    },
    deleteNode() {
      this.getGraph().removeNode(this.getGraph(), this.id);
      this.nodeDeleteDialog = false;
      this.nodeGui = false;
      this.deleteInvEdges = false;
      dialogComponent.dialogWarning("Knoten erfolgreich gelöscht");
    },
    cancel() {
      // this.clearFields();
      this.deactivateGui();
    }
  }
};
</script>
