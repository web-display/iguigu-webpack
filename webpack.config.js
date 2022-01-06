const path = require( 'path' )
const Plugin1 = require( './plugin/Plugin1' )
module.exports = {
  // wp5中默认配置了enty和output
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: path.resolve( __dirname, 'loaders', 'loader1' )
        // use: [
        //   'loader1',
        //   'loader2',
        //   {
        //     loader: 'loader3',
        //     options: {
        //       name: 'jack'
        //     }
        //   }
        // ]
        use: [
          {
            loader: 'babelLoader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
        // loader: 'babelLoader',
        // options: {
        //   presets: [
        //     '@babel/preset-env'
        //   ]
        // }
      }
    ]
  },
  plugins: [
    new Plugin1()
  ],
  // 配置loader解析规则
  resolveLoader: {
    modules: [
      'node_modules',//默认值
      path.resolve( __dirname, 'loaders' )
    ]
  }
}