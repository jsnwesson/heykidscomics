const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
const path = require('path');
const {Params, url, time} = require('./config.js')
const { saveIssue, getCollection } = require('./database/index.js')

app.use(express.static(path.join(__dirname, 'public')))

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
      res.send(result.data.data.results);
    })
    .catch((err) => {
      res.send(err);
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
      res.send(result.data);
    })
    .catch((err) => {
      res.send(err);
    })
})

app.get('/collection/:list', (req, res) => {
  let collectionName = req.params.list;
  return getCollection({listCollection: collectionName})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    })
})

app.post('/save', (req, res) => {
  let userResults = req.data;
  return saveIssue(userResults)
    .then((data) => {
      res.status(201);
    })
    .catch((err) => {
      res.status(401);
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
