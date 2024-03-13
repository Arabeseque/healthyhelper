import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import { TroisJSVuePlugin } from 'troisjs';

// import './styles/global.css'



export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(TroisJSVuePlugin)
  return {
    app,
    Pinia
  }
}
