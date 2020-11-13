const express = require('express');
const parser = require('body-parser');
const scrape = require('html-metadata');

const app = express();

var port = parseInt(process.env.PORT) || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(parser.json());

app.get('/', function(req, res) {
  res.send('<pre>post { url: "whatever.com" } as json to me and I\'ll give you back { title: "whatever" }</pre>');
});

app.post('/', function(req, res) {
  const url = req.body.url;

  scrape(url)
    .then(metadata => {
      res.json({ title: metadata.general.title.trim() });
    })
    .catch(error => {
      res.status(204).end();
    });
});

app.listen(port);
