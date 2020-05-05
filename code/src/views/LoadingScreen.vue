<style lang="less"></style>

<template>
  <div>
    <h1>Loading...</h1>
  </div>
</template>


<script>
//import LoginForm from "@/components/login/LoginForm";
export default {
  name: "LoadingScreen",
  mounted: function() {
    if (this.$store.state.user.autehticated === true) {
      this.$router.replace("/home/menu");
    } else {
      this.$router.replace("/home/login");
    }
  }
};
</script>