<style lang="less"></style>

<template>
  <div class="login-page">
      <HtwkLogoHeader></HtwkLogoHeader>
      <div class="dotted-background fullwidth fullheight">
        <LoginForm></LoginForm>
      </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import Controls from '@/components/Controls.vue'
import VarGraph from '@/components/VarGraph.vue'
import HtwkLogoHeader from '@/components/HtwkLogoHeader'
import LoginForm from '@/components/LoginForm'

export default {
  name: 'login',
  components: {
    Controls,
    VarGraph,
    HtwkLogoHeader,
    LoginForm
  }
}
</script>
