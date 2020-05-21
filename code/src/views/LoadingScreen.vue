<style lang="less"></style>

<template>
  <div>
    <h1 class="ma-10 text-center" >
      <v-progress-circular indeterminate color="primary" class="darkmode-ign"></v-progress-circular>
    </h1>
    <p class="ma-10">Bitte warte einen Moment.</p>
  </div>
</template>


<script>
//import LoginForm from "@/components/login/LoginForm";
export default {
  name: "LoadingScreen",
  mounted: function() {
    if (Date.now() > this.$store.getters.getIssuedTime + 3000000000000) {
      localStorage.removeItem("store"); //To do: dont remove store, only user
      this.$store.commit("logout");
      this.$router.replace("/home/login");
    } else if (this.$store.getters.getAuth && window.history.length > 1) {
      this.$router.replace(this.$route.query.redirect);
    } else if (this.$store.getters.getAuth && window.history.length <= 1) {
      //To do: check if graph exists in storage and redirect correctly
      this.$router.replace("/home/menu");
    } else {
      this.$router.replace("/home/login");
    }
  }
};
</script>
