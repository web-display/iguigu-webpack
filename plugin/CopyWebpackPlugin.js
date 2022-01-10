const webpack = require( 'webpack' )
const path = require( 'path' )
const fs = require( 'fs' )
const { promisify } = require( 'util' )
const { validate } = require( 'schema-utils' )
// 匹配文件列表，并根据规则忽略特定文件
// const globby = require( 'globby' ) //Error
const readFile = promisify( fs.readFile )
const schema = require( './schema.json' )
const { RawSource } = webpack.sources

class CopyWebpackPlugin {
  // 插件的配置在constructor中接收
  constructor ( options = {} ) {
    // 验证options是否符合规范
    validate( schema, options, {
      name: 'CopyWebpackPlugin'
    } )

    this.options = options

  }
  apply( compiler ) {
    console.log( 'copy is worked!!!' )
    // 初始化compilation
    compiler.hooks.thisCompilation.tap( 'CopyWebpackPlugin', ( compilation ) => {
      // 添加资源的钩子
      compilation.hooks.additionalAssets.tapAsync( 'CopyWebpackPlugin', async ( cb ) => {
        // 将from中的资源复制到to中，输出出去
        const { from, ignore } = this.options
        const to = this.options.to || '.'
        // 1.过滤掉ignore的文件

        // context就是webpack配置,就是运行代码的路径
        const context = compiler.options.context //等价于 process.cwd()
        // 将输入路径变成绝对路径
        const absoluteFrom = path.isAbsolute( from ) ? form : path.resolve( context, from )
        // globby的第一个参数必须是绝对路径
        let { globby } = await import( 'globby' )
        const paths = await globby( absoluteFrom, { ignore } ) //所有要加载的文件数组
        console.log( paths )
        // 2.读取paths中所有资源
        const files = await Promise.all(
          paths.map( async ( absolutePath ) => {
            // 获取文件数据
            const data = await readFile( absolutePath )
            // 获取文件名称
            const relativePath = path.basename( absolutePath )
            // 和to属性组合，没有to -->reset.css,有to -->css/reset.css
            const filename = path.join( to, relativePath )
            return {
              data,//file data
              filename,
            }
          } )
        )
        // 3.生成webpack格式的文件
        const assets = files.map( ( file ) => {
          const source = new RawSource( file.data )
          return {
            source,
            filename: file.filename
          }
        } )
        // 4.添加到compilation中，输出出去
        assets.forEach( ( asset ) => {
          compilation.emitAsset( asset.filename, asset.source )
        } )
        cb()
      } )
    } )
  }
}
module.exports = CopyWebpackPlugin