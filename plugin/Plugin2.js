class Plugin2 {

  apply( compiler ) {
    compiler.hooks.thisCompilation.tap( 'Plugin2', ( compilation ) => {
      console.log( compilation )
    } )
  }
}

module.exports = Plugin2