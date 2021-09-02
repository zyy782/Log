module.exports = {
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        // proxy:'',
        proxy: {
            '/api': {
                target: 'http://192.168.24.253:3000/mock/222',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },

            '/gjx': {
                target: 'http://10.11.47.251:8081/',
                changeOrigin: true,
                pathRewrite: {
                    '^/gjx': ''
                }
            },

            '/zxq': {
                target: 'http://10.11.46.125:8081/',
                changeOrigin: true,
                pathRewrite: {
                    '^/zxq': ''
                }
            },


            '/zh': {
                target: 'http://10.11.46.115:8081/',
                changeOrigin: true,
                pathRewrite: {
                    '^/zh': ''
                }
            }

        }
    }

}