const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const request = require('request');

const build = path.join(__dirname, 'build');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api.php', (req, res) =>
  request.post('http://35.195.25.70/api.php', { json: req.body }).pipe(res)
);

app.use(express.static(build));
app.use('/login', express.static(build));

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on http://localhost:3000/');
});
