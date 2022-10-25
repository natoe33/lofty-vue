import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { } from "@fortawesome/free-regular-svg-icons";

import '@/assets/main.scss';

const app = createApp(App);

app.use(router).use(createPinia());

app.mount("#app");
