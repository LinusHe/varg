<template>
<!-- Datenbankansicht von Graph-->
  <v-dialog v-model="dialog" width="1000">
    <v-card class="settings-dialog">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <h1>Datenbank</h1>
      </v-card-title>
      <databaseGUI ref="databaseGUI"/>
    </v-card>
  </v-dialog>
</template>

<script>
// @ is an alias to /src
/* eslint-disable standard/computed-property-even-spacing */

import databaseGUI from "@/components/database/DatabaseForm.vue";

export default {
  name: "database",
  data: () => ({
    dialog: false
  }),
  components: {
    databaseGUI
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        // TODO might need to create a loading animation while loading items
        // and show an error message when unable to connect
        // either way the DB window should always be at full size and not collapse when empty (looks better) 
        this.$refs.databaseGUI.setType(1);
        this.$refs.databaseGUI.loadItems();
      });
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
