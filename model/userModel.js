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
    },
    role: {
        required:true,
        type: String,
    },
    folders: [{ type: Schema.Types.ObjectId, ref: 'Folder'}]
});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var FolderSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        unique: true
    },
    path: {
        type: String,
        unique: true
    }
})

var Folder = mongoose.model('Folder', FolderSchema);
var User = mongoose.model('User', UserSchema);

module.exports.Folder = Folder;
module.exports.User = User;