const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
const path = require('path');
const {Params, url, time} = require('./config.js')
// const { getProduct, getRelated, getStyles } = require('./database/index.js')

app.use(express.static(path.join(__dirname, 'public')))

//get by comic
app.get(`/query`, (req, res) => {
  let query = Object.keys(req.query)[0];
  let request = req.query[query]

  const configMarvel = {
    method: 'GET',
    url: `${url}series?${query}=${request}&contains=comic&orderBy=startYear&ts=${time()}&apikey=${Params.apikey}&hash=${Params.hash()}`,
  };

  axios(configMarvel)
    .then((result) => {
      console.log(result.data.data.results)
      res.send(result.data.data.results);
    })
    .catch((err) => {
      res.send(err);
    })
});

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
