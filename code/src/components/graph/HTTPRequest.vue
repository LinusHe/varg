<template>
  <div></div>
</template>

<script>
/* eslint-disable */
/* eslint-disable standard/computed-property-even-spacing */
import axios from 'axios';
export default {
  name: 'HTTPRequest',
  mounted: function () {
    axios.get('http://192.168.1.102:1110/VarG/graph/2', {
      params: {
        user: 'eheldt',
        auth: 'admin'
      }
    })
      .then(response => console.log(response));
  }
}
</script>

<style>

</style>