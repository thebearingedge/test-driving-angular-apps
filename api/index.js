'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    database = require('./data.json'),
    fs = require('fs'),
    _ = require('lodash');

var nextId = 1;

database.forEach(function (details) {
  nextId = (details.id && (nextId <= details.id)) ? details.id + 1 : nextId;
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/api/parks', function (req, res) {

  var newPark = (function (details, nextId) {
    details.id = nextId;
    return details;
  }(req.body, nextId));

  database.push(newPark);

  persistDB(database, function () {
    nextId++;
    return res.json(newPark);
  });

});

app.get('/api/parks', function (req, res) {

  return res.json(database);

});

app.get('/api/parks/:id', function (req, res) {

  var id = parseInt(req.params.id, 10);
  var details = _.where(database, { id: id })[0];

  return res.json(details);

});

app.put('/api/parks/:id', function (req, res) {

  var id = parseInt(req.params.id, 10);
  var index = _.findIndex(database, { id: id });

  req.body.id = id;
  database[index] = req.body;

  persistDB(database, function () {
    return res.json(database[index]);
  });

});

app.delete('/api/parks/:id', function (req, res) {

  var id = parseInt(req.params.id, 10);
  database = _.reject(database, { id: id });

  persistDB(database, function () {
    return res.sendStatus(204);
  });

});

app.listen(3000, function () {
  console.log('Express server listening on port 3000');
});

function persistDB(database, callback) {
  fs.writeFile('./data.json', JSON.stringify(database), function (err) {
    if (err) throw err;
    return callback();
  });
}

