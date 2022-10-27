import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import FileUpload from "primevue/fileupload";
import SelectButton from "primevue/selectbutton";


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

import '@/assets/main.scss';
import "primevue/resources/themes/md-dark-indigo/theme.css";

const app = createApp(App);

app.use(router)
.use(createPinia())
.use(PrimeVue)
.use(ToastService);

app.component('Toast', Toast)
.component('FileUpload', FileUpload)
.component('SelectButton', SelectButton);

app.mount("#app");
