require('dotenv').config();
console.log(process.env.MONGO_URI);
console.log(process.env.REDIS_URI);
const express = require('express');
const session = require('express-session');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const Grant = require('grant-express');
const grantConfig = require('./grant.config');
const domainWhitelist = require('./whitelist.config');
const sprocket = require('./sprocket');
const peers = require('./peers');
const users = require('./users');
const User = require('./db/models/user');
const friends = require('./friends');
const alerts = require('./alerts');
const messages = require('./messages');
const db = require('./db/connect');
const grant = new Grant(grantConfig);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(grant);
app.use(cors({
  origin: domainWhitelist,
  credentials: true
}));
app.use('/peers', peers);
app.use('/users', users);
app.use('/friends', friends);
app.use('/alerts', alerts);
app.use('/messages', messages);
app.get('/facebook_callback', function (req, res) {
  res.json(req.query)
});
app.get('/facebook_logout', function (req, res) {
  res.json(req.query)
})
app.get('*', function (req, res) {
  res.json({ success: true })
})
io.on('connection', function (socket) {
  peers.handleConnect({ socket });
  sprocket({ socket });
});

http.listen(process.env.PORT || 3030, function (err) {
  if (err) throw err
  console.log('listening on *:' + (process.env.PORT || 3030), err);
});
