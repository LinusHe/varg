<template>
  <v-card flat class="scrolling-container" style="max-height: 55vh">
    <v-card-text class="scrolling-container pb-10" style="max-height: 55vh">
      <v-card-subtitle>Account-Infos</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-row>
          <v-col sm="1">
            <v-card-text>
              <v-avatar color="red">
                <span class="white--text headline">{{usershort}}</span>
              </v-avatar>
            </v-card-text>
          </v-col>
          <v-col class="pl-5" sm="11">
            <v-card-text>
              <b>Dein Benutzername:</b>
              {{username}}
              <br />
              <b>Anzahl deiner Graphen in der Datenbank:</b>
              {{graphcount}}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-card-subtitle>Account-Einstellungen</v-card-subtitle>
      <v-card class="ml-6 mr-6">
        <v-row justify="space-around">
          <v-col sm="4">
            <v-btn
              class="darkmode-ign"
              color="blue"
              text
              @click="editUserName()"
            >Benutzernamen ändern</v-btn>
          </v-col>
          <v-col sm="3">
            <v-btn
              class="darkmode-ign"
              color="blue"
              text
              @click="editUserPW()"
            >Passwort ändern</v-btn>
          </v-col>
          <v-col sm="3">
            <v-btn
              class="darkmode-ign"
              color="error"
              text
              @click="deleteUserAccount()"
            >Account löschen</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
import axios from "axios";
let dialogComponent;

export default {
  name: "AccountSettings",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
      .$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
    this.usershort = this.$store.state.user.name.substring(0, 2).toUpperCase();
    this.username = this.$store.state.user.name;
    this.getGraphCount();
  },
  data: () => ({
    usershort: "JG",
    username: "undefined",
    graphcount: 0
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },

    // get Settings
    getAccountSettings() {
      this.getGraphCount();
    },

    getGraphCount() {
      axios
      .get("http://192.168.99.101:1110/VarG/graph/meta", {
        params: {
          user: this.$store.state.user.name,
          role: this.$store.state.user.role
        }
      })
      .then(response => {
        this.graphcount = 0;
        // we have to check which graph belongs to the current user in case he is an admin,
        // otherwise if we would just do this.graphcount = response.data.length
        // an admin would see the number of all graphs from all users in the DB, not just his
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].userName === this.$store.state.user.name) {
            this.graphcount++;
          }
        }
      })
      .catch(error => {
        dialogComponent.dialogError("Laden der Datenbank fehlgeschlagen");
      });
    },

    editUserName() {
      //TODO
    },

    editUserPW() {
      //TODO
    },

    deleteUserAccount() {
      //TODO
    },

    // apply settings to cytoscape element
    setAccountSettings() {
      // ...
    }
  }
};
</script>
