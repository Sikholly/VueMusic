module.exports = {
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    devServer: {
        proxy: {
            // 对象中键是本地请求地址,值是代理服务器配置对象
            // 注意: vue/cli已经安装并配置了代理模块,可以直接用
            '/api': {
                target: 'http://www.sxly.ml',// 转发到我部署到服务器的网址
                //是否开启跨域
                changeOrigin: true,
                // 其实，用代理的话, 首先你得有一个标识, 告诉他你这个连接要用代理. 不然的话, 可能你的 html, css, js这些静态资源都跑去代理. 所以我们只要接口用代理, 静态文件用本地.
                pathRewrite: {
                    // "^/api"：{}表示接口^/api以开头的要用代理，^/api就是上面的地址
                    '^/api': '',//
                    //   '^/api': ''表示把/api替换为‘’(空字符串)，这样既能使用代理，又能在请求接口api时去掉/api，获得正确的短信api路径
                }
            }
        }
    }
}