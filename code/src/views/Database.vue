<style lang="less"></style>
<!-- Datenbankansicht von Home-->
<template>
  <div class="database-page">
    <v-card class="settings-dialog" width="1000">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <v-btn id="backbtn" class="darkmode-ign " large depressed color="blue" :value="true" @click="backBtn">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <h1>Datenbank</h1>
        <v-spacer></v-spacer>
      </v-card-title>
      <databaseGUI ref="databaseGUI"/>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

import databaseGUI from "@/components/database/DatabaseForm.vue";
// import HtwkLogoHeader from "@/components/basic/HtwkLogoHeader";
export default {
  name: "database",
  components: {
    databaseGUI
  },
  mounted() {
    this.prepare();
  },
  methods: {
    backBtn() {
      this.$router.replace("/home/menu");
    },
    prepare() {
      this.$nextTick(() => {
        // TODO might need to create a loading animation while loading items
        // and show an error message when unable to connect
        // either way the DB window should always be at full size and not collapse when empty (looks better) 
        this.$refs.databaseGUI.setType(0);
        this.$refs.databaseGUI.loadItems();
      });
    }
  }
};
</script>
