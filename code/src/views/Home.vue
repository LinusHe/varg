<style lang="less"></style>

<template>
  <div class="home">
    <img alt="htwk logo" id="htwk-logo" src="../assets/img/htwk.svg">
    <HelloWorld msg="Welcome to varg"/>
    <div id="cy"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
