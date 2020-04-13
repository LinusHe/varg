<style lang="less"></style>

<template>
  <div class="database-page">
      <img alt="htwk logo" id="htwk-logo" src="../assets/img/htwk.svg">
      <datenbank/>
      <p align="center" class="bottom-links" color="lightgrey" height="100%">
      <a>Backend</a> |
      <a>Impressum</a> |
      <a>Datenschutz</a>
      </p>
  </div>
</template>

<script>
// @ is an alias to /src
import datenbank from "@/components/database/DatabaseForm.vue"

export default {
  name: 'database',
  components: {

    datenbank
  }
  }

</script>
