const response = require('express');

const jwt = require('jsonwebtoken');


require('dotenv').config()

const credentials = require('../../models/login/credentials');

const JWT_KEY = process.env.JWT_SECRET_KEY;


exports.verify_user = async(req , res) => {
    const {id , password} = req.body;

    try{
        const user = await credentials.findOne({id});

        if(!user){
            return res.json({code:-1 , message:'User not found'});
        }
        
        const password_validated = (user.password === password);

        if(!password_validated){
            return res.json({code:0 , message:'Invalid password'});
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_KEY , {
            expiresIn: '2h',
        });

        res.json({code:1 ,id: id , role: user.role , token:token , message:'Login successful'});
    }
    catch(err){
        res.json({code:-1 , message:"Couldn't find user"})
    }
};

exports.add_user = async(req , res) =>{
    // const temp = await credentials.insertMany([{id:'2200033017',password:'33017',role:'head'}]);
};
