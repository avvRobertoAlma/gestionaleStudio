var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

var { User } = require('../model/userModel');

router.get('/', function(req, res, next){
    if(!req.isAuthenticated()){
      console.log('req is not authenticated!');
      return res.redirect('/users/login');
    }
    console.log(req.user._id, 'requserId');


    User.findById(req.user._id, function(err, user){
      if(err){
        return console.log(err);
      }
      console.log(user, 'user current');
      res.render('./templates/dashboard/index', {mainDashboard: true, user: user});
    });
    
  });














  module.exports = router



  // helper function

