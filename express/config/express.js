
var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , path = require('path');

module.exports = function (app, config, passport) {

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', config.root + '/app/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());

	// Sessions
	app.use(express.session({
      secret: 'vince secret',
      cookie: { path: '/', httpOnly: true, expires:false },
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
	}));
    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())

	app.use(require(config.root + '/config/middlewares/helpers' ));

	app.use(app.router);

	app.use(require('less-middleware')({ src: config.root + '/public' }));
	app.use(express.static(config.root + '/public'));
	app.use(express.static(config.root + '/dist'));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}







}