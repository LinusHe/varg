<template>
  <div class="button-container">

    <v-row align="center">

      <v-card class="mx-auto mb-4"  width="344">

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Neue Datenstruktur</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="neuerGraph" block outlined color="primary">Graph Hinzufügen</v-btn>
        </v-card-actions>

      </v-card>

    </v-row>

    <v-row align="center">

      <v-card class="mx-auto mb-4" max-width="344">

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Neuer Knoten</v-list-item-title>
            <v-text-field id="nodeName" label="Knotenname"></v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="createNode" large block outlined color="primary">Knoten Hinzufügen</v-btn>
        </v-card-actions>
        
      </v-card>

    </v-row>

    <v-row>

      <v-card class="mx-auto" max-width="344">
        
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title id="demo" class="headline mb-1">Neue Kante</v-list-item-title>
            <v-text-field label="Kantenname"></v-text-field>
            <v-row>
              <v-col sm="6">
                <v-text-field label="Kosten"></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field label="Dauer"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-select :items="from" label="Anfangsknoten"></v-select>
              </v-col>
              <v-col sm="6">
                <v-select :items="to" label="Endknoten"></v-select>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn depressed large block outlined color="primary">Kante Hinzufügen</v-btn>
        </v-card-actions>

      </v-card>

    </v-row>

  </div>
</template>

<script>
import graph from '../vargraph'
import BasicData from '@/vargraph/BasicData.js'

export default {
  name: 'Controls',
  methods: {   
    createNode() {
      //Überprüft ob Daten für Knoten vom User eingegeben wurden
      if (document.getElementById('nodeName').value===""){
        // eslint-disable-next-line no-console
        console.log('Missing Node Name')
      }
      else {
        graph.createNode(document.getElementById('nodeName').value)
        alert(graph.toString())
      }
    },
    neuerGraph: function(){
      var Name=prompt('Name: ')
      var Datum=new Date()
      if (Name === "" || Name == null){
        alert('Fehlender Name')
      }
      else {
        alert(Name + " " + Datum+""+ graph.toString())
        // eslint-disable-next-line no-unused-vars
        var Save=new BasicData(Name, Datum, graph)
      }
    }
  }
}
</script>