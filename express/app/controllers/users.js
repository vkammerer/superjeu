
var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , _ = require('underscore')
  , passport = require('passport')

//param
exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}

//api
exports.check = function (req, res) {
  var user = JSON.parse(JSON.stringify(req.user));
  var user = _.omit(user, ['hashed_password', 'salt', 'provider', '__v']);
  res.json(user)
},
exports.session = function (req, res, next) {
  if (!req.body.email) { return res.status(401).json({message:'Please provide an email'}); }
  if (!req.body.password) { return res.status(401).json({message:'Please provide a password'}); }
  passport.authenticate('local', function(err, user ,info){
    if (err) { return next(err); }
    if (!user) { return res.status(401).json(info); }
    else {
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        var user = JSON.parse(JSON.stringify(req.user));
        var user = _.omit(user, ['hashed_password', 'salt', 'provider', '__v']);
        return res.json(user);
      });
    }
  })(req, res, next);  
},
exports.logout = function (req, res) {
  req.logout();
  res.send('');
}
exports.create = function (req, res) {
  if (!req.body.firstname) { return res.status(401).json({message:'Please provide a first name'}); }
  if (!req.body.lastname) { return res.status(401).json({message:'Please provide a last name'}); }
  if (!req.body.email) { return res.status(401).json({message:'Please provide an email'}); }
  if (!req.body.password) { return res.status(401).json({message:'Please provide a password'}); }
  var user = new User(req.body)
  user.provider = 'local'
  User.findOne({ email: req.body.email }, function(err, docs){
    if (docs) {
      res.status(401).json({message:'A user is already using this email'})
    }
    else {
      user.save(function (err) {
        if (err) {
          return res.status(401).json({ errors: err.errors })
        }
        req.logIn(user, function(err) {
          if (err) return next(err)
          var user = JSON.parse(JSON.stringify(req.user));
          var user = _.omit(user, ['hashed_password', 'salt', 'provider', '__v']);
          return res.json({ success: 'Yay', user: user })
        })
      })
    }
  })
}

exports.list = function(req, res){
  var users = User.find({}, function(err, docs){
    res.json({ users: docs })
  });
};
exports.show = function (req, res) {
  var user = req.profile
  res.json({user: user})
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
      res.json({updated:req.profile.id})
    }
  )
}
exports.destroy = function(req, res){
  var user = req.profile
  user.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.json({destroyed:'destroyed'})
  })
}

