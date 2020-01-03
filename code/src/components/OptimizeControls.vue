<template>
  <v-container class="optimize-container" fillwidth>
    <div class="optimize-controls">
      <v-card align="center">
        <v-row>
          <p class="headline ma-auto">Optimieren nach</p>
        </v-row>
        <v-row align="center">
          <div class="switch-container">
            <p class="switch-text-left">Zeit</p>
            <v-switch class="switch-button" color="primary" flat inset @change="changeOption"></v-switch>
            <p class="switch-text-right">Kosten</p>
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
      option: "optionTime"
    }
    
  },
  mounted(){
    graph.findPath(this.option)
  },
  methods:{
    changeOption: function() {
      if(this.option=== 'optionTime'){
        this.option = 'optionCosts'
        graph.findPath(this.option)
      }
      else {
        this.option = 'optionTime'
        graph.findPath(this.option)
      }
    }
  }
};
</script>