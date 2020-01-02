<template>
  <div class="controls">
    <v-card class="button-card">
      <v-row align="center">
        <v-btn @click="neuerGraph" fab dark small depressed color="primary">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-row>

      <v-row align="center">
        <v-btn fab dark small depressed color="primary">
          <v-icon dark>mdi-database-export</v-icon>
        </v-btn>
      </v-row>

      <v-row align="center">
        <v-btn fab dark small depressed color="primary">
          <v-icon dark>mdi-content-save</v-icon>
        </v-btn>
      </v-row>

      <v-row align="center">
        <v-btn fab dark small depressed color="primary">
          <v-icon dark>mdi-open-in-app</v-icon>
        </v-btn>
      </v-row>

      <v-row align="center">
        <v-btn fab dark small depressed color="primary">
          <v-icon dark>mdi-image</v-icon>
        </v-btn>
      </v-row>

      <v-row align="center">
        <v-btn fab dark small depressed color="primary">
          <v-icon dark>mdi-settings</v-icon>
        </v-btn>
      </v-row>

      <v-row align="center">
        <v-btn fab dark small depressed color="primary">
          <v-icon dark>mdi-logout</v-icon>
        </v-btn>
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
      graph.createNode(document.getElementById("nodeName").value);
    },
    neuerGraph: function() {
      var Name = prompt("Name: ");
      var Datum = new Date();
      if (Name === "") {
        alert("Fehlender Name");
      } else alert(Name + " " + Datum);
      new BasicData(Name, Datum);
    }
  }
};
</script>