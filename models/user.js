var mongoose = require('mongoose');
var bcrypt = require ('bcrypt');

  var Schema = mongoose.Schema;
var UserSchema = new Schema({
username: {type:String, required:true, unique:true },
password:{type:String, required:true},
email:{type:String, required: true, unique: true}}, {collection: 'Users'}
);

UserSchema.pre('save',function(next){
  const saltRounds=10;
 var user = this;
 bcrypt.hash(user.password,saltRounds,function(err,hash){
     if(err) return next(err);
     user.password=hash;
      next();
 });
});


 module.exports= mongoose.model('User',UserSchema);
