<template>
  <v-app id="app">
    <router-view />
    <Dialogs ref="dialogs" ></Dialogs>
    <Darkmode ref="darkmode" ></Darkmode>
  </v-app>
</template>

<style lang="less">
//Styles are in src/assets/styles/global.less
</style>

<script>
import Dialogs from "@/components/basic/Dialogs";
import Darkmode from "@/components/basic/Darkmode";

export default {
  components: {
    Dialogs,
    Darkmode
  }
};
</script>