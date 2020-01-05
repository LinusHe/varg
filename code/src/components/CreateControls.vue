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
          <v-btn v-model="fab" color="primary" dark fab large>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              @click="nodeCreateGui = true; edgeCreateGui = false"
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
              @click="nodeCreateGui = false; edgeCreateGui = true"
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
      <v-card
        class="detail-card"
        v-click-outside="nodeCreateGui"
        v-show="nodeCreateGui"
        transition="scroll-y-transition"
      >
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
                <v-radio class="color-radio-blue" color="blue" value="blue"></v-radio>
                <v-radio class="color-radio-green" color="green" value="green"></v-radio>
                <v-radio class="color-radio-purple" color="purple" value="purple"></v-radio>
                <v-radio class="color-radio-pink" color="pink" value="pink"></v-radio>
                <v-radio class="color-radio-red" color="red" value="red"></v-radio>
                <v-radio class="color-radio-orange" color="orange" value="orange"></v-radio>
                <v-radio class="color-radio-yellow" color="yellow" value="yellow"></v-radio>
                <v-radio class="color-radio-lightyellow" color="lightyellow" value="lightyellow"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>

        <!-- Create Buttons -->
        <v-row>
          <v-col sm="6" align="right">
            <v-btn color="success" flat outlined @click="createNode()">Hinzufügen</v-btn>
          </v-col>
          <v-col sm="6">
            <v-btn color="error" flat outlined @click="nodeCreateGui = false">Abbrechen</v-btn>
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
              @focus="getNodes()"
              v-model="startSelect"
              id="Startzustand"
              :items="items"
              outlined
              label="Startzustand"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12">
            <v-select 
              @focus="getNodes()"
              v-model="endSelect"
              id="Endzustand"
              :items="items"
              label="Endzustand"
              outlined hide-details>
            </v-select>
          </v-col>
        </v-row>

        <!-- Time & Costs  -->
        <v-row>
          <v-col sm="6">
            <v-text-field
              id="edgecosts"
              label="Kosten / Stück"
              suffix="€"
              type="number"
              v-model="edgetime"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-text-field
              id="edgetime"
              label="Zeit / Stück"
              suffix="Sek."
              type="number"
              v-model="edgecosts"
              outlined
              hint="Einheit ist in den Einstellungen wählbar"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Create Buttons -->
        <v-row>
          <v-col sm="6" align="right">
            <v-btn color="success" flat outlined @click="createEdge()">Hinzufügen</v-btn>
          </v-col>
          <v-col sm="6">
            <v-btn color="error" flat outlined @click="edgeCreateGui = false">Abbrechen</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import graph from '@/vargraph/index.js'

export default {
  name: "CreateControls",
  data() {
    return {
      nodeCreateGui: false,
      nodeCreateName: "",
      nodeCreateShort: "",
      nodeCreateImgPath: "",
      nodeCreateColor: "",
      edgeCreateGui: false,
      edgeCreateName: "",
      edgeCreateShort: "",
      items: ["Stahlrohre", "Gewahlzter Stahl"],
      startSelect: "",
      endSelect: ""
    }
  },
  methods:  {
    getNodes() {
      this.items = graph.getNodes()
    },
    createEdge () {
      //alert('Hi')
      let w1, w2, label
      if (document.getElementById('edgecosts').value === ""){
        // eslint-disable-next-line no-console
        w1 = 0
      }
      else {
        w1 = parseInt(document.getElementById('edgecosts').value)
      }
      if (document.getElementById('edgetime').value === ""){
        // eslint-disable-next-line no-console
        w2 = 0
      }
      else {
        w1 = parseInt(document.getElementById('edgetime').value)
      }

      label = "(" + w1 + "," + w2 + ")"

      graph.createEdge(document.getElementById('edgeCreateName').value, 
        this.startSelect,
        this.endSelect, 
        w1, w2, label)
      this.edgeCreateGui = false
      },
    createNode () {
      // Checks if data was input by the user
      alert('Hi')
      if (document.getElementById('nodeCreateName').value === ""){
        // eslint-disable-next-line no-console
        console.log('Missing nodeName')
      }
      else {
        graph.createNode(document.getElementById('nodeCreateName').value),
        this.items.push(document.getElementById('nodeCreateName').value)
      }
      this.nodeCreateGui = false;
    }
  }
};
</script>