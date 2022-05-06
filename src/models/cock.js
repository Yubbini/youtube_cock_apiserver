var mongoose = require('mongoose')

var cockSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    email: String,
    picture: String,
    locale: String,
    playlist: [{
        id: {
            type: String,
            required: true
        },
        title: String,
        color: {
            type: Number,
            required: true,
            min: [0, 'Colors start at zero.'],
            max: [0xffffff, 'Colors end 0xffffff.']
        }
    }]
}, { timestamps: true })

var cock = mongoose.model('cock', cockSchema)

module.exports = cock