
var mongoose = require('mongoose')
  , Question = mongoose.model('Question')
  , Questionset = mongoose.model('Questionset')

//param
exports.question = function (req, res, next, id) {
  Question
    .findOne({ _id : id })
    .exec(function (err, question) {
      if (err) return next(err)
      if (!question) return next(new Error('Failed to load Question ' + id))
      req.question = question
      next()
    })
}

var getAnswersArray = function(reqbody) {
  var answers = []
  for (var name in reqbody){
    if (
      (name.indexOf('answer') !== -1)
      && (name.indexOf('_true') == -1)
    ){
      var thisAnswer = {
        answerlabel: reqbody[name]
      }
      var thisIsCorrect = name + '_true';
      thisAnswer.iscorrect = reqbody[thisIsCorrect] ? true : false;
      answers.push(thisAnswer)
    }
  }
  return answers
}
exports.create = function (req, res) {
  var question = new Question();
  question.user = req.user;
  question.questionlabel = req.body.questionlabel;
  question.answers = getAnswersArray(req.body);

  question.save(function (err) {
    if (err) {
      return res.status(401).json({message:'Please fill in all fields', errors: err.errors, question: question })
    }
    Questionset.findOne({_id:req.body.questionset_id}, function(err, questionset){
      questionset.questions.push(question);
      questionset.save();
    });
    return res.json({ 'question' : question})
  })
}
exports.list = function(req, res){
  var questions = Question.find({}, function(err, docs){
    res.json({ 'questions': docs })
  });
};
exports.show = function (req, res) {
  var question = req.question
  res.json({ 'question': question })
}

exports.update = function (req, res) {
  var b = req.body;
  var answers = getAnswersArray(req.body);
  Question.update(
    { _id : req.question.id },
    {
      questionlabel : b.questionlabel,
      answers : answers
    },
    function(err){
      res.json({ 'question': question })
    }
  )
}

exports.destroy = function(req, res){
  var question = req.question
  question.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.json({ 'question': question })
  })
}