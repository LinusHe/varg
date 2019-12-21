<template>
      <div>
        <p>Anmeldung für VarG</p>

          <form id="loginForm">
              <label>Nutername </label>
              <input v-model="input.username" @focus="clearError()" id="inputUser" type="text" name="username" placeholder="Nutzername">
              <br>
              <label>Passwort </label>
              <input v-model="input.password" @focus="clearError()" @keyup.enter="login" id="inputPassword" type="password" name="password" placeholder="Passwort">
              <br>
            <input type="button" v-on:click="login()"  id="submitLogin" value="Enter">
            <br>
            <span v-show="error != null">{{ error }}</span>
          </form>
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
      clearError() {
        this.error = ''
      },
    }
  }
</script>
