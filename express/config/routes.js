
module.exports = function (app, config, passport, auth) {

	var controllers = require(config.root + '/app/controllers')
	, users = require(config.root + '/app/controllers/users')
	, usersadmin = require(config.root + '/app/controllers/usersadmin')
	, questions = require(config.root + '/app/controllers/questions')
	, questionsets = require(config.root + '/app/controllers/questionsets')
	, game = require(config.root + '/app/controllers/game')
	, importer = require(config.root + '/app/controllers/importer')

	app.param('userId', users.user)
	app.param('questionId', questions.question)
	app.param('questionsetId', questionsets.questionset)


	/* home */
	app.get('/', game.index);

	/* session */
	app.post('/api/users/session', users.session);
	app.get('/api/users/logout', auth.requiresLogin, users.logout);
	app.get('/api/users/check', auth.requiresLogin, users.check);

	/* users */
	app.post('/api/users/create', users.create);
	app.get('/api/users/:userId', auth.requiresLogin, users.show)
	app.put('/api/users/:userId', auth.requiresLogin, auth.user.hasAuthorization, users.update)
	app.del('/api/users/:userId', auth.requiresLogin, auth.user.hasAdminAuthorization, users.destroy)
	app.get('/api/users', auth.requiresLogin, users.list);

	/* questions */
	app.post('/api/questions/create', auth.requiresLogin, questions.create);
	app.get('/api/questions/:questionId', auth.requiresLogin, questions.show)
	app.put('/api/questions/:questionId', auth.requiresLogin, auth.question.hasAuthorization, questions.update)
	app.del('/api/questions/:questionId', auth.requiresLogin, auth.question.hasAuthorization, questions.destroy)
	app.get('/api/questions', auth.requiresLogin, questions.list);

	/* questionsets */
	app.post('/api/questionsets/create', auth.requiresLogin, questionsets.create);
	app.get('/api/questionsets/:questionsetId', auth.requiresLogin, questionsets.show)
	app.put('/api/questionsets/:questionsetId', auth.requiresLogin, auth.question.hasAuthorization, questionsets.update)
	app.del('/api/questionsets/:questionsetId', auth.requiresLogin, auth.question.hasAuthorization, questionsets.destroy)
	app.get('/api/questionsets', auth.requiresLogin, questionsets.list);


	app.get('/admin/importer/questions', auth.requiresLogin, auth.user.hasAdminAuthorization, importer.questions);


}