<template>
  <div class="detail-controls">
    <!-- ONLY FOR TESTING! @TODO -->
    <!-- <v-card style="position: absolute; top: -100px; right: 50px" max-width="400">
      <v-card-title>Test!</v-card-title>
      <v-card-text>
        <p>Später soll die GUI beim Klick auf die Knoten / Kanten im Graphen erscheinen. Zum testen gibts die Buttons hier:</p>
        <v-btn @click="nodeGui = true; edgeGui = false">klick auf knoten</v-btn>
        <v-btn @click="nodeGui = false; edgeGui = true">klick auf kante</v-btn>
      </v-card-text>
    </v-card>-->

    <!-- Re-Activate Button -->
    <!-- <v-card class="activate-button" v-show="reopen">
      <v-btn @click="show= !show" class="ma-2" text icon color="primary">
        <v-icon>mdi-triangle</v-icon>
      </v-btn>
    </v-card>-->

    <!-- Detail-Zustand Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="nodeGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="nodeGui= false" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Zustandseigenschaften</p>
        <p class="prodname ml-3 mr-12 mb-0">{{nodeName}}</p>

        <!-- Name Selection -->
        <v-row>
          <v-col sm="12">
            <v-text-field
              class="mt-2"
              id="nodeName"
              label="Bezeichnung"
              v-model="nodeName"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Shortcut & Icon Upload -->
        <v-row>
          <v-col sm="3">
            <v-text-field id="nodeShort" label="Kürzel" v-model="nodeShort" outlined hide-details></v-text-field>
          </v-col>
          <v-col sm="9">
            <v-text-field
              id="nodeImgpath"
              label="Icon/Bild"
              v-model="nodeImgpath"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Color Selection -->
        <v-row>
          <v-col sm="12">
            <div class="radio-container">
              <label for="nodeColor" class="color-label v-label v-label--active theme--light">Farbe</label>
              <v-radio-group v-model="nodeColor" id="nodeColor" row>
                <!-- Attention: If you change the color, change also the corresponding color in the color-class
                                in the src/styles/components/DetailControls.less -->
                <v-radio class="color-radio-1" color="#2699FB" value="2699FB"></v-radio>
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
        <!-- Save & Delete Buttons -->
        <v-row>
          <v-spacer sm="4" />
          <v-col sm="4" align="right">
            <v-btn color="success" outlined @click="saveNode">Speichern</v-btn>
          </v-col>
          <v-col sm="4" align="right">
            <v-btn color="error" @click="openNodeDeleteMenu" outlined>Löschen</v-btn>
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
      </v-card>
    </v-slide-x-reverse-transition>

    <!-- Detail-Verbindung Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="edgeGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="edgeGui= false" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Verbindungseigenschaften</p>
        <p class="prodname ml-3 mr-12 mb-0">{{edgeName}}</p>

        <!-- Name Selection -->
        <v-row>
          <v-col sm="9">
            <v-text-field
              class="mt-2"
              id="edgeName"
              label="Bezeichnung"
              v-model="edgeName"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="3">
            <v-text-field
              class="mt-2"
              id="edgeShort"
              label="Kürzel"
              v-model="edgeShort"
              outlined
              hide-details
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
              outlined
              label="Startzustand"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12">
            <v-select
              @focus="getNodeItemsName(); getNodeItemsID()"
              v-model="endSelect"
              :items="itemsName"
              label="Endzustand"
              outlined
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <!-- Time & Costs  -->
        <v-row>
          <v-col sm="6">
            <v-text-field
              id="edgeCosts"
              label="Zeit / Stück"
              suffix="Sek."
              type="number"
              v-model="edgeCosts"
              outlined
              hint="Einheit ist in den Einstellungen wählbar"
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-text-field
              id="edgeTime"
              label="Kosten / Stück"
              suffix="€"
              v-model="edgeTime"
              type="number"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Save & Delete Buttons -->
        <v-row>
          <v-spacer sm="4" />
          <v-col sm="4" align="right">
            <v-btn color="success" outlined @click="saveEdge()">Speichern</v-btn>
          </v-col>
          <v-col sm="4" align="right">
            <v-btn color="error" @click="openEdgeDeleteMenu" outlined>Löschen</v-btn>
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
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
/* eslint-disable no-console */
import graph from "@/vargraph/index.js";
export default {
  name: "DetailControls",
  data() {
    return {
      nodeDeleteDialog: false,
      edgeDeleteDialog: false,
      nodeGui: false,
      id: "",
      nodeName: "",
      nodeShort: "",
      nodeImgpath: "",
      nodeColor: "",
      edgeGui: false,
      edgeName: "",
      edgeShort: "",
      edgeTime: "",
      edgeCosts: "",
      itemsName: [],
      itemsID: [],
      startSelect: "",
      endSelect: "",
      deleteInvEdges: false,
      involvedEdges: ""
    };
  },
  methods: {
    loadNodeData(node) {
      this.id = node.id();
      this.nodeName = node.data("name");
      this.nodeShort = node.data("short");
      this.nodeImgpath = node.data("imgUrl");
      this.nodeColor = node.data("color");
    },
    loadEdgeData(edge) {
      this.getNodeItemsID();
      this.getNodeItemsName();
      let startIndex = this.itemsID.indexOf(edge.data("source"));
      let startName = this.itemsName[startIndex];
      let endIndex = this.itemsID.indexOf(edge.data("target"));
      let endName = this.itemsName[endIndex];

      this.id = edge.id();
      this.edgeName = edge.data("name");
      this.edgeShort = edge.data("short");
      this.edgeCosts = edge.data("weight1");
      this.edgeTime = edge.data("weight2");
      this.startSelect = startName;
      this.endSelect = endName;
    },
    getNodeItemsID() {
      this.itemsID = graph.getNodeID();
    },
    getNodeItemsName() {
      this.itemsName = graph.getNodeName();
    },
    openNodeDetails(node) {
      this.loadNodeData(node);
      this.$parent.$refs.createConrols.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.edgeGui = false;
      this.nodeGui = true;
    },
    openEdgeDetails(edge) {
      this.loadEdgeData(edge);
      this.$parent.$refs.createConrols.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.nodeGui = false;
      this.edgeGui = true;
    },
    deactivateGui(){
      this.nodeGui = false;
      this.edgeGui = false;
    },
    saveNode() {
      graph.updateNode(
        this.id,
        this.nodeName,
        this.nodeShort,
        this.nodeImgpath,
        this.nodeColor
      );

      this.nodeGui = false;
    },
    saveEdge() {
      let indexStart = this.itemsName.indexOf(this.startSelect);
      let startID = this.itemsID[indexStart];
      let indexEnd = this.itemsName.indexOf(this.endSelect);
      let endID = this.itemsID[indexEnd];

      graph.updateEdge(
        this.id,
        this.edgeName,
        this.edgeShort,
        startID,
        endID,
        this.edgeCosts,
        this.edgeTime
      );
      this.edgeGui = false;
    },
    deleteEdge() {
      graph.removeEdge(this.id);

      this.edgeDeleteDialog = false;
      this.edgeGui = false;
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
      let edgesArray = graph.getEdgesByNode(this.id);
      if (edgesArray.length > 0) {
        edgesArray.forEach(
          edge => (this.involvedEdges += "• " + edge.data("name") + "\n")
        );
        this.deleteInvEdges = true;
      }
    },
    deleteNode() {
      graph.removeNode(this.id);
      this.nodeDeleteDialog = false;
      this.nodeGui = false;
      this.deleteInvEdges = false;
    }
  },
  mounted: function() {
    this.getNodeItemsID();
    this.getNodeItemsName();
    // Left-Click Listeners:
    graph.getCytoGraph().on("tap", "node", n => this.openNodeDetails(n.target));
    graph.getCytoGraph().on("tap", "edge", e => this.openEdgeDetails(e.target));
  }
};
</script>