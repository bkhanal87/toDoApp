const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: {
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 200, 
        unique: true,
    },
    password: {
        type:String,
        required: true,
        minLength: 6,
        maxLength: 1024,
    },
});

const User = mongoose.model('User', userSchema);

exports.User = User;