<template>
  <div>
    <v-dialog v-model="dialog" max-width="380">
      <v-card id="newgraph-menu">
        <v-card-title class="headline">Neuer Graph ?</v-card-title>
        <v-card-text>Dieser Graph Speichern ?</v-card-text>
        <v-col>
          <v-btn color="success" id="newgraph-menu-save" block outlined @click="save">Speichern</v-btn>
        </v-col>
        <v-col>
          <v-btn color="error" id="newgraph-menu-discard" block outlined @click="discard">Verwerfen</v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="error"
            id="newgraph-menu-cancel"
            block
            outlined
            @click="dialog=false"
          >Abbrechen</v-btn>
        </v-col>
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
import ExJSon from "@/vargraph/JSonPersistence.js";
import BasicData from "@/vargraph/BasicData.js";
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
    onSaveConfirm(value) {
      if (value != "" && value != null) {
        let content = ExJSon.CreateJSon();
        //Stringify makes content readable
        content = JSON.stringify(content, null, 2);
        let date = new Date();
        let save = new BasicData(value, date, content);
        if (this.database.save(save, false)) {
          //no dupe
          // eslint-disable-next-line no-console
          console.log("save");
          this.$parent.$refs.saveMenu.setdialog(false);
          router.push({ name: "newGraph" });
        } else {
          //dupe case
          this.$parent.$refs.saveMenu.setmsg(
            "Es existiert bereits eine Datei unter diesen Namen. Wollen Sie diese überschreiben ?"
          );
          this.$parent.$refs.saveMenu.setbtntext("Überschreiben");
        }
      } else if (value == "" || value == null) {
        //do nothing
      }
    },
    onOverwrite(value) {
      let content = ExJSon.CreateJSon();
      //Stringify makes content readable
      content = JSON.stringify(content, null, 2);
      // eslint-disable-next-line no-console
      console.log("overwrite");
      let date = new Date();
      let save = new BasicData(value, date, content);
      this.database.save(save, true);
      this.$parent.$refs.saveMenu.setdialog(false);
      router.push({ name: "newGraph" });
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
      router.push({ name: "newGraph" });
    }
  }
};
</script>
    