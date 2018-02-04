var passport = require('passport');

var { User } = require('../model/userModel');

var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true,
}, function(req, username, password, done){
    User.findOne({'username':username}, function(err, user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, { message: 'User already exists' });
        }
        var newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        newUser.email = req.body.email;
        newUser.role = 'User';
        newUser.save(function(err, result){
            if(err){
                return done(err);
            }
            console.log(newUser);
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done){
    User.findOne({'username':username}, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'No user found!'});
        }
        if(!user.validPassword(password)){
            console.log('Wrong Pwd');
            return done(null, false, {message: "Wrong Password!"});
        }
        return done(null, user);
    });
}));