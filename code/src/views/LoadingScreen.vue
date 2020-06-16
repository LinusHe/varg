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
import cyStore from "@/vargraph/graph/cyStore";
//import LoginForm from "@/components/login/LoginForm";
export default {
  name: "LoadingScreen",
  mounted: function() {
    alert(this.$store.state.user.data.authenticated);
    if (Date.now() > this.$store.getters.getIssuedTime + 3000000000000) {
      alert("TIMEOUT");
      localStorage.removeItem("store"); //To do: dont remove store, only user
      this.$store.commit("logout");
      this.$router.replace("/home/login");
      //TODO: improve getter !
    }else if (this.$store.state.user.data.authenticated){   //Token ist gültig!
      if(window.history.length > 1){   // Waren wir da !
        if(this.$store.getters.getGraph === null) {
          this.$router.replace("/home/menu");
        }else{
          //let content = this.$store.getters.getGraph;
      // content = JSON.parse(content);
          cyStore.data.importedJson = this.$store.getters.getGraph;
          this.$router.replace("/graph");

        }
      }else{
        this.$router.replace("/home/login");
      }
    }
    /* else if (this.$store.getters.getAuth && window.history.length > 1 && this.$store.getters.getGraph === null) {
      alert("Nicht Initial betreten");
      alert(window.history.length);
      alert(this.$route.query.redirect);
      this.$router.replace(this.$route.query.redirect);
    } else if (this.$store.getters.getAuth && window.history.length > 1 && !(this.$store.getters.getGraph === null)) {
      alert("Reload");
      //To do: check if graph exists in storage and redirect correctly

      if(this.$store.getters.getGraph === null){
       alert("Kein Graphen");
        this.$router.replace("/home/menu");
      }else{
        alert("Graph gefunden");
        this.$router.replace("/graph");
      }
    }*/ else {
      this.$router.replace("/home/login");
    }
  }
};
</script>
