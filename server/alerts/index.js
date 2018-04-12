const { Types } = require('mongoose');
const { login, verifyToken } = require('../auth');
const pubsub = require('../pubsub');
const express = require('express');
const handler = require('../handler');
const Alert = require('../db/models/alert');

const app = express.Router();

function newAlert (user_id) {
  pubsub({ topic: user_id + ':alert' }).publish(['OK'])
}

app.get('/', handler(req => {
  return { success: true }
}))

app.get('/unread', verifyToken, handler(req => {
  const user_id = req.auth._id
  return Alert.find({
    user_id: Types.ObjectId(user_id),
    readAt: null
  })
  .populate('from_id').exec()
  .then((results) => ({ results }))
}))

app.get('/read', verifyToken, handler(req => {
  const user_id = req.auth._id
  return Alert.find({
    user_id: Types.ObjectId(user_id),
    readAt: { $ne: null }
  })
  .then((results) => ({ results }))
}))

app.post('/create/:_id', verifyToken, handler(req => {
  const from_id = req.auth._id
  const user_id = req.params._id
  const content = req.body
  return new Alert(Object.assign({
    from_id: Types.ObjectId(from_id),
    user_id: Types.ObjectId(user_id),
  }, content))
  .then((result) => {
    newAlert(user_id)
    return { result }
  })
}))

app.put('/read/:_id', verifyToken, handler(req => {
  const _id = Types.ObjectId(req.params._id)
  const user_id = req.auth._id
  const $set = { readAt: Date.now() }
  return Alert.findOne({ _id })
  .then((alert) => {
    if (!alert) throw new Error('Alert not found')
    if (alert.user_id.toString() !== user_id) throw new Error('Alert not owned by user')
    return Alert.updateOne({ _id }, { $set })
  })
}))

module.exports = app;
