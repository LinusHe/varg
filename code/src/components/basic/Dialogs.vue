<template>
  <div class="varg-alert" id="varg-dialog">
    <v-snackbar :color="color" :timeout="dialogTimeout" v-model="dialogVisible">
      <v-icon v-show="info" color="#ffffff" class="ml-2 mr-8">mdi-information</v-icon>
      <v-icon v-show="warning" color="#ffffff" class="ml-2 mr-8">mdi-exclamation</v-icon>
      <v-icon v-show="success" color="#ffffff" class="ml-2 mr-8">mdi-check-circle</v-icon>
      <v-icon v-show="error" color="#ffffff" class="ml-2 mr-8">mdi-alert</v-icon>
      <p class="mt-4" style="color: #ffffff" v-html="dialogText"></p>
      <v-btn class="mr-2" color="#ffffff" text @click="dialogVisible = false">Schließen</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data() {
    return {
      dialogTimeout: 3000,
      dialogVisible: false,
      dialogText: "",
      color: "info",
      info: false,
      warning: false,
      success: false,
      error: false
    };
  },
  methods: {
    dialogReset() {
      this.dialogVisible = false;
      this.info = false;
      this.warning = false;
      this.success = false;
      this.error = false;
      this.dialogTimeout = 3000;
      this.dialogText = "";
    },
    dialogInfo(text, newtimeout) {
      this.dialogReset();
      this.info = true;
      this.color = "infoAlert";
      this.dialogText = text;
      this.dialogVisible = true;
      if (newtimeout != null) this.dialogTimeout = newtimeout;
    },
    dialogWarning(text, newtimeout) {
      this.dialogReset();
      this.warning = true;
      this.color = "warning";
      this.dialogText = text;
      this.dialogVisible = true;
      if (newtimeout != null) this.dialogTimeout = newtimeout;
    },
    dialogSuccess(text, newtimeout) {
      this.dialogReset();
      this.success = true;
      this.color = "success";
      this.dialogText = text;
      this.dialogVisible = true;
      if (newtimeout != null) this.dialogTimeout = newtimeout;
    },
    dialogError(text, newtimeout) {
      this.dialogReset();
      this.error = true;
      this.color = "error";
      this.dialogText = text;
      this.dialogVisible = true;
      if (newtimeout != null) this.dialogTimeout = newtimeout;
    }
  }
};
</script>
