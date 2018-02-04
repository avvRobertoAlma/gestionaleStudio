var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../model/userModel');


var checkAdmin = function(req, res, next){
  if (req.isAuthenticated() && req.user.role == 'Admin'){
      return next();
  }
      return res.sendStatus(401);
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
  return res.redirect('/dashboard');
});


router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
})



module.exports = router;
