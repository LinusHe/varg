<template>
  <div></div>
</template>

<script>
/* eslint-disable */
window.axios = require('axios')
export default {
  name: 'HTTPRequest',
  mounted: function () {
    console.log("das geht schonmal")
    axios.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
      .then(response => console.log(response));
  }
}
</script>

<style>

</style>