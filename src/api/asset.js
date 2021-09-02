import http from './conifg'

const assetApi = {

    getAllAssets() {
        return http.get('gjx/asset/all')
    },
    addAsset(asset) {
        return http.put('gjx/asset/add', asset)
    },
    editAsset(asset) {
        return http.post('gjx/asset/edit', asset)
    },
    removeAsset(id) {
        return http.post('gjx/asset/remove', id)
    },

}

export default assetApi