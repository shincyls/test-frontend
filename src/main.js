import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right'
})

app.mount('#app')
