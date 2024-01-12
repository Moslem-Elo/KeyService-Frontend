

import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

import router from "@/router";

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas, faUserSecret)
app.use(router)

app.mount('#app')
