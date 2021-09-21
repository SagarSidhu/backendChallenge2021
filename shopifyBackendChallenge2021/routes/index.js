var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://Tester:Password123@cluster0.8oi2y.mongodb.net/test?retryWrites=true&w=majority"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gallery', function(req, res, next) {
  if (global.user_logged_in == false) {
    res.locals.message = "Forbidden must login"
    res.locals.error = 403
    res.status(403);
    res.render('error');
  }
  MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('backend-challenge')
    const usersCollection = db.collection('images')
    usersCollection.find().toArray()
    .then((results) => {
      console.log({results})
      res.send(results)
    })
  })
});

router.get('/myimages', function(req, res, next) {
  if (global.user_logged_in == false) {
    res.locals.message = "Forbidden must login"
    res.locals.error = 403
    res.status(403);
    res.render('error');
  } else {
    console.log('req', req.query)
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
      const db = client.db('backend-challenge')
      const imagesCollection = db.collection('images')
      let query = req.query 
      query.Owner = userID
      imagesCollection.find(query).toArray()
      .then((results) => { 
        res.send(JSON.stringify(results));
      })

    })
  }
});

router.get('/viewPortal', function(req, res, next) {
  if (global.user_logged_in == false) {
    res.locals.message = "Forbidden must login"
    res.locals.error = 403
    res.status(403);
    res.render('error');
  } else {
    res.render('myimages', { title: 'Portal' });
  }
})

router.post('/viewPortal/assignImage', function(req, res, next) {
  if (global.user_logged_in == false) {
    res.locals.message = "Forbidden must login"
    res.locals.error = 403
    res.status(403);
    res.render('error');
  } else {
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
      const db = client.db('backend-challenge')
      const imagesCollection = db.collection('images')
      const imageURL = req.body.imageURL
      let tags = req.body.tags
    
      const date = new Date()
      const params = {
        imageURL: imageURL,
        "Date Added": date,
        Owner: userID,
        AddedBy: userID,
        tags: tags
      }
      imagesCollection.insertOne(params)
      res.send(`Image Added with params ${JSON.stringify(params)}`);
    })
  }
})

module.exports = router;