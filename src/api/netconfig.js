import http from './conifg'


const netApi = {

    postIp(ip) {
        return http.post("gjx/asset/config", ip)
    },
    runConfig() {
        return http.post("gjx/asset/config-run")
    },
    configKey(key) {
        return http.post("gjx/log/config-key", key)
    },
    getNetInfo() {
        return http.post('gjx/asset/net-info')
    }

}

export default netApi