var express = require('express');
var router = express.Router();
var passport = require('passport');

var { User } = require('../model/userModel');

// HELPERS

var checkAdmin = function(req, res, next){
  if (req.isAuthenticated() && req.user.role == 'Admin'){
      return next();
  }
      return res.sendStatus(401);
  }

var checkAuthentication = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  console.log('req is not authenticated');
  return res.redirect('/users/login');
}





/* GET signup page. */

router.get('/signup', function(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/dashboard');
  }
  return res.render('./templates/registration/signup');
});

/* POST signup page. */

router.post('/signup', passport.authenticate('local.signup',{
  failureRedirect: '/users/signup',
  failureFlash: true,
}), function(req, res, next){
  return res.redirect('/dashboard');
});

/* GET login page. */

router.get('/login', function(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/dashboard');
  }
  var messages = req.flash('error');
  res.render('./templates/registration/login', {messages: messages, hasErrors: messages.length>0});
});

/* POST login page. */

router.post('/login', passport.authenticate('local.signin',{
  failureRedirect: '/users/login',
  failureFlash: true,
}), function(req, res, next){
  console.log(req.user._id, 'id utente');
  return res.redirect('/dashboard');
});


router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});



/* GET SINGLE USER */
//TODO CHECKAUTHENTICATION

router.get('/:id', function(req, res, next){
  console.log(req.params.id, 'reqParamsID');
  User.findById(req.params.id).populate('folders').exec(function(err, user){
    if(err){
    return  console.log(err);
    }
    console.log(user);
    return res.json(user);
  });
});

/* GET USERS LISTING - only authenticated admins */

router.get('/', checkAdmin, function(req, res, next){
  User.find({role:'User'}, function(err, users){
    if(err){
      return res.sendStatus(404);
    }
    return res.json(users);
  })
});


module.exports = router;

