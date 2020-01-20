<style lang="less"></style>

<template>
  <div class="home-page">
    <HtwkLogoHeader></HtwkLogoHeader>
    <div class="card-container dotted-background">
      <v-container fill-height grid-list-md>
        <v-layout row wrap align-center>
          <v-card class="login-card mx-auto mb-4">
            <transition
              name="fade"
              mode="out-in"
              @beforeLeave="beforeLeave"
              @enter="enter"
              @afterEnter="afterEnter"
            >
              <router-view></router-view>
            </transition>
          </v-card>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HtwkLogoHeader from "@/components/basic/HtwkLogoHeader";

export default {
  name: "home",
  components: {
    HtwkLogoHeader
  },
  data() {
    return {
      prevHeight: 0,
      prevWidth: 0
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
      this.prevWidth = getComputedStyle(element).width;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      const { width } = getComputedStyle(element);

      element.style.height = this.prevHeight;
      element.style.width = this.prevWidth;

      setTimeout(() => {
        element.style.height = height;
        element.style.width = width;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
      element.style.width = "auto";
    }
  }
};
</script>
