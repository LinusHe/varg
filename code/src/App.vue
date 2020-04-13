<template>
  <v-app id="app">
    <router-view />
    <Dialogs ref="dialogs" ></Dialogs>
  </v-app>
</template>

<style lang="less">
//Styles are in src/assets/styles/global.less
</style>

<script>
import Dialogs from "@/components/basic/Dialogs";

export default {
  components: {
    Dialogs
  }
};
</script>