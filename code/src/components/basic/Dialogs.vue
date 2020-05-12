<template>
  <div class="varg-alert" id="varg-dialog">
    <!-- TODO: Make style relative to snackbar height (instead of 80) -->
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.dialogVisible)"
      :color="snackbar.color"
      :timeout="snackbar.dialogTimeout"
      v-model="snackbar.dialogVisible"
      :key="snackbar.dialogText + Math.random()"
      :style="`bottom: ${(index * 80) + 8}px`"
    >
      <v-icon v-show="snackbar.info" color="#ffffff" class="ml-2 mr-8">mdi-information</v-icon>
      <v-icon v-show="snackbar.warning" color="#ffffff" class="ml-2 mr-8">mdi-exclamation</v-icon>
      <v-icon v-show="snackbar.success" color="#ffffff" class="ml-2 mr-8">mdi-check-circle</v-icon>
      <v-icon v-show="snackbar.error" color="#ffffff" class="ml-2 mr-8">mdi-alert</v-icon>
      <p class="mt-4" style="color: #ffffff" v-html="snackbar.dialogText"></p>
      <v-btn class="mr-2" color="#ffffff" text @click="snackbar.dialogVisible = false">Schließen</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable standard/computed-property-even-spacing */
export default {
  data() {
    return {
      snackbars: []
    };
  },
  methods: {
    defaultDialog(dialog) {
      dialog.dialogVisible = false;
      dialog.info = false;
      dialog.warning = false;
      dialog.success = false;
      dialog.error = false;
      dialog.dialogTimeout = 3000;
      dialog.wait = false;
      dialog.dialogText = "";
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
      let mySb = {}
      this.defaultDialog(mySb);
      mySb.error = true;
      mySb.color = "error";
      mySb.dialogText = text;
      mySb.dialogVisible = true;
      if (newtimeout != null) mySb.dialogTimeout = newtimeout;
      this.snackbars.push(mySb);
      console.log(this.snackbars);
    }
  }
};
</script>
