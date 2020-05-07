<template>
  <div></div>
</template>

<script>
/* eslint-disable */
/* eslint-disable standard/computed-property-even-spacing */
window.axios = require('axios')
export default {
  name: 'HTTPRequest',
  mounted: function () {
    axios.get('http://192.168.99.101:1110/VarG/graph/1', {
      /*params: {
        user: 'eheldt',
        auth: 'admin'
      }*/
    })
      .then(response => console.log(response));
  }
}
</script>

<style>

</style>