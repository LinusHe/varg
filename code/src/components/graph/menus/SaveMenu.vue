<template>
  <v-dialog v-model="dialog"  max-width="380">
    <v-card id="save-menu">
      <v-card-title class="headline">Graph in Datenbank speichern</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col sm="12">
              {{message}}
              <v-text-field
                class="mt-6"
                id="DatabaseName"
                label="Datenbankname"
                v-model="DataBaseName"
                outlined
                required
                :rules="[v => !!v || 'Fehlender Name']"
                @input="switchbtntext"
              ></v-text-field>
            </v-col>
          </v-row>
            <v-row>
              <v-col sm="6">
                <v-btn color="success" :disabled="!valid" block outlined id="save-menu-save" @click="save">{{btntext}}</v-btn>
              </v-col>
              <v-col sm="6">
                <v-btn color="error" block outlined id="save-menu-cancel" @click="clearFields">Abbrechen</v-btn>
              </v-col>
            </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import ExJSon from "@/vargraph/JSonPersistence.js"
import BasicData from "@/vargraph/BasicData.js";
import router from '@/router/index.js'
let dialogComponent;

export default {
  name: "SaveMenu",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      valid: true,
      dialog: false,
      DataBaseName: "",
      label: "Datenbankname",
      message: "Legen Sie einen Namen für den Graphen in der Datenbank fest.",
      btntext: "Speichern",
      database: this.$parent.$refs.toolbar.vars.testDatabase
    };
  },
  methods: {
    switchbtntext(){
      if (this.btntext == "Überschreiben")  {
        this.setbtntext("Speichern")
        this.setmsg("Legen Sie einen Namen für den Graphen in der Datenbank fest.")
      }
    },
    setbtntext(value){
      this.btntext=value
    },
    setmsg(value) {
      this.message=value
    },
    setdialog(boolean) {
      this.dialog = boolean;
    },
    setLabel(value) {
      this.DataBaseName = "";
      this.label = value;
    },
    save() {
      //Checks if menu formular was filled in correctly
      if(this.$refs.form.validate()){
        //switching on string values is possible in JS and 
        //is used here to determine in which state the menu is
        switch(this.btntext){

        case "Speichern":
          if (this.DataBaseName != "" && this.DataBaseName != null) {
            let content=ExJSon.CreateJSon()
            //Stringify makes content readable
            content = JSON.stringify(content, null, 2);
            let date = new Date();
            let save = new BasicData(this.DataBaseName, date, content);
            if(this.database.save(save, false)){
              //no dupe
              // eslint-disable-next-line no-console
              console.log('save')
              this.setdialog(false)
              this.clearFields()
              if (this.$parent.$refs.newGraphMenu.dialog){
                router.push({name: "newGraph"})
              }
            }
            else {
              //dupe case
              this.$parent.$refs.saveMenu.setmsg("Es existiert bereits eine Datei unter diesen Namen. Wollen Sie diese überschreiben ?")
              this.$parent.$refs.saveMenu.setbtntext("Überschreiben")
            }
          }
        break;

        case "Überschreiben":
          if (this.DataBaseName != "" && this.DataBaseName != null) {
            let date =new Date();
            //Creates raw JSon Data that is unreadable 
            let content=ExJSon.CreateJSon()
            //Stringify makes content readable
            content = JSON.stringify(content, null, 2);
            let save = new BasicData(this.DataBaseName, date, content);
            this.database.save(save, true)
            //  eslint-disable-next-line no-console
            console.log('overwrite')
            // > Little trick: this should only be true if the user has previously opened 
            //   the newGraph menu - which creates the intended UX.
            this.setdialog(false)
            this.clearFields()
            if (this.$parent.$refs.newGraphMenu.dialog){
                router.push({name: "newGraph"})
            }
          }
          break;

        default:
          break;
       }
      }
    },
    clearFields() {
      this.dialog = false;
      this.DataBaseName = "";
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  }
};
</script>