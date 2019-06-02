
const express = require('express');
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

app.get('/homes', function(req, res) {
  res.status(200);
  db.getHomesForServer(function(home) {
    res.json(home);
  });
});

app.get('/reviews', function(req, res) {
  db.Review.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  })
  .catch(err => {
    console.error("error ", err);
    res.status(400).json({err});  
  }); 
});

app.get('/related', (req, res) => {
  //trigger database query for 12 entries
  //sorting and establishing of relation should be handled within the function that makes the query
  let thisHome = req.body
  getRelatedHomes(thisHome, (err, result) => {
    if(err) {
      console.log(err)
      res.status(403).send(err)
    } else {
      // sends the sorted results back to the client
      res.status(200).send(result)
    }
  })
}) 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});