<template>
  <div>
    <v-dialog v-model="dialog" max-width="440">
      <v-card id="newgraph-menu">
        <v-card-title class="headline">Neuer Graph ?</v-card-title>
        <v-card-text>
          <p>Möchtest du den Graph speichern?</p>
          <em>Wenn der Graph verworfen wird, besteht keine Möglichkeit, den Graph wiederherzustellen.</em>
          <v-row sm="10" class="mt-8">
            <v-col sm="4">
              <v-btn color="success" id="newgraph-menu-save" block @click="save">Speichern</v-btn>
            </v-col>
            <v-col sm="4">
              <v-btn color="warning" id="newgraph-menu-discard" block @click="discard">Verwerfen</v-btn>
            </v-col>
            <v-col sm="4">
              <v-btn color="error" id="newgraph-menu-cancel" block @click="dialog=false">Abbrechen</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

  <!--Popup-Fenster-->
  <!-- <div id="popup1" class="overlay">
  Popupfenster (Solange der Button der Erstellung eines neuen Graphs nicht gedrückt ist, bleibt dieses Fenster versteckt)-->
  <!-- <div class="popup"> -->
  <!--<div class="modal-header"> Header des Popupfenesters -->
  <!-- <h2>Neuer Graph ?</h2> -->
  <!--<a class="close" href="#">&times;</a>
            </div>
        <div class="content">
            Dieser Graph Speichern ?   Inhalt des Popup-Fensters
        </div>
        Footer des Popupfenesters, wo die Funktionsbuttons platziert sind
            <div class="modal-footer">
                Save wird abgeruft, um den Graph zu speichern
               <v-btn class="btn" @click="SaveJSon" href="/home/new" >Speichern</v-btn>
               Doesn't work right now because of rerouting (wait for Loginteam to make that possible)
               Graph verwerfen und direkt an die Seite der Erstellung eines neuen Graphs weiterleiten
               <v-btn class="btn" href="/home/new">Verwerfen</v-btn>
               Doesn't work right now because of rerouting (wait for Loginteam to make that possible)
               Popup-Fenster ausblenden und der Graph weiter bearbeiten
               <v-btn class="btn" href="#">Abbrechen</v-btn>
            </div>
        </div>
  </div>-->
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import router from "@/router/index.js";
let dialogComponent;

export default {
  name: "NewGraphMenu.vue",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      dialog: false,
      database: null
    };
  },
  methods: {
    getGraph() {
      return this.$parent.$refs["vargraph"];
    },
    setObject(DataBaseObject) {
      this.database = DataBaseObject;
    },
    showSaveMenu() {
      this.$parent.$refs.saveMenu.setdialog(true);
      this.dialog = false;
    },
    setdialog(value) {
      this.dialog = value;
    },
    save() {
      this.$parent.$refs.saveMenu.setdialog(true);
    },
    discard() {
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .nodes()
        .remove();
      this.getGraph()
        .getCytoGraph(this.getGraph())
        .edges()
        .remove();
      this.$parent.$refs.newGraphMenu.setdialog(false);
      //this works!!!

      // this.getGraph().getCytoGraph(this.getGraph()).destroy();

      router.push({ name: "menu" });

      //  this.$parent.$destroy();
    }
  }
};
</script>
