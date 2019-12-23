<style lang="less"></style>

<template>
  <div class="login-page dotted-background">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm";

export default {
  name: "login",
  components: {
    LoginForm
  }
};
</script>
