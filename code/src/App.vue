<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </v-app>
</template>

<style lang="less">
//Styles are in src/assets/styles/global.less
</style>
