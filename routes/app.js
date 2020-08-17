var User = require('../models/user');

module.exports = function(router){  
router.post('/Users',function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email=req.body.email;
    user.save(function(error) {
        if(error) {
            res.send('Username taken');
        }else
        res.send('user created');
    });
  
});
return router;
}