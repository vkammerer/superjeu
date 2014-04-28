
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

//routes handling
exports.nouveau = function (req, res) {
  res.render('questionsets/nouveau', {
    title: 'Create questionset',
    questionset: new Questionset()
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
      return res.render('questionsets/nouveau', { title: 'Nouvelle questionset', errors: err.errors, questionset: questionset })
    }
    return res.redirect('/admin/questionsets')
  })
}

exports.list = function(req, res){
  var questionsets = Questionset.find({}, function(err, docs){
    res.render('questionsets/list', { title: 'All questionsets', questionsets: docs })
  });
};
exports.show = function (req, res) {
  var questionset = req.questionset;
  console.log('questionset')
  console.log(questionset)
  res.render('questionsets/show', {
    title: questionset.questionsetlabel,
    questionset: questionset
  })
}

exports.edit = function (req, res) {
  var questionset = req.questionset
  res.render('questionsets/edit', {
    title: questionset.questionsetlabel,
    questionset: questionset
  })
}
exports.update = function (req, res) {
  var b = req.body;
  Questionset.update(
    { _id : req.questionset.id },
    {
      questionsetlabel : b.questionsetlabel
    },
    function(err){
      res.redirect('/admin/questionsets/' + req.questionset.id)
    }
  )
}

exports.destroy = function(req, res){
  var questionset = req.questionset
  questionset.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/admin/questionsets')
  })
}