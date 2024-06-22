import { createApp } from 'vue';
import App from './App.vue';
import index from './router';
import axios from 'axios';


axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'https://my-springboot-app.onrender.com';

const app = createApp(App);
app.use(index);
app.mount('#app');