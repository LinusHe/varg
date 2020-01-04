<style lang="less"></style>

<template>
  <div class="database-page">
      <img alt="htwk logo" id="htwk-logo" src="../assets/img/htwk.svg">
      <datenbank/>
  </div>
</template>

<script>
// @ is an alias to /src
//import Controls from '@/components/Controls.vue'
//import VarGraph from '@/components/VarGraph.vue'
import datenbank from "@/components/DatabaseForm.vue"

export default {
  name: 'database',
  components: {

    datenbank
  }
  }

</script>
