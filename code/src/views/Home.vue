<style lang="less"></style>

<template>
  <div class="home-page">
    <HtwkLogoHeader></HtwkLogoHeader>
    <transition
        name="fade"
        mode="out-in"
      >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import HtwkLogoHeader from "@/components/HtwkLogoHeader";

export default {
  name: "home",
  components: {
    HtwkLogoHeader
  }
};
</script>
