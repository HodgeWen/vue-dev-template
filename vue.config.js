const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 获取文件夹目录, 用来获取别名
const getDirs = (url = './') => {
  const ret = []
  const files = fs.readdirSync(resolve(url))

  files.forEach(file => {
    fs.statSync(resolve(url + file)).isDirectory() && ret.push(file)
  })
  return ret
}

const BASE_URL = '/' // process.env.NODE_ENV === 'production' ? '/' : '/'
module.exports = {
  // 打包后的公共路径，具体资源根据域名决定
  publicPath: BASE_URL,

  chainWebpack: config => {
    const { alias } = config.resolve
    getDirs('./src/').forEach(item => {
      alias.set(item, resolve('src/' + item))
    })
    alias
      .set('@', resolve('src'))
      .set('images', resolve('src/assets/images'))
      .set('fonts', resolve('src/assets/fonts'))
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [ path.resolve(__dirname, './src/style/mixins.less') ]
    }
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // 生产环境不生成.map文件
  productionSourceMap: false,

  devServer: {
    hot: true,
    inline: true,
    stats: {
      colors: true
    },
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://xxx.xxx.xxx'
      }
    }
  }
}