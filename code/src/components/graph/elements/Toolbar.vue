<template>
  <div class="controls">
    <v-card class="button-card">
      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" id="newgraph-btn" fab dark small depressed color="primary" @click="NewGraph">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Neuer Graph</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="datenbank()" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-database-export</v-icon>
            </v-btn>
          </template>
          <span>Graph aus Datenbank laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="modifyData()" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-card-bulleted-settings</v-icon>
            </v-btn>
          </template>
          <span>Daten bearbeiten</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="SaveJSon" id="save-btn" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span>Speichern</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="LoadJSon" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-open-in-app</v-icon>
            </v-btn>
            <input type="file" ref="file" accept=".json" style="display: none" />
          </template>
          <span>Graph laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="Download" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-file-download</v-icon>
            </v-btn>
          </template>
          <span>Download</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-settings</v-icon>
            </v-btn>
          </template>
          <span>Einstellungen</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="home" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Ausloggen</span>
        </v-tooltip>
      </v-row>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
import graph from "@/vargraph/index.js";
import ExJSon from "@/vargraph/JSonPersistence.js"
import BasicData from "@/vargraph/BasicData.js";
import TestDatabase from "@/vargraph/TestDatabase.js";
import importExport from "@/vargraph/importExport.js";
import router from '@/router/index.js'

export default {
  name: "Toolbar",
  created() {
    this.vars = {
      // initializes new instance of TestDatabase when Toolbar is loaded for the first time
      testDatabase: new TestDatabase(),
      instance: BasicData
    }
  },
  methods: {
    //Shows Menu to open up a new Graph with options
    NewGraph(){
      this.$parent.$refs.newGraphMenu.setObject(this.vars.testDatabase)
      this.$parent.$refs.newGraphMenu.setdialog(true)
    },
    //handles saving case and discard case
    modifyData() {
      this.$parent.$refs.modifyDataControls.openModifyData(this.vars.instance)
    },
    updateData(newInstance) {
      this.vars.testDatabase.forceSave(newInstance, this.vars.instance.getGraphName())
      this.vars.instance = newInstance
    },
    Download : function(){
      //not-best-practice aka coupling of components is not wanted
      //in order to make components reusable
      this.$parent.$refs.downloadMenu.setdialog(true)
    },
    onSaveConfirm (value){
      if (value != "" && value != null) {
        let content=ExJSon.CreateJSon()
        //Stringify makes content readable
        content = JSON.stringify(content, null, 2);
        let date = new Date();
        let save = new BasicData(value, date, content);
        if(this.vars.testDatabase.save(save, false)){
          //no dupe
          // eslint-disable-next-line no-console
          console.log('save')
          this.$parent.$refs.saveMenu.setdialog(false)
        }
        else {
          //dupe case
          this.$parent.$refs.saveMenu.setmsg("Es existiert bereits eine Datei unter diesen Namen. Wollen Sie diese überschreiben ?")
          this.$parent.$refs.saveMenu.setbtntext("Überschreiben")
        }
      }
      else if (value == "" || value == null) {
        //do nothing
      }
    },
    onOverwrite(value) {
      let content=ExJSon.CreateJSon()
      //Stringify makes content readable
      content = JSON.stringify(content, null, 2);
      // eslint-disable-next-line no-console
      console.log('overwrite')
      let date = new Date();
      let save = new BasicData(value, date, content);
      this.vars.testDatabase.save(save,true)
      this.$parent.$refs.saveMenu.setdialog(false)
    },
    SaveJSon: function () {
      this.$parent.$refs.saveMenu.setdialog(true)
    },
    LoadJSon() {
      (this.$refs.file);
      this.$refs.file.click();
      this.$refs.file.addEventListener("change", onChange);

      function onChange(event) {
        importExport.loadGraphFromJson(event);
      }
      
    },

    findPathForCosts() {
      graph.findPath("optionCosts");
    },
    findPathForTime() {
      graph.findPath("optionTime");
    },

    home() {
      router.push({name: 'Varg - Login'})
    },
    datenbank() {
      router.push({name: 'Varg - Datenbank import'})
    }
  },
  data: function() {
    return {
      items: ["a", "b", "c"],
    };
  }
};
</script>
