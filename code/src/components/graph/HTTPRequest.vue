<template>
  <div></div>
</template>

<script>
/* eslint-disable */
window.axios = require('axios')
export default {
  name: 'HTTPRequest',
  mounted: function () {
    axios.get('https://jsonplaceholder.typicode.com/posts/69')
      .then(response => console.log(response));
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'neuergraph1',
      author: 'eheldt',
      userId: 13
    })
      .then(response => console.log(response));

  }
}
</script>

<style>

</style>