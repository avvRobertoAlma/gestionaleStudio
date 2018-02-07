var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var FolderSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
    },
    path: {
        type: String,
        unique: true
    },
    status: {
        type: String,
    }
})

var Folder = mongoose.model('Folder', FolderSchema);

module.exports.Folder = Folder;


