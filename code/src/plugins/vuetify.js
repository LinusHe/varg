import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import de from 'vuetify/es5/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        // Siehe assets/styles/basic/color.less
        primary: '#2699FB',
        secondary: '#1D62A8',
        accent: '#82B1FF',
        grey: '#4D4C4C',
        lightgrey: '#797979',
        error: '#FF5252',
        info: '#4D4C4C',
        infoAlert: '#2196f3',
        success: '#4CAF50',
        warning: '#FFC107',
        // Node Colors
        blue: '#2699FB',
        green: '#00CEC9',
        purple: '#6C5CE7',
        pink: '#FD79A8',
        red: '#FF7675',
        orange: '#FAB1A0',
        yellow: '#FDCB6E',
        lightyellow: '#FFEAA7',
      },
    },
  },
    lang: {
      locales: { de },
      current: 'de',
    },
});
