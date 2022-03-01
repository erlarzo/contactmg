import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faEdit, faTrash, faPlus, faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

library.add(faUserSecret)
library.add(faEdit)
library.add(faTrash)
library.add(faPlus)
library.add(faArrowLeft)
library.add(faSave)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Buefy)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
