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
    if (Date.now() > (this.$store.getters.getIssuedTime + 3000000000000)) {
          localStorage.removeItem("store");
          this.$store.commit("logout");
          this.$router.replace("/home/login");
    } else if (this.$store.getters.getAuth && window.history.length > 1) {
      this.$router.replace(this.$route.query.redirect);
    } else if (this.$store.getters.getAuth && window.history.length <= 1) {
      this.$router.replace("/home/menu");
    } else {
      this.$router.replace("/home/login");
    }
  }

};
</script>



      if (window.history.length > 1 ) {

          //this.$router.push.redirect();
      } else {
        this.$router.replace("home/menu");
      }
      //alert("ROUUUTING");
