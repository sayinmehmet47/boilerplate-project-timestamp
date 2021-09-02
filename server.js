// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const router = express.Router();
const { json } = require('body-parser');

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

app.get('/api/:date', (req, res) => {
  const date = Number(req.params.date);
  const dateToUnix = Math.floor(new Date(req.params.date).getTime() / 1000);
  const dateUTC1 = new Date(date).toUTCString();
  const dateUTC2 = new Date(req.params.date).toUTCString();
  if (req.params.date.includes('-')) {
    return res.json({ unix: dateToUnix, utc: dateUTC2 });
  } else {
    return res.json({ unix: date, utc: dateUTC1 });
  }
});

// listen for requests :)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
