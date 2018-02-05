var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

var { User } = require('../model/userModel');

var checkAuthentication = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/users/login');
}

router.get('/', checkAuthentication, function(req, res, next){
    console.log(req.user._id, 'requserId');

    User.findById(req.user._id).populate('folders').exec(function(err, user){
      if(err){
      return  console.log(err);
      }
      const { folders } = user;
      console.log(folders);

      res.render('./templates/dashboard/index', {mainDashboard: true, user: user, hasFolders: folders.length>0, folders:folders});
    });
    
  });














  module.exports = router



  // helper function

