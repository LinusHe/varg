<template>
  <div class="modify-data-controls">
    <!-- Modify-Data Controls -->
    <v-slide-x-transition>
      <v-card class="detail-card" v-show="modifyDataGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="modifyDataGui=false" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Graph-Daten</p>
        <p class="prodname ml-3 mr-12 mb-0">{{graphName}}</p>
      
        <!-- Name Selection -->
        <v-row>
          <v-col sm="12">
            <v-text-field
              class="mt-2"
              id="graphName"
              label="Produktname"
              v-model="graphName"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      
        <!-- Quantity Selection -->
        <v-row>
          <v-col sm="4">
            <v-text-field id="nodeShort" label="Stückzahl" v-model="quantity" outlined hide-details></v-text-field>
          </v-col>
        </v-row>
      
      
      
      
      
      
      
      
      </v-card>
    </v-slide-x-transition>
  </div>
</template>

<script>
import {eventBus} from "@/main.js"
import TestDatabase from "@/vargraph/TestDatabase.js"
export default {
  name: "ModifyDataControls",
    data() {
      return {
        modifyDataGui: false,
        graphName: "",
        quantity: 0
      }
    },
  methods: {
    openModifyData() {
      this.loadGraphData()
      this.$parent.$refs.createConrols.deactivateGui();
      this.$parent.$refs.detailConrols.deactivateGui();
      this.modifyDataGui = true
    },
    loadGraphData() {
      // @TODO (Erik) hier werden nur Beispielwerte zugewiesen,
      // müssen noch durch richtige Werte ersetzt werden!
      // Graph-Name == Produktname ?
      this.graphName = this.vars.testDatabase.getContent()[0].getName()
      this.quantity = 100
    },
    deactivateGui() {
      this.modifyDataGui = false
    }
  },
  created() {
    this.vars = {
      testDatabase: new TestDatabase()
    },
    eventBus.$on("modifyData", (newTestDatabase) => {
      this.vars.testDatabase = newTestDatabase
      this.openModifyData()
    })
  }
}
</script>