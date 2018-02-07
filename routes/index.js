var express = require('express');
var router = express.Router();

var checkAdminHome = function(req, res, next){
  if(!req.isAuthenticated()){
      return res.redirect('/users/login');
      }
  if (req.isAuthenticated() && req.user.role == 'Admin'){
      return res.redirect('/admin')
  }
  if (req.isAuthenticated()){
    return res.redirect('/dashboard')
} else {
  return next();
}
}


/* GET home page. */
router.get('/', checkAdminHome, function(req, res, next) {
  res.sendStatus(404);
});

module.exports = router;
