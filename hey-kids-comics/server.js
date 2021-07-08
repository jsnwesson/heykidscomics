const express = require('express');
const app = express();
const axios = require('axios');
const port = 3030;
const path = require('path');
const {Params, url, time} = require('./config.js')
const { getCollection, saveCollection, saveIssue } = require('./database/index.js')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//get by comic
app.get(`/query`, (req, res) => {
  let query = Object.keys(req.query)[0];
  let request = req.query[query]

  const searchRequest = {
    method: 'GET',
    url: `${url}${query}?titleStartsWith=${request}&contains=comic&orderBy=startYear&ts=${time()}&apikey=${Params.apikey}&hash=${Params.hash()}`,
  };

  axios(searchRequest)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    })
});

app.get('/issues', (req, res) => {
  let seriesId = req.query.seriesId;
  let offset = req.query.offset * 50 || 0;
  const issuesRequest = {
    method: 'GET',
    url: `${url}/series/${seriesId}/comics?format=comic&noVariants=true&orderBy=issueNumber&limit=50&offset=${offset}&ts=${time()}&apikey=${Params.apikey}&hash=${Params.hash()}`
  }
  axios(issuesRequest)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    })
})

app.get('/collection', (req, res) => {
  let collectionName = req.query.listCollection;
  console.log(req.query.listCollection)
  getCollection({listCollection: collectionName}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  })
})

app.post('/saveIssues', (req, res) => {
  let userResults = req.body;
  let collection = req.body.listCollection;
  saveCollection(collection)
  saveIssue(userResults, (err, response) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(201).end();
    }
  })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
