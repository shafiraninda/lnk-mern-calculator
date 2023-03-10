const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;