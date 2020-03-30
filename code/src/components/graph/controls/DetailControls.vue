<template>
  <div class="detail-controls">

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
              clearable
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
              label="Kosten / Stück"
              suffix="€"
              type="number"
              v-model="edgeCosts"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-text-field
              id="edgeTime"
              label="Zeit / Stück"
              suffix="Sek."
              v-model="edgeTime"
              type="number"
              outlined
              hide-details
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
              outlined
              hint="Einheit ist in den Einstellungen wählbar"
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-text-field
              id="edgesuTime"
              label="Zeit / Rüst"
              suffix="Sek."
              v-model="edgesuTime"
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
      edgeCosts: "",
      edgeTime: "",
      edgesuCosts: "",
      edgesuTime: "",
      itemsName: [],
      itemsID: [],
      startSelect: "",
      endSelect: "",
      deleteInvEdges: false,
      involvedEdges: ""
    };
  },
  methods: {
    getGraph() {
      return this.$parent.$refs["vargraph"];
    },
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
      this.edgeCosts = edge.data("cost");
      this.edgeTime = edge.data("time");
      this.edgesuCosts = edge.data("sucost");
      this.edgesuTime = edge.data("sutime");
      this.startSelect = startName;
      this.endSelect = endName;
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
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.$parent.$refs.createControls.deactivateGui();
    },
    getNodeItemsID() {
      this.itemsID = this.getGraph().getNodeID(this.getGraph());
    },
    getNodeItemsName() {
      this.itemsName = this.getGraph().getNodeName(this.getGraph());
    },
    openNodeDetails(node) {
      this.loadNodeData(node);
      this.$parent.$refs.createControls.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.edgeGui = false;
      this.nodeGui = true;
    },
    openEdgeDetails(edge) {
      this.loadEdgeData(edge);
      this.$parent.$refs.createControls.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.nodeGui = false;
      this.edgeGui = true;
    },
    deactivateGui(){
      this.nodeGui = false;
      this.edgeGui = false;
    },
    saveNode() {
      this.getGraph().updateNode(
        this.getGraph(),
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
    },
    deleteEdge() {
      this.getGraph().removeEdge(this.getGraph(), this.id);

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
    }
  },
  mounted: function() {
    this.getNodeItemsID();
    this.getNodeItemsName();
  }
};
</script>
