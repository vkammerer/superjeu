
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({error: 'Ressource requires authentication'});
  }
  next()
}

exports.requiresLoginAdmin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/admin/users/login')
  }
  next()
};


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
      if ((req.user.email != 'vkammerer@gmail.com') && (req.profile.id != req.user.id)) {
        return res.status(401).json({error: 'Ressource requires different authentication'});
      }
      next()
    },
    hasAdminAuthorization : function (req, res, next) {
      if (req.user.email != 'vkammerer@gmail.com') {
        return res.status(401).json({error: 'Ressource requires different authentication'});
      }
      next()
    },
    hasAuthorizationAdmin : function (req, res, next) {
      if ((req.user.email != 'vkammerer@gmail.com') && (req.profile.id != req.user.id)) {
        return res.redirect('/admin/users/'+req.profile.id)
      }
      next()
    },
    hasAdminAuthorizationAdmin : function (req, res, next) {      
      if (req.user.email != 'vkammerer@gmail.com') {
        console.log('yo');
        return res.redirect('/admin/users/'+req.profile.id)
      }
      next()
    },
}

exports.question = {
    hasAuthorization : function (req, res, next) {
      if (req.question.user != req.user.id) {
        return res.status(401).json({error: 'Ressource requires different authentication'});
      }
      next()
    },
    hasAuthorizationAdmin : function (req, res, next) {
      if (req.question.user != req.user.id) {
        return res.redirect('/admin/questions/'+req.question.id)
      }
      next()
    }
}
