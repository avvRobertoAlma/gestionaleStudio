var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

var { User, Folder } = require('../model/userModel');

//const { promisify } = require('util');

//convert into promises fs.readdir and fs.stat

//const readdir = promisify(fs.readdir);
//const stat = promisify(fs.stat);


router.get('/', function(req, res, next){
    if(!req.isAuthenticated()){
      return res.redirect('/users/login');
    }
    console.log(req.user._id);


    User.findById(req.user._id, function(err, user){
      if(err){
        return console.log(err);
      }
      res.render('./templates/dashboard/index', {mainDashboard: true, user: user});

    });
    
  });














  module.exports = router



  // helper function

