import axios from 'axios'
import store from '../store'
import router from '../router'
import qs from 'qs'

//配置axios实例，详情见https://axios-http.com/docs/instance
const http = axios.create({
  // baseURL: 'api',

  //请求超时很可能是网络不通
  timeout: 10000,
})

//请求拦截器
http.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    config.data = qs.stringify(config.data)
    return config
  },
  err => Promise.reject(err)
)

//响应拦截器
http.interceptors.response.use(
  res => res,
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          //清除token并跳转到登录页面
          store.commit('LOG_OUT')

          //如果当前不在登录页面则跳转到登录
          router.currentRoute.path !== 'login' && router.replace({
            path:'login',
            query:{redirect:router.currentRoute.path}
          })
          break;

        default:
          break;
      }
    }
    if(err.response)
      return Promise.reject(err.response.data)
    return err
  }
)

export default http