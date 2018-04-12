const pubsub = require('../pubsub');
const express = require('express');
const handler = require('../handler');
const Message = require('../db/models/messages');
const { verifyFriend } = require('../friends/isFriend');
const { verifyToken } = require('../auth');
const app = express.Router();

const sorter = key => (a, b) => a[key] - b[key]

app.get('/:peer_id', verifyToken, verifyFriend, handler((req) => {
  const peer_id = req.params.peer_id
  const user_id = req.auth._id
  return Promise.all([
    Message.find({ to: peer_id, from: user_id }),
    Message.find({ to: user_id, from: peer_id }),
  ])
  .then(([from, to]) => from.concat(to))
  .then((results) => results.sort(sorter('createdAt')))
  .then((results) => ({ results }))
}));

app.post('/:peer_id', verifyToken, verifyFriend, handler((req) => {
  const peer_id = req.params.peer_id
  const user_id = req.auth._id
  pubsub({ topic: peer_id + ':message' }).publish([user_id])
  return new Message({
    from: user_id,
    to: peer_id,
    content: req.body.content
  }).save()
}))

module.exports = app
