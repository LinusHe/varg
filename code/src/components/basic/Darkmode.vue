<template>
 <div>
 </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable standard/computed-property-even-spacing */
import Darkmode from 'darkmode-js';

export default {
  data() {
    return {
        darkmode:null
    };
  },
  mounted: function() {

//Darkmode
var options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#eee', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: false // default: true
}

this.darkmode = new Darkmode(options);
//this.darkmode.showWidget();
  },

  methods: {
      toggleDarkmode(){
          this.darkmode.toggle();
      },
      isActivatedSetting(){
        return this.darkmode.isActivated();
      }
  }
};
</script>
