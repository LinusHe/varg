<template>
  <div class="detail-controls">
    <!-- Activate Button -->
    <v-card class="activate-button" v-show="!show">
      <v-btn @click="show= !show" class="ma-2" text icon color="primary">
        <v-icon>mdi-triangle</v-icon>
      </v-btn>
    </v-card>

    <!-- Detail Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="show" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="show= !show" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <p class="headline mt-4 ml-4 mr-12">Produktionsschritt 1</p>
      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
export default {
  name: "DetailControls",
  data() {
    return {
      show: false
    };
  }
};
</script>