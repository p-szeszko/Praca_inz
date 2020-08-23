
var GoogleStrategy = require('passport-google-oauth20').Strategy
var User = require('../models/user');
var session = require('express-session');
module.exports = function(app,passport){

    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false,saveUninitialized:false,cookie:{secure:false} }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

    passport.use(new GoogleStrategy({
        clientID: '360134415185-ru8j8nj84i016rbv6uaou37tgl0qn00s.apps.googleusercontent.com',
        clientSecret: 'yomlk6mTDEbW0azLE2jk3cm7',
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          console.log(profile);
        done(null,profile);
      }
    ));
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }),
    function(req, res) {
      res.redirect('/');
    });
    return passport;
}