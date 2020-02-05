import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
// import 'vuetify/dist/vuetify.min.css';
// import 'vue-material-design-icons/styles.css';
import light from "./theme";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    options: { customProperties: true },
    themes: { light }
  }
});

