const express = require('express');
const app = express();

app.use(express.static('client'));

// app.get('/', (req, res) => {
//   res.send('test');
// })

app.listen(2000, () => {
  console.log('server listening on port 2000');
})