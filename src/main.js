import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

loadFonts();

createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .use(VueChartkick)
  .mount("#app");
