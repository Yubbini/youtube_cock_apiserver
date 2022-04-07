var mongoose = require('mongoose');

var cockSchema = new mongoose.Schema({
    uid : String,
    name : String,
    email : String,
    picture : String,
    locale : String,
    playlist: [{
        id : String,
        title : String,
        color : String
    }]
});

var cock = mongoose.model('cock', cockSchema);

module.exports = cock;