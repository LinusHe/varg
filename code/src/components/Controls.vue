<template>
  <div class="controls">
    <v-card class="button-card">
      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark small depressed color="primary">
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
            <v-btn @click="ExportJSon" v-on="on" fab dark small depressed color="primary">
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
          </template>
          <span>Graph laden</span>
        </v-tooltip>
      </v-row>

      <v-row align="center">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn @click="ExportJSon" v-on="on" fab dark small depressed color="primary">
              <v-icon dark>mdi-image</v-icon>
            </v-btn>
          </template>
          <span>Als JSon speichern</span>
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
import graph from "@/vargraph/index.js";
import ExJSon from "@/vargraph/JSonPersistence.js"
import BasicData from "@/vargraph/BasicData.js";
import TestDatabase from "@/vargraph/TestDatabase.js";

export default {
  name: "Controls",
  created() {
    this.vars = {
      testDatabase: new TestDatabase()
    };
  },
  methods: {
    ExportJSon: function () {
      let content=ExJSon.CreateJSon()
      content = JSON.stringify(content, null, 2)
      // eslint-disable-next-line no-console
      console.log(content)
      // let link = document.createElement('link')
      // link.download='Graph.json'
      // let file = new Blob([content],{type: 'text/plain'})
      // link.href = URL.createObjectURL(file)
      // link.click()
      // URL.revokeObjectURL(link.href)
      let name = prompt("Name:");
      let date = new Date();
      if (name != "" && name != null) {
        let save = new BasicData(name, date, content);
        this.vars.testDatabase.save(save);
      }
      else if (name === "") {
        alert("Fehlender Name");
      }
    },
    LoadJSon() {
      let Input = prompt("GraphName: ");
      // Checks if data was input by the user
      if (Input === "") {
        // eslint-disable-next-line no-console
        console.log("Missing graphName");
      } else {
        let instance = this.vars.testDatabase.load(Input);
        // eslint-disable-next-line no-console
        this.vars.testDatabase.logContent()
        ExJSon.LoadJSon(instance.getGraph());
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
      var name = prompt("Name:");
      var date = new Date();
      if (name != "" && name != null) {
        let newGraph = graph.SaveMe();
        let save = new BasicData(name, date, newGraph);
        alert(
          "graph name: " +
            save.getName() +
            "\nsave time: " +
            save.getDate() +
            "\nnodes: " +
            save.getGraph().toString()
        );
        //save.getGraph().SaveMe();
        this.vars.testDatabase.save(save);
        this.vars.testDatabase.logContent();
      } else if (name === "") {
        alert("Fehlender Name");
      }
    },

    findPathForCosts() {
      graph.findPath("optionCosts");
    },
    findPathForTime() {
      graph.findPath("optionTime");
    },

    LoadGraph() {
      let Input = prompt("GraphName: ");
      // Checks if data was input by the user
      if (Input === "") {
        // eslint-disable-next-line no-console
        console.log("Missing graphName");
      } else {
        let instance = this.vars.testDatabase.load(Input);
        // eslint-disable-next-line no-console
        console.log('name: '+instance.getName()+' '+instance.getGraph().toString());
        this.vars.testDatabase.logContent()
        graph.Load(instance.getGraph());
      }
    },
    home() {
      window.location.href = "/home/login";
    },
    datenbank() {
      window.location.href = "/database";
    }
  },
  data: function() {
    return {
      items: ["a", "b", "c"]
    };
  }
};
</script>
