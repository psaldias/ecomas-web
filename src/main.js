import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import api from "@/mixins/api";


// axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZWNvbWFzd3AubG9jYWxob3N0IiwiaWF0IjoxNjY0NDYwNzg1LCJuYmYiOjE2NjQ0NjA3ODUsImV4cCI6MTY2NTA2NTU4NSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.cBhtcTTUAqNA-WFS5vqalQPqXfRYSdY04OethgWImYQ';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Vjb21hc3dwLm1hbmRyaWxkaWdpdGFsLmNsIiwiaWF0IjoxNjY0NTAxMjk5LCJuYmYiOjE2NjQ1MDEyOTksImV4cCI6MTY2NTEwNjA5OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0._qgzLjsr3zrxV9HajfacdnpC0nASOItRYx81iR2aSuo';


// import "./assets/main.css";
import "./assets/css/bulma/css/bulma.min.css";
import "./assets/css/main.css";
import "./assets/css/media.css";
import "./assets/libs/fontawesome/css/all.min.css";

createApp(App)
.use( createPinia() )
.mixin( api )
.use(router)
.mount("#app");

