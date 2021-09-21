var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb+srv://Tester:Password123@cluster0.8oi2y.mongodb.net/test?retryWrites=true&w=majority"

router.get('/signin', function(req, res, next) {
  res.render('signup', { title: 'Login' });
});

router.post('/register', function(req, res, next) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('backend-challenge')
    const usersCollection = db.collection('users')
    const username = req.body.username
    const password = req.body.password
    const user = { name: username, password: password }

    usersCollection.find({name: username}).toArray()
    .then(results => {
      if (results.length > 0 ) {
        res.send("User already registered, navigate to '/users/signup/' to login again.")
      } else {
        usersCollection.insertOne(user)
        .then((result) => {
          // User has signed up, have them login now.
          res.render('signup', {
            title: 'Login',
            prompt: `Welcome ${username}! You are now signed up. Go ahead and login!`
          });
        })
        .catch(error => console.error(error))
      }
    })
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
});

router.post('/login', function(req, res, next) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('backend-challenge')
    const usersCollection = db.collection('users')
    const username = req.body.username
    const password = req.body.password
    const user = { name: username, password: password }

    usersCollection.find({name: username}).toArray()
    .then(results => {
      if (results.length > 0 ) {
        usersCollection.find({name: username, password: password}).toArray()
        .then(results => {
          if (results.length > 0 ) {
            // User has logged in, lets redirect them somewhere
            global.userID = username
            global.user_logged_in = true
            res.render('home', { title: 'Home' });
          } else {
            res.send("Sorry wrong password.")
          }
        })
        .catch(error => console.error(error))
      } else {
        res.send("User does not exist, please sign up.")
      }
    })
    .catch(error => console.error(error))
  })
  .catch(error => console.error(error))
});

module.exports = router;