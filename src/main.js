import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

axios.defaults.baseURL = 'https://my-springboot-app.onrender.com/';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');

// Dark Mode initialisieren
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}