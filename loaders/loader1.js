// loader 本质上是一个函数
// 同步案例1
// module.exports = function ( content, map, meta ) {
// console.log( '111' )
//   console.log( 'content:', content )
//   return content
// }

// 同步案例二
module.exports = function ( content, map, meta ) {
  console.log( '111' )
  console.log( 'content:', content )
  console.log( 'map:', map )
  console.log( 'meta:', meta )
  // null 是否有错误
  this.callback( null, content, map, meta )
}
module.exports.pitch = function () {
  console.log( 'pitch111' )
}