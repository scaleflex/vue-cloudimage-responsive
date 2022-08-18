import { createApp } from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload';
import './assets/style.css';

const app = createApp(App);

app.use(VueLazyload, {
  lazyComponent: true
});

app.mount('#app');
