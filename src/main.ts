//import './assets/main.css'
import 'reset-css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import * as typeTool from '@/views/other/tool'



//引入图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.config.globalProperties.$typeTool = typeTool
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// const app = createApp(App)

app.use(router)

app.mount('#app')
