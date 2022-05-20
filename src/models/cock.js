var mongoose = require('mongoose')

var cockSchema = new mongoose.Schema({
    uid: {
        type: String,
        index: { unique: true }
    },
    name: String,
    email: String,
    picture: String,
    locale: String,
    playlist: [{
        id: String,
        title: String,
        color: {
            type: Number,
            min: [0, 'Colors start at zero.'],
            max: [0xffffff, 'Colors end 0xffffff.']
        }
    }]
}, { timestamps: true })

cockSchema.pre('validate', function (next) {
    next()
})

var cock = mongoose.model('cock', cockSchema)

module.exports = cock