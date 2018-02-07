var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

var { User } = require('../model/userModel');

var checkAuthFull = function(req, res, next){
  if(!req.isAuthenticated()){
      return res.redirect('/users/login');
      }
  if (req.isAuthenticated() && req.user.role == 'Admin'){
      return res.redirect('/admin')
  }
  if (req.isAuthenticated()){ 
    return next();
  }
    
}


router.get('/', checkAuthFull, function(req, res, next){

    User.findById(req.user._id).populate('folders').exec(function(err, user){
      if(err){
      return  console.log(err);
      }
      const { folders } = user;
      res.render('./templates/dashboard/index', {layout:'userDashboard.handlebars', mainDashboard: true, user: user, hasFolders: folders.length>0, folders:folders});
    });
    
  });














  module.exports = router



  // helper function

