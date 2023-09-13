const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_KEY = process.env.JWT_SECRET_KEY;

exports.verifyToken = (req, res) => {

    const token  = req.body.userToken;

    if(!token){
        return res.json({code:-1 ,role: 'Invalid', message:'Invalid token'})
    }

    jwt.verify(token , JWT_KEY , (err , decoded) =>{
        if(err){
            return res.json({code:-1 ,role: 'Invalid', message:'Invalid token'})
        }
        const role = decoded.role;
        const id = decoded.id;

        res.json({code:1 , role: role ,id:id , message:'Token validated'});
    })
}
