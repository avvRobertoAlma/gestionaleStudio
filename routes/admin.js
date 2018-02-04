var express = require('express');
var router = express.Router();

var checkAdmin = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/users/login');
        }
    if (req.isAuthenticated() && req.user.role == 'Admin'){
        return next();
    }
        return res.sendStatus(401);
    }







router.get('/*', checkAdmin, function(req, res, next){
    return res.send('req is administrator');
});



module.exports = router;