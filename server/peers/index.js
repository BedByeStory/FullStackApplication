const url = require('url');
const express = require('express');
const app = express.Router();
const pubsub = require('../pubsub');
const User = require('../db/models/user');
const { Types } = require('mongoose');
const { verify } = require('../auth');
const { get, curry } = require('lodash');

function peerUpdated (user_id) {
  pubsub({ topic: user_id + ':update' }).publish(['OK'])
}

function setActive (active, user_id) {
  if (!user_id) return Promise.resolve()
  return User.updateOne({ _id: Types.ObjectId(user_id) }, { $set: { active } })
  .then(() => peerUpdated(user_id))
  .catch(() => {})
}

app.handleConnect = function handleConnect ({ socket }) {
  const userActive = curry(setActive)(true)
  const userInactive = curry(setActive)(false)
  let user_id

  socket.on('active', ([_id]) => {
    user_id = _id
    userActive(user_id)
  })
  socket.on('disconnect', () => {
    userInactive(user_id)
  })
}

module.exports = app
