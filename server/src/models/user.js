const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    birthdate: { type: Date, required: true },
    info: [{type: mongoose.Types.ObjectId, ref: "Info"}]
});

module.exports = mongoose.model('User', userSchema);
