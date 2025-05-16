import App from "@/app.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "flag-icons/css/flag-icons.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import { createApp } from "vue";
import router from "@/router";

import i18n from "@/services/i18n";

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");
