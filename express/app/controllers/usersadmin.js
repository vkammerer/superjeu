
var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , _ = require('underscore')

//routes handling
exports.login = function (req, res) {
  var flashError = req.flash('error');
  res.render('users/login', {
    title: 'Login',
    errors : flashError
  })
}
exports.logout = function (req, res) {
  req.logout()
  res.redirect('/admin/users/login')
}
exports.session = function (req, res) {
  res.redirect('/admin/users')
}

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}
exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  User.findOne({ email: req.body.email }, function(err, docs){
    if (docs) {
      var theseErrors = {
        existinguser : {
          type : 'Un compte avec cet email existe déjà'
        }
      }
      res.render('users/signup', { title: 'Sign up', errors: theseErrors, user: user })
    }
    else {
      user.save(function (err) {
        if (err) {
          console.log('err');
          console.log(err);
          return res.render('users/signup', { title: 'Sign up', errors: err.errors, user: user })
        }
        req.logIn(user, function(err) {
          if (err) return next(err)
          return res.redirect('/admin/users')
        })
      })
    }
  })
}

exports.list = function(req, res){
  var users = User.find({}, function(err, docs){
    res.render('users/list', { title: 'All users', users: docs })
  });
};
exports.show = function (req, res) {
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}
exports.edit = function (req, res) {
  var user = req.profile
  res.render('users/edit', {
    title: user.name,
    user: user
  })
}
exports.update = function (req, res) {
  var b = req.body;
  User.update(
    { _id : req.profile.id },
    {
      firstname : b.firstname,
      lastname : b.lastname,
      email : b.email
    },
    function(err){
      res.redirect('/admin/users/' + req.profile.id)
    }
  )
}
exports.destroy = function(req, res){
  var user = req.profile
  user.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/admin/users')
  })
}