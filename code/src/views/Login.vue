<template>
  <div>
    <img alt="htwk logo" id="htwk-logo" src="../assets/img/htwk.svg" width="400">
    <Login align="center"/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'login',
  components: {
    Login
  }

}
</script>