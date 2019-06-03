
const express = require('express');
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

app.get('/api/listings/:id/reservations', (req, res) => {
  const { id } = req.params;
  axios.get(`http://localhost:3002/api/listings/${id}/reservations`)
    .then(response=> res.send(response.data))
    .catch(err => {
      console.log('ERROR: ', err);
      res.json(err)
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});