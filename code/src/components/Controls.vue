<template>
  <div class="button-container">

    <v-row align="center">

      <v-card class="mx-auto mb-4" max-width="344">

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
            <v-text-field label="Knotenname"></v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="neuerKnoten" large block outlined color="primary">Knoten Hinzufügen</v-btn>
        </v-card-actions>
        
      </v-card>

    </v-row>

    <v-row>

      <v-card class="mx-auto" max-width="344">
        
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">Neue Kante</v-list-item-title>
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
          <v-btn @click="neueKante" depressed large block outlined color="primary">Kante Hinzufügen</v-btn>
        </v-card-actions>

      </v-card>

    </v-row>

  </div>
</template>

<script>
import BasicData from '@/components/BasicData.js'

export default {
  methods: {   
    neuerGraph: function(){
      var Name=prompt('Name: ')
      var Datum=new Date()
      if (Name===""){
        alert('Fehlender Name')
      }
      else alert(Name+" "+Datum)
      var Save =new BasicData(Name,Datum);
    },

    neuerKnoten: function(){
      alert('Test')
      
    },
    neueKante: function(){
      alert('Test')
    }
  }
}
</script>