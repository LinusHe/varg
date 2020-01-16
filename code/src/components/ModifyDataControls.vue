<!-- @TODO (Erik) Documentation -->
<template>
  <div class="modify-data-controls">
    <!-- Modify-Data Controls -->
    <v-slide-x-reverse-transition>
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
      
        <v-row>
          <v-spacer sm="4" />
          <v-col sm="4" align="right">
            <v-btn color="success" outlined @click="saveNewData()">Speichern</v-btn>
          </v-col>
          <v-col sm="4" align="right">
            <v-btn color="lightgrey" outlined @click="deactivateGui()">Abbrechen</v-btn>
          </v-col>
        </v-row>

      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import {eventBus} from "@/main.js"
import BasicData from "@/vargraph/BasicData.js";
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
      // @TODO (Erik) Stückzahl in BasicData speichern
      this.graphName = this.vars.instance.getName()
      this.quantity = 100
    },
    saveNewData() {
      this.vars.instance.setName(this.graphName)
      //this.vars.instance.setQuantity(this.quantity)
      eventBus.$emit("saveNewData", this.vars.instance)
      this.deactivateGui()
    },
    deactivateGui() {
      this.modifyDataGui = false
    }
  },
  created() {
    this.vars = {
      instance: BasicData
    },
    eventBus.$on("modifyData", (newInstance) => {
      this.vars.instance = newInstance
      this.openModifyData()
    })
  }
}
</script>