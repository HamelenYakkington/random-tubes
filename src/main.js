import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);

app.use(VueCookies);
app.mount("#app");
