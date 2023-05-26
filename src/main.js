import { createApp } from "vue";
import { createPinia } from "pinia";

import axios from 'axios'
import router from "./router";

import carroCompra from "/src/mixins/carroCompra";
import api from "/src/mixins/api";
import usuario from "/src/mixins/Usuario";

import App from "./App.vue";

import {createHead} from "@vueuse/head"

axios.defaults.withCredentials = true

// import "./assets/main.css";
import "./assets/css/bulma/css/bulma.min.css";
import "./assets/css/main.css?v=001";
import "./assets/css/media.css";
import "./assets/libs/fontawesome/css/all.min.css";


createApp(App)
.use( createPinia() )
.mixin( api )
.mixin( carroCompra )
.mixin( usuario )
.use(router)
.use(createHead())
.mount("#app");