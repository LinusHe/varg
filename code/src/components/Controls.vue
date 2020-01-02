<template>
  <div class="button-container">
    <v-row align="center">

      <v-card class="mx-auto mb-4"  width="344">

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Nach Kosten berechnen</v-list-item-title>
            
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="findPathForCosts" block outlined color="primary">Nach Kosten optimieren</v-btn>
        </v-card-actions>

      </v-card>
       <v-card class="mx-auto mb-4"  width="344">
       <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Nach Zeit berechnen</v-list-item-title>
            
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="findPathForTime" block outlined color="primary">Nach Zeit optimieren</v-btn>
        </v-card-actions>

      </v-card>





    </v-row>

    <v-row align="center">

      <v-card class="mx-auto mb-4"  width="344">

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Neue Datenstruktur</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="SaveGraph" block outlined color="primary">Graph Speichern</v-btn>
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
import graph  from '../vargraph'
import BasicData from '@/vargraph/BasicData.js'

export default {
  name: 'Controls',
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

    findPathForCosts: function(){
      graph.findPath("optionCosts")
    },
    findPathForTime: function(){
      graph.findPath("optionTime")
    }



  }
}
</script>