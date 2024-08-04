import "./assets/css/main.css"
import "./assets/css/new-main.css"
import "./assets/css/variables.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import de from "./locale/de.json"
import en from "./locale/en.json"

import {createI18n} from "vue-i18n";

const i18n = createI18n({
    locale: "de",
    messages: {
        de: de,
        en: en
    }
})

const app = createApp(App)
app.use(router);
app.use(i18n)
app.mount('#app');

export { i18n };
