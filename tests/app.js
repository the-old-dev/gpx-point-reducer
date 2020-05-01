var express = require('express');

const PORT = process.env.PORT || 5000;

var app = express();

app.use(express.static('src/public'));

app.listen(PORT, function () {
  console.log('Example app listening on port:=' + PORT +'!');
});
