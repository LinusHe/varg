<template>
  <div>
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
                @click="usernameDialog = true"
              >Benutzername ändern</v-btn>
            </v-col>
            <v-col sm="3">
              <v-btn
                class="darkmode-ign"
                color="blue"
                text
                @click="passwordDialog = true"
              >Passwort ändern</v-btn>
            </v-col>
            <v-col sm="3">
              <v-btn
                class="darkmode-ign"
                color="error"
                text
                @click="deleteDialog = true"
              >Account löschen</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>


    <!-- Dialogs -->

    <!-- Edit Name -->
    <v-dialog v-model="usernameDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Nutzername ändern</v-card-title>
        <v-card-text>
          <b>Wenn du deinen Benutzernamen ändern möchtest, gib bitte hier den neuen Namen ein:</b>
          <br />
          <v-text-field
            v-model="newusername"
            id="username"
            ref="userNameForm"
            label="Neuer Name"
            class="mb-5 mt-5 hueshift"
            :rules="[
              v => !!v || 'Feld darf nicht leer sein',
              v => (v || '').indexOf(' ') < 0 || 'Keine Leerzeichen erlaubt',
              v => v.length <= 25 || 'Maximal 25 Zeichen erlaubt', 
              v => v !== this.$store.state.user.name || 'Das ist dein derzeitiger Name'
            ]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="editUserName()">Account Umbenennen</v-btn>
          <v-btn color="grey" text @click="usernameDialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Password -->
    <v-dialog v-model="passwordDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Passwort ändern</v-card-title>
        <v-card-text>
          <b>Achtung: Wenn du dein Passwort änderst, wirst du danach ausgeloggt und musst dich neu einloggen. Dabei gehen nicht gespeicherte Daten verloren!</b>
          <br />
          <v-text-field
            v-model="password"
            id="password"
            ref="userPWForm"
            label="Aktuelles Passwort"
            class="mb-5 mt-5 password hueshift"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            :rules="[v => !!v || 'Feld darf nicht leer sein', v => v.length <= 25 || 'Maximal 25 Zeichen erlaubt']"
          ></v-text-field>
          <v-text-field
            v-model="newpassword"
            id="newpassword"
            ref="userPWForm"
            label="Neues Passwort"
            class="mb-5 mt-5 password hueshift"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            :rules="[v => !!v || 'Feld darf nicht leer sein', v => v.length <= 25 || 'Maximal 25 Zeichen erlaubt']"
          ></v-text-field>
            <em>Diese Aktion kann nicht rückgängig gemacht werden.</em>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="editUserPW()">Passwort Ändern</v-btn>
          <v-btn color="grey" text @click="passwordDialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Account -->
    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Account löschen</v-card-title>
        <v-card-text>
          <b>Achtung: Wenn du deinen Account löschst, werden deine Kontoinformationen und alle deine Graphen unwiderruflich aus der Datenbank entfernt!<br /><br />
          Du wirst nach erfolgreicher Löschung automatisch ausgeloggt.</b>
          <br />
          <v-text-field
            v-model="password"
            id="password"
            ref="userDeleteForm"
            label="Passwort"
            class="mb-5 mt-5 password hueshift"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            :rules="[v => !!v || 'Feld darf nicht leer sein', v => v.length <= 25 || 'Maximal 25 Zeichen erlaubt']"
          ></v-text-field>
            <em>Diese Aktion kann nicht rückgängig gemacht werden.</em>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteUserAccount()">Account Löschen</v-btn>
          <v-btn color="grey" text @click="deleteDialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </div>
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
    graphcount: -1,
    deleteDialog: false,
    passwordDialog: false,
    usernameDialog: false,
    show: false,
    password: "",
    newpassword: "",
    newusername: "",
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
      .get("https://sam.imn.htwk-leipzig.de:7070/VarG/graph/meta", {
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
      if(this.$refs.userNameForm.validate()) {
        axios
          .put("http://192.168.99.101:1110/VarG/account", {
            type: 0,
            user: this.$store.state.user.name,
            newInfo: this.newusername
          })
          .then(response => {
            this.$store.state.user.name = this.newusername;
            this.getAccountSettings();
            dialogComponent.dialogSuccess("Benutzername erfolgreich geändert - dein neuer Name ist " + this.$store.state.user.name);
            this.usernameDialog = false;
            this.newusername = "";
          })
          .catch(error => {
            if(error.response) {
              if(error.response.status === 403) dialogComponent.dialogError("Ändern des Benutzernamens fehlgeschlagen: <b>Dieser Name existiert bereits</b>");
            }
            else dialogComponent.dialogError("Ändern der Benutzerdaten fehlgeschlagen: <b>Netzwerkfehler</b>");
          });
      }
    },

    editUserPW() {
      if(this.$refs.userPWForm.validate()) {
        axios
          .put("http://192.168.99.101:1110/VarG/account", {
            type: 1,
            user: this.$store.state.user.name,
            password: this.password,
            newInfo: this.newpassword
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
    },

    deleteUserAccount() {
      if(this.$refs.userDeleteForm.validate()) {
        axios
          .delete("http://192.168.99.101:1110/VarG/account", {
            params: {
              user: this.$store.state.user.name,
              password: this.password
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
    },

    // apply settings to cytoscape element
    setAccountSettings() {
      // ...
    }
  }
};
</script>
