<template>
  <div class="controls">
    <v-card class="button-card">
      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="SaveGraph" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Neuer Graph</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-database-export</v-icon>
            </v-btn>
          </template>
          <span>Graph aus Datenbank laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-content-save</v-icon>
            </v-btn>
          </template>
          <span>Speichern</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-open-in-app</v-icon>
            </v-btn>
          </template>
          <span>Graph laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-image</v-icon>
            </v-btn>
          </template>
          <span>Als Bild speichern</span>
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
            <v-btn @click="home()" fab dark small depressed color="primary">
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
import graph from "../vargraph";
import BasicData from "@/vargraph/BasicData.js";

export default {
  name: "Controls",
  methods: {
    createNode() {
      //Checks if if data was input by the user
      if (document.getElementById('nodeName').value===""){
        // eslint-disable-next-line no-console
        console.log('Missing nodeName')
      }
      else {
        graph.createNode(document.getElementById('nodeName').value)
      }
    },
    // SaveGraph(): creates an instance of BasicData if a valid input (any string input)
    // was given by the user along with the current date (provided by the JS Date object).
    // It also utilizes the toString method of graph to output all current nodes of the graph (for testing purposes).
    // This method should also (in future development) do the following:
    //  - Write new entries into the database
    //  - Check entries within the database to avoid entries with the same name
    //  - Update existing entries
    SaveGraph: function() {
      var name = prompt('Name:')
      var date = new Date()
      if (name != '' && name != null) {
        var save = new BasicData(name, date, graph)
        alert('graph name: ' + save.getName() + '\nsave time: ' + save.getDate() +  '\nnodes: ' + save.getGraph().toString());
      }
      else if (name === '') {
        alert('Fehlender Name')
      }
    },
  home: function(){
    window.location.href='/home';
  }

  }
};
</script>
