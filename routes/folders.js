var express = require('express');
var router = express.Router();

var { User } = require('../model/userModel');
var { Folder } = require('../model/folderModel');

/* helpers */

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
    return res.redirect('/users/login');
  }
  

router.get('/', checkAdmin, function(req, res, next){
    Folder.find().populate('User').exec(function(err, folders){
        if(err){
            return res.json(response);
        }
        if(!folders){
            return res.json(response);
        }
        return res.json(folders);
    })
});


router.get('/:id', checkAuthentication, function(req, res, next){
    Folder.findById(req.params.id, function(err, folder){
        if(err){
            return res.json(response);
        }
        if(!folder){
            return res.json(response);
        }
        return res.render('./templates/dashboard/index', {layout:'userDashboard.handlebars', hasFolder: true, folder: folder});
    })
});



module.exports = router;

