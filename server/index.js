
const express = require('express');
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});