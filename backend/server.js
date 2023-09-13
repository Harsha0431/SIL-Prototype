const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


const login_route = require('./routes/login/login_user');
const verify_token = require('./routes/token_verification/verify_token_route');


require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8082;

mongoose.connect(MONGODB_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/credentials' , login_route) ;

app.use('/verify_token' , verify_token) ;


app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`);
})
