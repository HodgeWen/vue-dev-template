const resolve = require('path').resolve
const fs = require('fs')

// 获取文件夹目录, 用来设置别名
const getDirs = (url = 'src') => fs.readdirSync(resolve(url)).filter(file => fs.statSync(resolve(url, file)).isDirectory())

// 创建代理规则
const makeProxy = (...configs) => {
  let ret = {
    '/group': { target: 'http://172.16.188.139:22999' }
  }
  configs.forEach(([prefix, ip]) => ret[prefix] = {
    target: ip, pathRewrite: { [prefix]: '' }
  })
  return ret
}

module.exports = {
  chainWebpack: config => {
    const { alias } = config.resolve

    // 设置文件夹别名
    getDirs().forEach(item => alias.set(item, resolve('src', item)))
    alias
      .set('@', resolve('src'))
      .set('images', resolve('src/assets/images'))
      .set('fonts', resolve('src/assets/fonts'))
  },

  css: {
    sourceMap: true
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/styles/mixins.scss'), resolve('src/styles/theme-var.scss')]
    }
  },

  // 生产环境不生成.map文件
  productionSourceMap: false,

  devServer: {
    port: 3000,
    hot: true,
    inline: true,
    stats: {
      color: true
    },
    overlay: {
      errors: true
    },
    proxy: makeProxy(
      ['/lulu', 'http://172.16.10.200:8762'],
      ['/chenqi', 'http://172.16.10.152:8762'],
      ['/dev', 'http://172.16.100.37:8762'],
      ['/remote', 'http://zs.cloudkeeper.cn/']
    )
  }
}

