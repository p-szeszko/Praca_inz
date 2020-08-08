var express = require ('express');
var app= express();
var mongoose = require('mongoose');
var morgan = require('morgan');
app.use(morgan('dev'));

app.get('/',(req,res) =>{
    res.send('Hello world');
} )

app.listen(process.env.PORT || 3000, () => {
    console.log('Running the server');
});

