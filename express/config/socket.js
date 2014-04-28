var mongoose = require('mongoose')
  , Question = mongoose.model('Question')
  , _ = require('underscore');

module.exports = function (server) {

	var io = require('socket.io').listen(server);

	var getSockets = function(param){
		var arcade = io.sockets.clients('arcade');
		var competitors = [];
		for (var i in arcade) {
			arcade[i].get('user', function(err, user){
				if (param) {
					var matchesFilter = false;
					for (var j in param) {					
						if (user[j] == param[j]){
							matchesFilter = true;
						}
					}
					if (matchesFilter){
						competitors.push(arcade[i])
					}
				}
				else {
					competitors.push(arcade[i])
				}})
			}
		return competitors;
	}
	var getCompetitors = function(param){
		var arcade = io.sockets.clients('arcade');
		var competitors = [];
		for (var i in arcade) {
			arcade[i].get('user', function(err, user){
				if (param) {
					var matchesFilter = false;
					for (var j in param) {					
						if (user[j] == param[j]){
							matchesFilter = true;
						}
					}
					if (matchesFilter){
						competitors.push(user)
					}
				}
				else {
					competitors.push(user)
				}})
			}
		return competitors;
	}
	var setCompetitor = function(socket, param){
		socket.get('user', function(err, user){
			_.extend(user, param);
			socket.set('user', user)
		})
	}
	var setCompetitors = function(param){
		var arcade = io.sockets.clients('arcade');
		for (var i in arcade) {
			arcade[i].get('user', function(err, user){
				_.extend(user, param);
				arcade[i].set('user', user)
			})
		}
	}

	var roomQuestionCount = 0;

	io.sockets.on('connection', function (socket) {
		Question.find({}, function(errQuestion, questionsets){

			var askQuestion = function(){
				var thisQuestionset = questionsets[roomQuestionCount];
				if (thisQuestionset) {
					setCompetitors({'hasreplied' : 0})
//					io.sockets.in('arcade').emit('start');
					setTimeout(function(){
						io.sockets.in('arcade').emit('userlist', getCompetitors())
						io.sockets.in('arcade').emit('questionset', {
							questionset: thisQuestionset
						});						
					}, 1000)
				}
				else {
					io.sockets.in('arcade').emit('end');
				}
				roomQuestionCount ++;
			}

			socket.on('user', function (user) {
				var previousUser = getSockets({'_id':user._id});
				if (previousUser.length > 4) {
					previousUser[0].leave('arcade');
				}
				socket.set('user', user, function(){});
				setCompetitor(socket, {
					'score' : 0 ,
					'hasreplied' : 0,
					'hasstarted' : false
				})
				socket.join('arcade');
				io.sockets.in('arcade').emit('userlist', getCompetitors())
			});

			socket.on('logout', function() {
				socket.disconnect();
			})
			socket.on('disconnect', function() {
				socket.leave('arcade')
				io.sockets.in('arcade').emit('userlist', getCompetitors())
			})

			socket.on('start', function () {
				setCompetitor(socket, {'hasstarted':true});
				if(getCompetitors({'hasstarted':true}).length == io.sockets.clients('arcade').length) {
					setCompetitors({
						'score' : 0 ,
						'hasstarted' : false
					})
					roomQuestionCount = 0;
					io.sockets.in('arcade').emit('userlist', getCompetitors())
					io.sockets.in('arcade').emit('start');
					askQuestion();
				}
			})

			socket.on('reply', function (answer) {
				socket.get('user', function(err, user){
					if (answer.iscorrect) {
						if(getCompetitors({'hasreplied':1}).length == 0) {
							user.score += 2;
						}
						else {
							user.score ++;
						}
						user.hasreplied = 1;
					}
					else {
						user.hasreplied = 2;
						user.score --;
					}
					socket.set('user', user)
				})
				io.sockets.in('arcade').emit('userlist', getCompetitors())

				if(
					(getCompetitors({'hasreplied':1}).length
					+ getCompetitors({'hasreplied':2}).length)
					== io.sockets.clients('arcade').length
				){
					setTimeout(askQuestion, 1000)
				}
			});
		});
	});
}