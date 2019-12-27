<style lang="less"></style>

<template>

  <div class="graph-page">
    <GraphHeader/>
      <v-row>
        <v-col sm="1">
          <Controls />
        </v-col>
        <v-col sm="10" >
          <VarGraph />
        </v-col>
      </v-row>       
  </div>
</template>

<script>
// @ is an alias to /src
import Controls from '@/components/Controls.vue'
import VarGraph from '@/components/VarGraph.vue'

export default {
  name: 'graph',
  components: {
    Controls,
    VarGraph
  }
}
</script>
