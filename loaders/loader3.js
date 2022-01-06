const { validate } = require( 'schema-utils' )
const schema = require( './schema.json' )
module.exports = function ( content, map, meta ) {
  console.log( 333 )
  // 获取配置信息
  const options = this.getOptions()
  console.log( '333', options )
  // 校验options是否合法
  validate( schema, options, {
    name: 'laoder3'
  } )
  return content
}
module.exports.pitch = function () {
  console.log( 'pitch 333' )
}