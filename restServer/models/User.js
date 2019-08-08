var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true},
    pass: { type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
