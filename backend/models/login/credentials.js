const mongoose = require('mongoose');

const model = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true,
        default:'student'
    }
});

const user_credentials = new mongoose.model('login_credentials',model);

module.exports = user_credentials;