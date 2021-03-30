const express = require('express');
const app = express();
const path = require('path');
const { writeFile } = require('fs/promises');
const axios = require('axios');

app.use(express.json());

app.post('/', (req, res) => {
  const url = req.body.url;
  axios(url.slice(1, url.length - 1))
  .then(response => {
    res.status(200).send(JSON.stringify(response.data));
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})

app.use(express.static('client'));

app.listen(2000, () => {
  console.log('server listening on port 2000');
})