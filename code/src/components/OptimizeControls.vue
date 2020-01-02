<template>
  <v-container class="optimize-container" fillwidth>
    <div class="optimize-controls">
      <v-card align="center">
        <v-row>
          <p class="headline ma-auto">Optimieren nach</p>
        </v-row>
        <v-row align="center">
          <div class="switch-container">
            <p class="switch-text-left">Zeit</p>
            <v-switch class="switch-button" color="primary" flat inset></v-switch>
            <p class="switch-text-right">Kosten</p>
          </div>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "OptimizeControls"
};
</script>