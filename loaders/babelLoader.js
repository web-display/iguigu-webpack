const { validate } = require( 'schema-utils' )
// babel的核心模块
const babel = require( '@babel/core' )
// 工具库
const util = require( 'util' )

// babel.transform用来变异代码，是一个普通的异步方法
// 将其转换为一个机遇promise的异步方法
const transform = util.promisify( babel.transform )

const babelSchema = require( './babelSchema.json' )

module.exports = function ( content, map, meta ) {
  // 获取loader的options配置
  const options = this.getOptions() || {}
  // 校验babel的options
  validate( babelSchema, options, {
    name: 'Babel Loader'
  } )

  // 创建异步loader
  const callback = this.async()
  // 使用babel编译代码
  transform( content, options )
    .then( ( { code, map } ) => callback( null, code, map, meta ) )
    .catch( ( e ) => callback( e ) )


}