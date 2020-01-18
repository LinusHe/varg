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
            <v-btn
              @click="openNodeGui"
              v-on="on"
              fab
              dark
              color="secondary"
            >
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Neuer Zustand</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="openEdgeGui"
              v-on="on"
              fab
              dark
              color="secondary"
            >
              <v-icon>mdi-link-variant-plus</v-icon>
            </v-btn>
          </template>
          <span>Neue Verknüpfung</span>
        </v-tooltip>
      </v-speed-dial>
    </div>

    <!-- Create-Zustand Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="nodeCreateGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="nodeCreateGui= false" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Neuer Zustand</p>
        <p class="prodname ml-3 mr-12 mb-0">{{nodeCreateName}}</p>

        <!-- Name Selection -->
        <v-row>
          <v-col sm="12">
            <v-text-field
              class="mt-2"
              id="nodeCreateName"
              label="Bezeichnung"
              v-model="nodeCreateName"
              outlined
              hide-details
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
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="9">
            <v-text-field
              id="nodeCreateImgPath"
              label="Icon/Bild"
              v-model="nodeCreateImgPath"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Color Selection -->
        <v-row>
          <v-col sm="12">
            <div class="radio-container">
              <label
                for="nodeCreateColor"
                class="color-label v-label v-label--active theme--light"
              >Farbe</label>
              <v-radio-group v-model="nodeCreateColor" id="nodeCreateColor" row>
                <!-- Attention: If you change the color, change also the corresponding color in the color-class
                                in the src/styles/components/DetailControls.less -->
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

        <!-- Create Buttons -->
        <v-row>
          <v-col sm="6" align="right">
            <v-btn color="success" outlined @click="createNode()">Hinzufügen</v-btn>
          </v-col>
          <v-col sm="6">
            <v-btn color="error" outlined @click="nodeCreateGui = false">Abbrechen</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-slide-x-reverse-transition>

    <!-- Create-Verbindung Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="edgeCreateGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="edgeCreateGui= false" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Neue Verbindung</p>
        <p class="prodname ml-3 mr-12 mb-0">{{edgeCreateName}}</p>

        <!-- Name Selection -->
        <v-row>
          <v-col sm="9">
            <v-text-field
              class="mt-2"
              id="edgeCreateName"
              label="Bezeichnung"
              v-model="edgeCreateName"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="3">
            <v-text-field
              class="mt-2"
              id="edgeCreateShort"
              label="Kürzel"
              v-model="edgeCreateShort"
              outlined
              hide-details
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
              outlined
              label="Startzustand"
              hide-details
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
              id="edgeCreateCosts"
              label="Kosten / Stück"
              suffix="€"
              type="number"
              v-model="edgeCreateCosts"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-text-field
              id="edgeCreateTime"
              label="Zeit / Stück"
              suffix="Sek."
              type="number"
              v-model="edgeCreateTime"
              outlined
              hint="Einheit ist in den Einstellungen wählbar"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Rüstkosten  -->
        <v-row>
          <v-col sm="6">
            <v-text-field
              id="edgeCreateCostsR"
              label="Rüstkosten"
              suffix="€"
              type="number"
              v-model="edgeCreateCostsR"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-text-field
              id="edgeCreateTimeR"
              label="Rüstzeit"
              suffix="Sek."
              type="number"
              v-model="edgeCreateTimeR"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>






        <!-- Create Buttons -->
        <v-row>
          <v-col sm="6" align="right">
            <v-btn color="success" outlined @click="createEdge()">Hinzufügen</v-btn>
          </v-col>
          <v-col sm="6">
            <v-btn color="error" outlined @click="edgeCreateGui = false">Abbrechen</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import graph from "@/vargraph/index.js";

export default {
  name: "CreateControls",
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
      itemsName: [],
      itemsID: [],
      startSelect: "",
      endSelect: "",
      fab: false
    };
  },
  methods: {
    deactivateGui(){
      this.nodeCreateGui = false;
      this.edgeCreateGui = false;
    },
    openNodeGui(){
      this.$parent.$refs.detailConrols.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.nodeCreateGui = true;
      this.edgeCreateGui = false;
    },
    openEdgeGui(){
      this.$parent.$refs.detailConrols.deactivateGui();
      this.$parent.$refs.modifyDataControls.deactivateGui();
      this.nodeCreateGui = false;
      this.edgeCreateGui = true;
    },
    getNodeItemsID() {
      this.itemsID = graph.getNodeID();
    },
    getNodeItemsName() {
      this.itemsName = graph.getNodeName();
    },
    createEdge() {
      let w1 = parseInt(this.edgeCreateCosts);
      let w2 = parseInt(this.edgeCreateTime);
      let w1R = parseInt(this.edgeCreateCostsR);
      let w2R = parseInt(this.edgeCreateTimeR);

      let indexStart = this.itemsName.indexOf(this.startSelect);
      let startID = this.itemsID[indexStart];
      let indexEnd = this.itemsName.indexOf(this.endSelect);
      let endID = this.itemsID[indexEnd];

      graph.createEdge(
        this.edgeCreateName,
        this.edgeCreateShort,
        startID,
        endID,
        w1,
        w2,
        w1R,
        w2R
      );
      this.clearFields();
      this.edgeCreateGui = false;
    },
    createNode() {
      // Checks if data was input by the user
      //alert("Hi");
      if (document.getElementById("nodeCreateName").value === "") {
        // eslint-disable-next-line no-console
        console.log("Missing nodeName");
      } else {
        graph.createNode(
          this.nodeCreateName,
          this.nodeCreateShort,
          this.nodeCreateImgPath,
          this.nodeCreateColor
        ),
          this.itemsName.push(this.nodeCreateName);
        this.itemsID = graph.getNodeID();
      }
      this.clearFields();
      this.nodeCreateGui = false;
    },
    clearFields() {
      this.nodeCreateName = "";
      this.nodeCreateShort = "";
      this.nodeCreateImgPath = "";
      this.nodeCreateColor = "";
      this.edgeCreateName = "";
      this.edgeCreateShort = "";
      this.edgeCreateCosts = "";
      this.edgeCreateTime = "";
      this.startSelect = "";
      this.endSelect = "";
    }
  }
};
</script>