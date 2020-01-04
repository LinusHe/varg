<template>
  <div class="zoom-controls">
    <v-btn class="ma-2" text icon color="grey">
      <v-icon>mdi-arrow-expand-all</v-icon>
    </v-btn>
    <v-btn class="ma-2" text icon color="grey">
      <v-icon>mdi-magnify-plus-outline</v-icon>
    </v-btn>
    <v-btn class="ma-2" text icon color="grey">
      <v-icon>mdi-magnify-minus-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ZoomControls"
};
</script>