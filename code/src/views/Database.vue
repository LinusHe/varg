<style lang="less"></style>

<template>
  <div class="database-page">
      <HtwkLogoHeader></HtwkLogoHeader>
      <datenbank/>
      <div class="card-container dotted-background">
      <v-container fill-height grid-list-md>
        <v-layout row wrap align-center>
          <v-card class="login-card mx-auto mb-4">
            <transition
              name="fade"
              mode="out-in"
              @beforeLeave="beforeLeave"
              @enter="enter"
              @afterEnter="afterEnter"
            >
              <router-view></router-view>
            </transition>
          </v-card>
        </v-layout>
      </v-container>
    </div>
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
import HtwkLogoHeader from "@/components/basic/HtwkLogoHeader";
export default {
  name: 'database',
  components: {

    datenbank,
    HtwkLogoHeader
  }
  }

</script>
