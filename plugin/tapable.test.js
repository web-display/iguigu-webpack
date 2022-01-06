const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesBailHook } = require( 'tapable' )

class Lesson {
  constructor () {
    // 初始化hooks容器
    this.hooks = {
      leave: new AsyncParallelHook( [ 'name', 'age' ] )
    }
  }
  tap() {
    // 往hooks容器中注册事件(添加回调函数)
    this.hooks.leave.tapAsync( 'classc0510', ( name, age, cb ) => {
      setTimeout( () => {
        console.log( 'classc0510', name, age )
        cb()
      }, 1000 )
    } )
    this.hooks.leave.tapPromise( 'classc0610', ( name, age ) => {
      return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
          console.log( 'classc0610', name, age )
          resolve()
        }, 1000 )
      } )
    } )
  }
  start() {
    // 触发hooks
    this.hooks.leave.callAsync( 'jack', 18, function () {
      // 代表所有的leave容器中的函数触发完毕，才触发
      console.log( 'end~~~~~~~~~~' )
    } )
  }
}
const l = new Lesson()
l.tap()
l.start()
/* 
classc0510 jack 18
classc0610 jack 18
end~~~~~~~~~~
*/