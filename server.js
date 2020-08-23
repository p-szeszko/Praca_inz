var express = require ('express');
var app= express();
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var router = express.Router();
var appRoutes = require('./routes/app')(router);
var bodyParser = require('body-parser');
var passport = require('passport');
var social = require('./passport/passport')(app,passport);


app.use(express.static(__dirname+'/client/dist'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api',appRoutes);
app.get('/',(req,res) =>{
  // return res.sendFile(path.Join(__dirname+'/client/dist/index.html'))
  res.send('<h1>cos</h1>');
} )

mongoose.Promise=global.Promise;
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

