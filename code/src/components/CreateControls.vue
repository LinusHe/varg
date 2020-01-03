<template>
  <div class="create-controls-container">
    <div id="create-controls">
      <v-speed-dial
        v-model="fab"
        bottom
        right
        direction="top"
        open-on-hover
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="primary" dark fab large>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark color="secondary">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>Neuer Zustand</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab dark color="secondary">
              <v-icon>mdi-link-variant-plus</v-icon>
            </v-btn>
          </template>
          <span>Neue Verknüpfung</span>
        </v-tooltip>
      </v-speed-dial>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateControls",
  data: () => ({
    direction: "top",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition"
  }),

  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },

  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    }
  }
};
</script>