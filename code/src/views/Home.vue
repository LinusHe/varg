<style lang="less"></style>

<template>
  <div class="home">
    <img alt="htwk logo" id="htwk-logo" src="../assets/img/htwk.svg">
    <HelloWorld msg="Welcome to varg"/>
    <VarGraph />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import VarGraph from '@/components/VarGraph.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    VarGraph
  }
}
</script>
