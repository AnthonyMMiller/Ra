const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);
          debug(results);
          //here we could do req.logout to sign out.
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
      console.log("rendered signin and my user is: " + req.user );
    })
    //this is the line where passport deals with our auth. 
    //in this case we are using the "local" strat as apposed to google or fb
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
  //this .all is how to protect the profile. 
  //if we get a user back call next if not redirect. 
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
      console.log(req.user)
    });

    //begin logout test
    /*  authRouter.route('/signout')
      .get((req, res)=>{
        req.logOut()
        res.render('signout',{
          nav,
          title: 'signed out'
        })
        req.logOut()
      })
      */
     //this signout seems to work
     authRouter.route('/signout')
     .get((req, res) => {
      req.logOut();
      console.log("this is my user: " + req.user);
      if (!req.user) {
        res.redirect('/');  
      }
      
     })
     /*
     authRouter.route('/signout', function(req, res){
        req.logout();
        res.redirect('/');
      });
      */
    //end logout test
  return authRouter;
}


module.exports = router;
