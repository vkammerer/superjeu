
var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , passport = require('passport')
  , mongoose = require('mongoose')

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require(__dirname + '/config/config')[env]
  , auth = require(__dirname + '/config/middlewares/authorization')

// Bootstrap db connection
mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// Bootstrap passport
require(__dirname + '/config/passport')(passport, config)

// Bootstrap express
var app = express();
require(__dirname + '/config/express')(app, config, passport)

// Bootstrap routes
require(__dirname + '/config/routes')(app, config, passport, auth)

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Bootstrap socket.io
require(__dirname + '/config/socket')(server)