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
        error: '#FF5252',
        info: '#4D4C4C',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { de },
      current: 'de',
    },
});
