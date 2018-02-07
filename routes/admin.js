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

var checkToken = function(req, res, next){
    if(req.query.token == req.user._id){
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
            const message = req.flash('success');
            console.log(message);
            const hasMessages = message.length>0 ? true : false;
            console.log(hasMessages);
            const errors = req.flash('error');
            console.log(errors);
            const error = req.flash('error')[0];
            const hasError = errors.length>0 ? true : false;
            return res.render('templates/dashboard/admin/users', {usersListing:true, layout: 'adminDashboard', hasUsers:users.length>0, users:users, hasMessages:hasMessages, message:message, hasError:hasError, error:error});
        }
    })
});

router.post('/users', checkAdmin, function(req, res, next){
    var newUser = new User({
        username:req.body.username,
        email:req.body.email,
        role:req.body.role
    });
    newUser.password = newUser.encryptPassword(req.body.password);
    newUser.save(function(err){
        if (err){
            req.flash('error', err.message);
            return res.redirect('/admin/users');
        } else {
            req.flash('success', 'Utente creato con successo');
            return res.redirect('/admin/users');
        }
    })
})

router.get('/users/:id', checkAdmin, function(req, res, next){ 
    User.findById(req.params.id).populate('folders').exec(function(err, user){
        if(err){
        return  console.log(err);
        }
        const { folders } = user;
        res.render('templates/dashboard/admin/users', {layout:'adminDashboard', hasUser:true, user:user, hasFolders: folders.length>0, folders:folders});
      });
});

router.get('/users/:id/delete', function(req, res, next){
    console.log('called delete route');
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/admin/users');
        } else {
            console.log('deleted');
            req.flash('success', 'Utente rimosso con successo');
            return res.redirect('/admin/users');
        }
    });
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