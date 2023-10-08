import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueTheMask from 'vue-the-mask'
/* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import { faTwitter } from '@fortawesome/free-brands-svg-icons'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// library.add(faUserSecret, faTwitter);

const app = createApp(App)

app.use(router).use(VueSweetalert2).use(VueTheMask);
app.component('EasyDataTable', Vue3EasyDataTable);
/* add font awesome icon component */
// app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app')
