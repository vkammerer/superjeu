
var mongoose = require('mongoose')
  , Questionset = mongoose.model('Questionset')

//param
exports.questionset = function (req, res, next, id) {
  Questionset
    .findOne({ _id : id })
    .exec(function (err, questionset) {
      if (err) return next(err)
      if (!questionset) return next(new Error('Failed to load Questionset ' + id))
      req.questionset = questionset
      next()
    })
}

exports.create = function (req, res) {
  var questionset = new Questionset()
  questionset.questionsetlabel = req.body.questionsetlabel
  questionset.questions = [];
  questionset.save(function (err) {
    if (err) {
      console.log('err');
      console.log(err);
      return res.status(401).json({ errors: err.errors, questionset: questionset })
    }
    return res.json({'questionset': questionset})
  })
}

exports.list = function(req, res){
  var questionsets = Questionset.find({}, function(err, docs){
    res.json({'questionsets': docs})
  });
};
exports.show = function (req, res) {
  var questionset = req.questionset;
  res.json({'questionset': questionset})
}
exports.update = function (req, res) {
  var b = req.body;
  Questionset.update(
    { _id : req.questionset.id },
    {
      questionsetlabel : b.questionsetlabel
    },
    function(err){
      res.status(401).json({ errors: err.errors })
    }
  )
}

exports.destroy = function(req, res){
  var questionset = req.questionset
  questionset.remove(function(err){
    res.json({'questionsets': docs})
  })
}