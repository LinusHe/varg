<style lang="less"></style>
<!-- Datenbankansicht von Home-->
<template>
  <div class="database-page">
    <v-card class="settings-dialog" width="1000">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary" >
        <v-btn id="backbtn" large depressed color="blue" :value="true" @click="backBtn">
                <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        <h1>Datenbank</h1>
        <v-spacer></v-spacer>
      </v-card-title>
      <datenbank />
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

import datenbank from "@/components/database/DatabaseForm.vue";
// import HtwkLogoHeader from "@/components/basic/HtwkLogoHeader";
export default {
  name: "database",
  components: {
    datenbank
  },
  methods: {
    backBtn() {
      this.$router.replace("/home/menu");
    }
  }
};
</script>
