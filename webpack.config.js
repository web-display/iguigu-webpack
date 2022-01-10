const CopyWebpackPlugin = require( './plugin/CopyWebpackPlugin' )
module.exports = {
  plugins: [
    new CopyWebpackPlugin( {
      from: 'public',
      // to: '.',//默认值
      to: 'css',
      ignore: [ '**/index.html' ]
    } )
  ],
}