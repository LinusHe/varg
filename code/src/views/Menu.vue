<style lang="less"></style>

<template>
  <div class="menu-page">
    <HomeMenu></HomeMenu>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMenu from "@/components/home/HomeMenu";

export default {
  name: "Menu",
  components: {
    HomeMenu
  }
};
</script>
