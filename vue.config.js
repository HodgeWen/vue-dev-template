const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 获取文件夹目录, 用来获取别名
const getDirs = (url = './') =>
  fs
    .readdirSync(resolve(url))
    .filter(file => fs.statSync(resolve(url + file)).isDirectory())

// const BASE_URL = '/' // process.env.NODE_ENV === 'production' ? '/' : '/'
module.exports = {
  chainWebpack: config => {
    const { alias } = config.resolve

    // 设置文件夹别名
    getDirs('./src/').forEach(item => {
      alias.set(item, resolve('src/' + item))
    })
    alias
      .set('@', resolve('src'))
      .set('images', resolve('src/assets/images'))
      .set('fonts', resolve('src/assets/fonts'))

    // 删除progress插件,并添加一个自定义progress文件
    config.plugins.delete('progress')
    config
      .plugin('simple-progress-webpack-plugin')
      .use(require.resolve('simple-progress-webpack-plugin'), [
        {
          format: 'minimal' // minimal, compact, expanded, verbose
        }
      ])
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/mixins.scss')]
    }
  },

  // 生产环境不生成.map文件
  productionSourceMap: false,

  devServer: {
    port: 3000,
    hot: true,
    inline: true,
    stats: {
      colors: true
    },
    overlay: {
      errors: true
    },
    // proxy: {
      
    // }
  },

  css: {
    sourceMap: true
  }
}
