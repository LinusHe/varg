<template>
  <v-container fill-height grid-list-md class="login-container">
    <v-layout row wrap align-center>
      <v-card class="login-card mx-auto mb-4" max-width="390">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title align="center" class="login-pre-headline mt-5">Variantengraph-Editor</v-list-item-title>
            <v-list-item-title align="center" class="login-headline mb-1">varg</v-list-item-title>
            <v-text-field
              class="mt-8"
              id="email"
              label="E-Mail"
              placeholder="beispiel@htwk-leipzig.de"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Passwort"
              placeholder="******"
              outlined
            ></v-text-field>
            <v-btn class="login-button" @click="createNode" large color="primary">Login</v-btn>
            <a align="center" class="font-italic mt-6" color="error">Passwort vergessen?</a>
            <p align="center" class="login-bottom-links mt-10" color="lightgrey">
              <a>Backend</a> |
              <a>Impressum</a> |
              <a>Datenschutz</a>
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "LoginForm"
};
</script>