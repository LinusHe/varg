<style lang="less"></style>

<template>
  <div class="database-page">
      <img alt="htwk logo" id="htwk-logo" src="../assets/img/htwk.svg">

      <v-row>

        <v-col sm="3">

        </v-col>

        <v-col sm="9">
          <VarGraph />
        </v-col>
      <datenbank/>
      </v-row>

  </div>
</template>

<script>
// @ is an alias to /src
//import Controls from '@/components/Controls.vue'
import VarGraph from '@/components/VarGraph.vue'
import datenbank from "@/components/DatabaseForm.vue"

export default {
  name: 'database',
  components: {

    VarGraph,
    datenbank
  }
  }

</script>
