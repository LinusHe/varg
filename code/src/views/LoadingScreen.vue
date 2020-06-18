<style lang="less"></style>

<template>
  <div>
    <h1 class="ma-10 text-center">
      <v-progress-circular indeterminate color="primary" class="darkmode-ign"></v-progress-circular>
    </h1>
    <p class="ma-10">Bitte warte einen Moment.</p>
  </div>
</template>


<script>
import cyStore from "@/vargraph/graph/cyStore";
export default {
  name: "LoadingScreen",

  /**
   * Checks users state and decides where to redirect in case regular
   * routing process was left e.g because of pagereload
   */
  mounted: function() {
    if (Date.now() > this.$store.getters.getIssuedTime + 3000000000000) { // Checks, if login time is older than 3000000000000 ms. Should be adjusted to more realistic value
      alert("TIMEOUT"); // Redirect to logout page would be better
      this.$store.commit("logout");
      this.$router.replace("/home/login");
      // TODO: improve getter !
    } else if (this.$store.state.user.authenticated) { // User is logged in
      if (window.history.length > 1) { // User has history on page
        if (this.$store.getters.getGraph === null) { // No graph was created by user
          this.$router.replace("/home/menu");
        } else { // User has created graph in the past, graph is loaded and user is redirected to graph editor
          cyStore.data.importedJson = this.$store.getters.getGraph;
          this.$router.replace("/graph");
        }
      } else {
        this.$router.replace("/home/login"); // TODO: redirect to /menu (?)
      }
    } else { // User was not logged in, but tried to enter restricted path. Redirect to /login
      this.$router.replace("/home/login");
    }
  }
};
</script>
