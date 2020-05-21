<template>
  <div class="varg-alert" id="varg-dialog">
    <!-- TODO: Make style relative to snackbar height (instead of 80) -->
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.dialogVisible)"
      :color="snackbar.color"
      :timeout="snackbar.dialogTimeout"
      v-model="snackbar.dialogVisible"
      :key="snackbar.dialogText + Math.random()"
      :style="calcHeight(index)"
    >
      <v-icon v-show="snackbar.info" :color="snackbar.textColor" class="ml-2 mr-8">mdi-information</v-icon>
      <v-icon v-show="snackbar.warning" :color="snackbar.textColor" class="ml-2 mr-8">mdi-exclamation</v-icon>
      <v-icon v-show="snackbar.success" :color="snackbar.textColor" class="ml-2 mr-8">mdi-check-circle</v-icon>
      <v-icon v-show="snackbar.error" :color="snackbar.textColor" class="ml-2 mr-8">mdi-alert</v-icon>
      <p class="mt-4" :style="snackbar.textColorStyle" v-html="snackbar.dialogText"></p>
      <v-btn class="mr-2" :color="snackbar.textColor" text @click="snackbar.dialogVisible = false">Schließen</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable standard/computed-property-even-spacing */
export default {
  data() {
    return {
      // dialog queue:
      snackbars: []
    };
  },
  methods: {
    addToSnackbars(snackbar) {
      if(this.snackbars.filter(s => s.dialogVisible).length >= 2) {
        console.log("Reached maximum Dialogs")
        // if more than 2 snackbars -> remove oldest
        this.snackbars[this.snackbars.length-2].dialogVisible = false;
        this.snackbars.filter(s => s.dialogVisible).shift();
      }
      // push to dialog queue
      this.snackbars.push(snackbar);
    },
    defaultDialog(dialog) {
      // default values:
      dialog.textColor = "#000"
      dialog.textColorStyle = "color: #000"
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
      // set to default values
      let mySb = {};
      this.defaultDialog(mySb);

      // set own values
      mySb.info = true;
      mySb.color = "infoAlert";
      mySb.textColor = "#ffffff";
      mySb.textColorStyle = "color: #ffffff";
      mySb.dialogText = text;
      mySb.dialogVisible = true;
      if (newtimeout != null) this.dialogTimeout = newtimeout;

      // push to dialog queue
      this.addToSnackbars(mySb);
    },
    dialogWarning(text, newtimeout) {
      // set to default values
      let mySb = {};
      this.defaultDialog(mySb);

      // set own values
      mySb.warning = true;
      mySb.color = "warning";
      mySb.textColor = "#000";
      mySb.textColorStyle = "color: #000";
      mySb.dialogText = text;
      mySb.dialogVisible = true;
      if (newtimeout != null) this.dialogTimeout = newtimeout;

      // push to dialog-queue
      this.addToSnackbars(mySb);
    },
    dialogSuccess(text, newtimeout) {
      // set to default values
      let mySb = {};
      this.defaultDialog(mySb);

      // set own values
      mySb.success = true;
      mySb.color = "success";
      mySb.textColor = "#ffffff";
      mySb.textColorStyle = "color: #ffffff";
      mySb.dialogText = text;
      mySb.dialogVisible = true;
      if (newtimeout != null) this.dialogTimeout = newtimeout;

      // push to dialog-queue
      this.addToSnackbars(mySb);
    },
    dialogError(text, newtimeout) {
      // set to default values
      let mySb = {};
      this.defaultDialog(mySb);

      // set own values
      mySb.error = true;
      mySb.color = "error";
      mySb.textColor = "#ffffff";
      mySb.textColorStyle = "color: #ffffff";
      mySb.dialogText = text;
      mySb.dialogVisible = true;
      if (newtimeout != null) mySb.dialogTimeout = newtimeout;

      // push to dialog-queue
      this.addToSnackbars(mySb);
    },
    calcHeight(index) {
      let heightString = "bottom: ";
      // fallback value
      let indexHeight = index * 80 + 8;

      let openDialogs = document.getElementsByClassName("v-snack");

      // style for first dialog
      if (index == 0) {
        return "bottom: 8px";
      }
      // style for next dialogs
      else {
        indexHeight =
          parseInt(openDialogs[index - 1].style.bottom) +
          openDialogs[index - 1].offsetHeight +
          18;
      }

      heightString += indexHeight + "px";
      return heightString;
    }
  }
};
</script>
