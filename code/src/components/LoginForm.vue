<template>
<v-list-item three-line class="login-container">
  <v-list-item-content>
    <v-list-item-title align="center" class="login-pre-headline mt-5">Variantengraph-Editor</v-list-item-title>
    <v-list-item-title align="center" class="login-headline mb-1">varg</v-list-item-title>
    <v-text-field
    v-model="input.email"
      class="mt-8"
      id="email"
      label="E-Mail"
      placeholder="beispiel@htwk-leipzig.de"
      outlined
      clearable
    ></v-text-field>
    <v-text-field
      v-model="input.password"
      :type="show1 ? 'text' : 'password'"
      id="password"
      label="Passwort"
      placeholder="******"
      
      outlined
    ></v-text-field>
    <!--<router-link to="menu" tag="button">-->
      <v-btn class="login-button" @click="login()" large color="primary">Login</v-btn>
    <!--</router-link>-->

    <a align="center" class="font-italic mt-6" color="error">Passwort vergessen?</a>
    <p align="center" class="login-bottom-links mt-10" color="lightgrey">
      <a>Backend</a> |
      <a>Impressum</a> |
      <a>Datenschutz</a>
    </p>
  </v-list-item-content>
</v-list-item>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
      return {
        input: {
          email: '',
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
        
        if(this.input.email != "" && this.input.password != "") {
          if(this.input.email == "VarG" && this.input.password == "2020") {
            print
            //this.$emit("authenticated", true);
            this.$router.replace("/home/menu");
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



;
</script>

<!--"createNode"

@click="login()"




<button [routerLink]="( ? ['/menu'] : []"></button> -->