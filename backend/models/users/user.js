const { number } = require('joi');
const mongoose = require('mongoose');

const model = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'student',
    },
    points:{
        type:number,
        required:true,
        default:0
    },
    registered_clubs: {
        type: [String],
        required: true,
        default: [],
    },
});

const user_details = new mongoose.model('user_details' , model);

module.exports = user_details;