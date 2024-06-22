import { createApp } from 'vue';
import App from './App.vue';
import index from './router';
import axios from 'axios';


axios.defaults.baseURL = 'https://my-springboot-app.onrender.com';

const app = createApp(App);
app.use(index);
app.mount('#app');