var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var users = [
  {id:1, name: 'alice'},
  {id:2, name: 'bek'},
  {id:3, name: 'chris'}
]

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/users', function(req, res) {
  req.query.limit = req.query.limit || 10; // 기본 값
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const user = users.filter((user) => user.id === id)[0];
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const user = users.filter((user) => user.id !== id);
  res.status(204).end();
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  // 중복 테스트
  const isConflict = users.filter(user => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const id = Date.now();
  const user = {id, name};
  users.push(user);

  console.log("11111")
  console.log(users);
  res.status(201).json(user);
})

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const name = req.body.name;

  const user = users.filter(user => user.id === id)[0];

  user.name = name;

  res.json(user);
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

module.exports = app;