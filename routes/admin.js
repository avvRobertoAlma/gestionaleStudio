var express = require('express');
var router = express.Router();

var { User } = require('../model/userModel');
var { Folder } = require('../model/folderModel')

var checkAdmin = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/users/login');
        }
    if (req.isAuthenticated() && req.user.role == 'Admin'){
        return next();
    }
        return res.sendStatus(401);
    }

router.get('/', checkAdmin, function(req, res, next){
    return res.render('templates/dashboard/admin/admin', {layout: 'adminDashboard'});
});

router.get('/users', checkAdmin, function(req, res, next){
    User.find({}, function(err, users){
        if(err){
            return console.log(err);
        } else {
            return res.render('templates/dashboard/admin/users', {layout: 'adminDashboard', hasUsers:users.length>0, users:users});
        }
    })
});

router.get('/folders', checkAdmin, function(req, res, next){
    Folder.find({}).populate('clientId').exec(function(err, folders){
        if(err){
            return console.log(err);
        } else {
            console.log(folders.length);
            return res.render('templates/dashboard/admin/folders', {layout: 'adminDashboard', hasFolders:folders.length>0, folders:folders});
        }
    });
});



module.exports = router;