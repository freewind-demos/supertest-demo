const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello, world!');
});

app.get('/hello/:name', function (req, res) {
  res.send('Hello, ' + req.params.name);
});

app.post('/save', function(req, res) {
  res.status(201).json(req.body);
});

app.listen(3000, function () {
  console.log('Server listening at http://localhost:3000');
});

module.exports = app;