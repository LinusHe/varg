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
            >Benutzername ändern</v-btn>
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
    this.getAccountSettings();
  },
  data: () => ({
    usershort: "JG",
    username: "undefined",
    graphcount: -1
  }),
  methods: {
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$refs["vargraph"];
    },

    // get Settings
    getAccountSettings() {
      this.usershort = this.$store.state.user.name.substring(0, 2).toUpperCase();
      this.username = this.$store.state.user.name;
      this.getGraphCount();
      this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent
        .$refs.graphHeader.usershort = this.usershort;
    },

    logout() {
      this.$store.commit("logout");
      location.reload();
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
        this.graphcount = "(Laden fehlgeschlagen)";
        dialogComponent.dialogError("Laden der Benutzerdaten aus der Datenbank fehlgeschlagen");
      });
    },

    editUserName() {
      // TODO prompt in UI Fenster umbauen -> validation rules für username input:
      // [v => !!v || 'Feld darf nicht leer sein', v => (v || '').indexOf(' ') < 0 || 'Keine Leerzeichen erlaubt', v => v.length <= 25 || 'Maximal 25 Zeichen erlaubt', v => v !== this.$store.state.user.name || 'Das ist dein derzeitiger Name']
      let newName = prompt("Wenn du deinen Benutzernamen ändern möchtest, gib bitte hier den neuen Namen ein und bestätige mit Ok.");

      if(newName) { // newName ersetzen durch this.$refs.userNameForm.validate()
        axios
          .put("http://192.168.99.101:1110/VarG/account", {
            type: 0,
            user: this.$store.state.user.name,
            newInfo: newName
          })
          .then(response => {
            this.$store.state.user.name = newName;
            this.getAccountSettings();
            dialogComponent.dialogSuccess("Benutzername erfolgreich geändert - dein neuer Name ist " + this.$store.state.user.name);
          })
          .catch(error => {
            if(error.response) {
              if(error.response.status === 403) dialogComponent.dialogError("Ändern des Benutzernamens fehlgeschlagen: <b>Dieser Name existiert bereits</b>");
            }
            else dialogComponent.dialogError("Ändern der Benutzerdaten fehlgeschlagen: <b>Netzwerkfehler</b>");
          });
      }
      else {
        dialogComponent.dialogInfo("Benutzername nicht geändert");
      }
    },

    editUserPW() {
      // TODO confirm und prompts in UI Fenster umbauen -> validation rules für beide pw inputs:
      // [v => !!v || 'Feld darf nicht leer sein', v => v.length <= 25 || 'Maximal 25 Zeichen erlaubt']
      if(confirm("Wenn du dein Passwort änderst, wirst du danach ausgeloggt und musst dich neu einloggen. Dabei gehen nicht gespeicherte Daten verloren!")) {
        let currentPW = prompt("Wenn du dein Passwort ändern möchtest, gib bitte hier dein aktuelles Passwort und das neue Passwort ein und bestätige mit Ok.\nAktuelles PW:");
        let newPW = prompt("Neues PW:");

        if(currentPW && newPW) { // currentPW && newPW ersetzen durch this.$refs.userPWForm.validate()
          axios
            .put("http://192.168.99.101:1110/VarG/account", {
              type: 1,
              user: this.$store.state.user.name,
              password: currentPW,
              newInfo: newPW
            })
            .then(response => {
              dialogComponent.dialogSuccess("Passwort erfolgreich geändert - du wirst jetzt ausgeloggt");
              this.logout();
            })
            .catch(error => {
              if(error.response) {
                if(error.response.status === 403) dialogComponent.dialogError("Ändern des Passworts fehlgeschlagen: <b>Das aktuelle Passwort wurde falsch eingegeben</b>");
              }
              else dialogComponent.dialogError("Ändern der Benutzerdaten fehlgeschlagen: <b>Netzwerkfehler</b>");
              });
        }
        else {
          dialogComponent.dialogInfo("Passwort nicht geändert");
        }
      }
      else {
        dialogComponent.dialogInfo("Passwort nicht geändert");
      }
    },

    deleteUserAccount() {
      // TODO confirm und prompt in UI Fenster umbauen -> validation rules für pw input:
      // [v => !!v || 'Feld darf nicht leer sein', v => v.length <= 25 || 'Maximal 25 Zeichen erlaubt']
      if(confirm("Wenn du deinen Account löschst, werden deine Kontoinformationen und alle deine Graphen unwiderruflich aus der Datenbank entfernt! Du wirst nach erfolgreicher Löschung automatisch ausgeloggt.")) {
        let password = prompt("Wenn du deinen Account löschen möchtest, gib bitte hier dein Passwort ein und bestätige mit Ok.");

        if(password) { // password ersetzen durch this.$refs.userDeleteForm.validate()
          axios
            .delete("http://192.168.99.101:1110/VarG/account", {
              params: {
                user: this.$store.state.user.name,
                password: password
              }
            })
            .then(response => {
              dialogComponent.dialogSuccess("Account erfolgreich gelöscht - du wirst jetzt ausgeloggt");
              this.logout();
            })
            .catch(error => {
              if(error.response) {
                if(error.response.status === 403) dialogComponent.dialogError("Löschen des Accounts fehlgeschlagen: <b>Das eingegebene Passwort ist falsch</b>");
              }
              else dialogComponent.dialogError("Löschen des Accounts fehlgeschlagen: <b>Netzwerkfehler</b>");
            });
        }
        else {
          dialogComponent.dialogInfo("Account nicht gelöscht");
        }
      }
      else {
        dialogComponent.dialogInfo("Account nicht gelöscht");
      }
    },

    // apply settings to cytoscape element
    setAccountSettings() {
      // ...
    }
  }
};
</script>
