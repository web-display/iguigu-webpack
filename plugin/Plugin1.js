class Plugin1 {
  apply( compiler ) {
    console.log( compiler )
    compiler.hooks.emit.tap( 'Plugin1', ( compilation ) => {
      console.log( 'emit.tap' )
    } )
    // 切记异步钩子需要回调函数，否则不会编译文件
    compiler.hooks.done.tapAsync( 'Plugin1', ( stats, cb ) => {
      setTimeout( function () {
        console.log( 'done.tapAsync 1' )
        cb()
      }, 1000 )
    } )
  }
}
module.exports = Plugin1