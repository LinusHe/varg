<!-- @TODO (Erik) Documentation -->
<template>
  <div class="modify-data-controls">
    <!-- Modify-Data Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="modifyDataGui" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="deactivateGui()" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Graph-Daten</p>
        <p class="prodname ml-3 mr-12 mb-0">{{graphName}}</p>
      
        <!-- graphName Selection -->
        <v-row>
          <v-col sm="12">
            <v-text-field
              class="mt-2"
              id="graphName"
              label="Dateiname"
              v-model="graphName"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      
        <!-- prodName & prodQuant Selection -->
        <v-row>
          <v-col sm="8">
            <v-text-field
              id="prodName"
              label="Produktname"
              v-model="prodName"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="4">
            <v-text-field
              id="prodQuant" 
              label="Stückzahl" 
              v-model="prodQuant" 
              outlined 
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      
        <!-- latestDate Display -->
        <v-row>
          <v-col sm="12">
            <v-text-field
              id="latestDate"
              label="Letzte Speicherung"
              v-model="latestDate"
              :disabled="true"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Save & Cancel Buttons -->
        <v-row>
          <v-spacer sm="4" />
          <v-col sm="4" align="right">
            <v-btn color="success" outlined @click="applyNewData()">Übernehmen</v-btn>
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
        latestDate: "",
        prodName: "",
        prodQuant: ""
      }
    },
  methods: {
    openModifyData() {
      // eslint-disable-next-line no-console
      console.log(this.vars.instance.graphName)
      this.loadGraphData()
      this.$parent.$refs.createConrols.deactivateGui();
      this.$parent.$refs.detailConrols.deactivateGui();
      this.modifyDataGui = true
    },
    loadGraphData() {
      // @TODO (Erik) Stückzahl in BasicData speichern
      if(this.vars.instance.graphName == undefined) {
        // eslint-disable-next-line no-console
        console.log("undefined")
        this.graphName = ""
        this.latestDate = "noch nicht gespeichert"
      }
      else {
        // eslint-disable-next-line no-console
        console.log("defined")
        this.graphName = this.vars.instance.getGraphName()
        this.latestDate = this.vars.instance.getLatestDate()
        //this.prodName = this.vars.instance.getProdName()
        //this.prodQuant = this.vars.instance.getProdQuant()
      }
    },
    applyNewData() {
      this.vars.instance.setGraphName(this.graphName)
      this.vars.instance.setLatestDate(new Date())
      //this.vars.instance.setProdName(this.prodName)
      //this.vars.instance.setProdQuant(this.prodQuant)
      eventBus.$emit("applyNewData", this.vars.instance)
      eventBus.$emit("updateHeader", this.prodName, this.prodQuant)
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