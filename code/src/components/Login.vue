<template>
  <div>
    <v-list width="300">
      <v-subheadder>Anmeldung</v-subheadder>
      <v-text-field id="username" v-model="input.username" @focus="clearError()" type="text" label="Nutzername" outlined/>
      <v-text-field id="password" v-model="input.password" @focus="clearError()" @keyup.enter="login()" type="password" label="Passwort" outlined/>
      <v-btn @click="login()" outlined color="primary">Anmelden</v-btn>
      <v-alert v-show="error != null">{{ error }}</v-alert>
    </v-list>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        input: {
          username: '',
          password: '',
        },
        error: '',
      }
    },
    methods: {

      /**
       * Validates user input and on success redirects to home view.
       * @var authenticated can be used to verrify if a user has logged in succesfully.
       */
      login() {
        if(this.input.username != "" && this.input.password != "") {
          if(this.input.username == "VarG" && this.input.password == "2020") {
            this.$emit("authenticated", true);
            this.$router.replace("/home");
          } else {
            this.error = 'Falscher Nutzername oder falsches Passwort'
          }
        } else {
          this.error = 'Leere Eingabe'
        }
      },

      /**
       * Clears previous error messages
       */
      clearError() {
        this.error = ''
      },
    }
  }
</script>