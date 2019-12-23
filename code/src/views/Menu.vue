<style lang="less"></style>

<template>
  <div class="menu-page dotted-background">
    <HomeMenu></HomeMenu>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMenu from "@/components/HomeMenu";

export default {
  name: "Menu",
  components: {
    HomeMenu
  }
};
</script>
