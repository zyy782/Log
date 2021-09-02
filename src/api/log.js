import http from './conifg'

const logApi = {
    getLogs(query) {
        return http.get('gjx/log/search', { params: query })
    },
    getAllData() {
        return http.get('gjx/log/flow')
    },
    getTop() {
        return http.get('gjx/log/ip-total')
    },
    getTotal() {
        return http.get('gjx/log/ip-total')
    }
}

export default logApi