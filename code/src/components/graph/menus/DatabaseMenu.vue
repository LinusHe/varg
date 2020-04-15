<template>
  <v-dialog v-model="dialog" max-width="750">
    <v-card class="settings-dialog">
      <v-card-title class="text-center justify-center mb-3 pt-8" color="primary">
        <h1>Datenbank</h1>
      </v-card-title>
      <datenbank />
    </v-card>
  </v-dialog>
</template>

<script>
// @ is an alias to /src

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
    }
  }
};
</script>
