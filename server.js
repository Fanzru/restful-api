const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

require('dotenv/config');

// midleware

app.use(bodyParser.json());
// to delete error in codepen.io
app.use(cors())

//app.use(bodyParser.urlencoded({ extended: true }))
// berguna untuk meminta auth agar bisa lanjut ke web yang sedang di tuju
// app.use('/posts',()=>{
//     console.log('Sedang Menjalakan Midleware')
// 
// });

// import post
const postsRoute = require('./routes/posts')

app.use('/posts',postsRoute);
// routes

app.get('/',(req,res)=>{
    res.send('Hello im a home');
});

// connect to mongoDB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true},()=>
    console.log('Yeay Database Connect....')
);

// how to we start listening to the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}......`))