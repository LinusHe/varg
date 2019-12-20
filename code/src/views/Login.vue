<style lang="less"></style>

<template>
  <div class="login-page">
      <img alt="htwk logo" id="htwk-logo" src="../assets/img/htwk.svg">

      <v-row>

        <v-col sm="3">
          <Controls />
        </v-col>

        <v-col sm="9">
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
  name: 'login',
  components: {
    Controls,
    VarGraph
  }
}
</script>
