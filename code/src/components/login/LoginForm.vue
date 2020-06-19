<template>
  <div>
    <v-list-item three-line class="login-container">
      <v-list-item-content>
        <v-list-item-title align="center" class="login-pre-headline mt-5 mb-3 darkmode-ign">Variantengraph-Editor</v-list-item-title>
        <v-list-item-title align="center" class="login-headline mb-1 darkmode-ign">VarG</v-list-item-title>
        <v-form
          align="center"
          ref="form"
          v-model="valid"
          lazy-validation
          @submit="login()"
          onsubmit="return false;"
        >
          <v-text-field
            v-model="input.email"
            class="mt-8 mb-3 email-input hueshift"
            id="email"
            label="User-Name"
            placeholder="z.B.: jdoe"
            outlined
            clearable
            @focus="clearError()"
            :rules="[v => !!v || 'Feld darf nicht leer sein', 
                   v => (v || '').indexOf(' ') < 0 || 'Keine Leerzeichen erlaubt']"
          ></v-text-field>
          <v-text-field
            v-model="input.password"
            id="password"
            label="Passwort"
            placeholder="******"
            outlined
            class="mb-3 password hueshift"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            :rules="[v => !!v || 'Feld darf nicht leer sein']"
            @focus="clearError()"
            @keyup.enter="login()"
          ></v-text-field>
          <v-btn
            align="center"
            class="login-button darkmode-ign"
            @click="login()"
            large
            color="primary"
            :disabled="!valid"
          >Login</v-btn>
        </v-form>

        <a align="center" class="font-italic mt-6" color="error">Passwort vergessen?</a>
        
        <v-divider
        class="mx-4 mt-10"
        :inset="inset"
        horizontal
      ></v-divider>
      <em align="center" class="login-bottom-links mt-5 mb-5" color="lightgrey">
        Mit freundlicher Unterstützung des <br><br>
        <a target="_blank" href="https://fsrim.htwk-leipzig.de/der-fachschaftsrat/">Fachschaftsrat Informatik & Medien</a>
      </em>
      <p align="center" class="login-bottom-links mt-5" color="lightgrey">
          <a>Backend</a> |
          <a>Impressum</a> |
          <a>Datenschutz</a>
        </p>
      </v-list-item-content>
    </v-list-item>

    <!-- Buttons for debugging. Regard functions in <script>
    <v-btn align="center" class="login-button" @click="getState()" large color="primary">get State</v-btn>

    <v-btn
      align="center"
      class="login-button"
      @click="delLocal()"
      large
      color="primary"
    >Remove localStorage</v-btn> 
    Buttons for debugging. Regard functions in <script> -->
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "LoginForm",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs[
      "dialogs"
    ];
  },
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      show: false,
      valid: false
    };
  },
  methods: {
    // For Debuging. See buttons above
    getState() { // Returns given values from store
      alert(
        "Authenticated: " +
          this.$store.state.user.authenticated +
          "\nName: " +
          this.$store.state.user.name +
          "\nRole: " +
          this.$store.state.user.role +
          "\nIssued: " +
          this.$store.state.user.issued +
          "\nNow: " +
          Date.now() +
          "\nprodName: " +
          this.$store.getters.getProdName +
          "\nprodQuant: " +
          this.$store.getters.getProdQuant
      );
    },
    delLocal() { // Removes localStorage
      localStorage.removeItem("store");
    },

    /**
     * Sends username and password to backend for verification and then redirects to /menu if login was successfull
     * Validation of user input is missing. See outdated login() function
     */
    login: function () {
     this.$store.dispatch("AUTH_REQUEST", { user: this.input.email, password: this.input.password }).then(() => {
     this.$router.replace("/home/menu");
   })
    },

    /**
     * !OUTDATED!
     * Validates user input and on success redirects to home view.
     * @var authenticated can be used to verrify if a user has logged in succesfully.
     * Prototype of an security issue
     */

    /*
    login() {
      if (this.$refs.form.validate()) {
        if (this.input.email === "VarG" && this.input.password === "2020") {
          //new
          this.$store.commit("refreshIssued");
          this.$store.commit("login");
          this.$store.commit("setName", "Hubertus Schmalz");
          this.$store.commit("setRole", "student");

          //old
          //this.$store.commit("increment");

          this.$router.replace("/home/menu");
        } else if (
          this.input.email === "GraV" &&
          this.input.password === "0202"
        ) {
          //new
          this.$store.commit("refreshIssued");
          this.$store.commit("login");
          this.$store.commit("setName", "Dr. Schmalz");
          this.$store.commit("setRole", "admin");

          //old
          //this.$store.commit("increment");

          //TODO: Create alternative Menu for administrative functionality
          this.$router.replace("/home/Menu");
        } else {
          dialogComponent.dialogError(
            "Falscher Nutzername oder falsches Passwort"
          );
        }
      }
    },*/

    /**
     * Clears previous error messages
     */
    clearError() {
      this.error = "";
    }
  }
};
</script>
