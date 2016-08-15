const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello, world!');
});

app.get('/hello/:name', function (req, res) {
  res.send('Hello, ' + req.params.name);
});

let savedData = [];

app.post('/save', function (req, res) {
  const data = req.body;
  savedData.push(data);
  res.status(201).json(data);
});

app.get('/saved', function (req, res) {
  res.json(savedData);
});

app.delete('/saved', function (req, res) {
  savedData = [];
  res.sendStatus(204);
});

app.listen(3000, function () {
  console.log('Server listening at http://localhost:3000');
});

module.exports = app;