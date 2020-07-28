import Vue from 'vue';
import App from './App.vue';
import './assets/style.css';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  lazyComponent: true
});

new Vue({
  render: h => h(App)
}).$mount('#app');
