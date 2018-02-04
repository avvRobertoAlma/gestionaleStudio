var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    }
});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var User = module.exports = mongoose.model('User', UserSchema);