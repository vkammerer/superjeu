
var mongoose = require('mongoose')
  , Question = mongoose.model('Question')
  , Questionset = mongoose.model('Questionset')
  , fs = require('fs')

var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config.js')[env]

//param
exports.questions = function (req, res) {
fs.readFile(config['datasource'], function (err, data) {
  if (err) throw err;
  console.log(data)
  var quizz = JSON.parse(data)
  for (var o in quizz.businessquizz.quizz){
    var businessquestion = quizz.businessquizz.quizz[o];
    var question = new Question();
    for (var p in businessquestion) {
      question[p] = businessquestion[p]
    }
    question.save(function (err) {
      if (err) {
        return res.status(401).json({message:'Please fill in all fields', errors: err.errors, question: question })
      }
      var thisquestion = this.emitted.complete[0];
      Questionset.findOne({}, function(err, questionset){
        questionset.questions.push(thisquestion['_id']);
        questionset.save();
      });
    })
  }
  return res.json({ 'imported' : quizz})


});



}
