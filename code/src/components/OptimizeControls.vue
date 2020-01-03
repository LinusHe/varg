<template>
  <v-container class="optimize-container" fillwidth>
    <div class="optimize-controls">
      <v-card align="center">
        <v-row>
          <p class="headline ma-auto">Optimieren nach</p>
        </v-row>
        <v-row align="center">
          <div class="switch-container">
            <v-select v-model="startSelect" :items="items" >Startknoten auswählen></v-select>
            <p class="switch-text-left">Zeit</p>
            <v-switch class="switch-button" color="primary" flat inset @change="changeOption"></v-switch>
            <p class="switch-text-right">Kosten</p>
            <v-select v-model="endSelect" :items="items">Endknoten auswählen></v-select>
          </div>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import graph from "../vargraph";

export default {
  name: "OptimizeControls",
  data () {
    return{
      option: "optionTime",
      items: []
    }
    
  },
  mounted(){
    this.items= graph.getNodes()
    graph.findPath(this.option)
  },
  methods:{
    changeOption: function() {
      if(this.option=== 'optionTime'){
        this.option = 'optionCosts'
        graph.findPath(this.option, this.startSelect, this.endSelect)
      }
      else {
        this.option = 'optionTime'
        graph.findPath(this.option, this.startSelect, this.endSelect)
      }
    },
  }
};
</script>