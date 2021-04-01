const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.post('/', (req, res) => {
  const url = req.body.url;
  axios(url.slice(1, url.length - 1))
  .then((response) => {
    const splitURL = url.slice(1, url.length - 1).split('/');
    const base = `${splitURL[0]}//${splitURL[2]}`;
    console.log('baseURL:', base);
    html = response.data.replace('<head>', `<head><base href=${base}></base>`);
    res.status(200).send(JSON.stringify(html));
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
})

app.post('/colors', (req, res) => {
  const { seed, mode, count } = req.body;
  const url = `http://thecolorapi.com/scheme?hex=${seed}&mode=${mode}&count=${count}`;
  axios(url)
  .then((response) => {
    res.status(200).send(response.data);
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