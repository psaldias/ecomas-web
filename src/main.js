import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
import "./assets/css/bulma/css/bulma.min.css";
import "./assets/css/main.css";
import "./assets/libs/fontawesome/css/all.min.css";

createApp(App).use(router).mount("#app");
