
module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      datasource : 'dist/businessquizz.json',
      app: {
        name: 'Vincent Dev Config'
      },
      db: 'mongodb://database_uri_here'
    }
  , production: {
      root: require('path').normalize(__dirname + '/..'),
      datasource : 'dist/businessquizz.json',
      app: {
        name: 'Vincent Prod Config'
      },
      db: 'mongodb://database_uri_here'
    }
}
