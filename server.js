// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const router = express.Router();
const { json } = require('body-parser');
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', (req, res) => {
  res.json({ unix: Date.now(), utc: new Date(Date.now()).toUTCString() });
});

app.get('/api/:date', (req, res) => {
  const moment = require('moment');
  const date = req.params.date;

  if (moment(date, 'X', true).isValid()) {
    res.json({
      unix: new Date(Number(date)).getTime() / 1000,
      utc: new Date(Number(date)).toUTCString(),
    });
  } else if (moment(date, ['DD-MM-YYYY', 'D-M-YYYY'], true).isValid()) {
    res.json({
      unix: new Date(date).getTime() / 1000,
      utc: new Date(date).toUTCString(),
    });
  } else if (moment(date, 'dddd, DD MMMM YYYY, h:mm:ss GMT', true).isValid()) {
    res.json({
      unix: new Date(date).getTime() / 1000,
      utc: date,
    });
  } else {
    res.json({
      unix: new Date(date).getTime() / 1000,
      utc: new Date(date).toUTCString(),
    });
  }
});

// listen for requests :)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
