var express = require ('express');
var app= express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var router = express.Router();
var appRoutes = require('./routes/app')(router);
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api',appRoutes);
app.get('/',(req,res) =>{
    res.send('Hello world');
} )
mongoose.connect('mongodb://localhost:27017/AsgApp',  { useNewUrlParser: true,useUnifiedTopology: true },function (err){
    if(err) {
        console.log("Not connected to the database "+err);
    }else {
        console.log('Succesfully connected to AsgApp');
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Running the server');
});

