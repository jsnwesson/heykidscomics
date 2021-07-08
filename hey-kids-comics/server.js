const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
const path = require('path');
const {Params, url, time} = require('./config.js')
const { saveIssue, getCollection } = require('./database/index.js')

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

  axios(searchRequest, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result.data);
    }
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

app.get('/collection/:list', (req, res) => {
  let collectionName = req.params.list;
  getCollection({listCollection: collectionName})
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    })
})

app.post('/save', (req, res) => {
  let userResults = req.body;
  saveIssue(userResults, (err, response) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(201).end();
    }
  })
})

// app.get('/products/:id/related', (req,res) => {
//   let productId = Number(req.params.id);

//   getRelated({current_product_id: productId}, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   })
// })

// app.get('/products/:id/styles', (req, res) => {
//   let productId = Number(req.params.id);

//   getStyles({productId: productId}, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   })
// })

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
