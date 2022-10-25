const port = process.env.PORT || 5656;

const express = require('express');
const app = express();

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
