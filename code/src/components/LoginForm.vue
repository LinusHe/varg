<template>
<v-list-item three-line class="login-container">
  <v-list-item-content>
    <v-list-item-title align="center" class="login-pre-headline mt-5">Variantengraph-Editor</v-list-item-title>
    <v-list-item-title align="center" class="login-headline mb-1">varg</v-list-item-title>
    <v-text-field
      class="mt-8"
      id="email"
      label="E-Mail"
      placeholder="beispiel@htwk-leipzig.de"
      outlined
      clearable
    ></v-text-field>
    <v-text-field
      v-model="password"
      :type="show1 ? 'text' : 'password'"
      id="password"
      label="Passwort"
      placeholder="******"
      outlined
    ></v-text-field>
    <router-link to="menu" tag="button">
      <v-btn class="login-button" @click="createNode" large color="primary">Login</v-btn>
    </router-link>

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
  name: "LoginForm"
};
</script>