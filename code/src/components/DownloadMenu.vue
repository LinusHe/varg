<template>
 <v-dialog v-model="dialog" max-width="450">
    <v-card>
        <v-card-title class="headline">Download</v-card-title>
        <v-card-text>
            <v-row>
                <v-col sm="6" align="right">
                <v-text-field
                class="mt-2"
                id="fileName"
                label= "Name"
                v-model="filename"
                outlined
                hide-details
                >
                </v-text-field>
            </v-col>
            <v-col sm="6">
                <v-select
                @focus="getFormat()"
                v-model="format"
                :items="formatname"
                label="Format"
                >
                </v-select>
            </v-col>
            </v-row>
        </v-card-text> 
        <v-card-actions>
            <v-spacer></v-spacer>
             <v-col sm="6">
            <v-btn color="success" outlined @click="download()">Download</v-btn>
          </v-col>
          <v-col sm="5">
            <v-btn color="error" outlined @click="clearFields">Abbrechen</v-btn>
          </v-col>
        </v-card-actions>
    </v-card>
 </v-dialog>
</template>

<script>
/* eslint-disable no-console */
export default {
    name: 'DownloadMenu',
    data() {
        return {
        dialog: false,
        format: "",
        formatname: [""],
        filename: ""
    };
  },
  methods:   {
      setdialog : function (boolean){
          this.dialog=boolean
      },
      download: function() {
          let file = this.filename+this.format
          this.dialog=false
          console.log(file)
          //this is the filename that needs to be passed to parent component
          return file
      },
      getFormat: function()  {
          this.formatname.push(".json")
          this.formatname.push(".xml")
          this.formatname.push(".png")
        },
      clearFields: function(){
        this.format=""
        this.filename=""
        this.dialog=false
      }
    }
}
</script>