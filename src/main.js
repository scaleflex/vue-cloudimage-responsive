import Vue from 'vue';
import App from './App.vue';
import './assets/style.css';
import 'prismjs';
import 'prismjs/themes/prism-funky.css';
import 'prismjs/components/prism-scss.min';
import 'prismjs/plugins/autolinker/prism-autolinker.min';
import 'prismjs/plugins/autolinker/prism-autolinker.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
