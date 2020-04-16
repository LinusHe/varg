<style lang="less"></style>

<template>
  <div class="database-page">
    <v-card class="settings-dialog" max-width="1000">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <!-- Hier müsste der Zurück Button rein -->
        <h1>Datenbank</h1>
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
  }
};
</script>
