import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$echarts = echarts

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI)

Vue.config.productionTip = false

//封装message
const message = (type, msg) => {
    ElementUI.Message({
        type: type,
        message: msg
    });
}
Vue.prototype.$hint = message

//封装confirm
const confirm = (info, title, btnconfig = { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }) => {

    return ElementUI.MessageBox.confirm(info, title, btnconfig)
}
Vue.prototype.$alert = confirm

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')