<template>
<!-- Datenbankansicht von Graph-->
  <v-dialog v-model="dialog" width="1000">
    <v-card class="settings-dialog">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <h1>Datenbank</h1>
      </v-card-title>
      <datenbank ref="datenbank"/>
    </v-card>
  </v-dialog>
</template>

<script>
// @ is an alias to /src
/* eslint-disable standard/computed-property-even-spacing */

import datenbank from "@/components/database/DatabaseForm.vue";

export default {
  name: "database",
  data: () => ({
    dialog: false
  }),
  components: {
    datenbank
  },
  methods: {
    openDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        this.$refs.datenbank.getItems();
      });
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
