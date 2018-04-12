const { Types } = require('mongoose');
const { login, verifyToken } = require('../auth');
const express = require('express');
const handler = require('../handler');
const pubsub = require('../pubsub');
const Friend = require('../db/models/friend');
const Alert = require('../db/models/alert');
const User = require('../db/models/user');
const app = express.Router();

function newAlert (user_id) {
  pubsub({ topic: user_id + ':alert' }).publish(['OK'])
}

app.get('/', handler(req =>
  Friend.find({ })
  .then(results => ({ results }))))

app.get('/active', verifyToken, handler(req => {
  const user_id = req.auth._id
  const requesteeQuery = Object.assign({}, userIsRequestee(user_id), isAccepted())
  const requestorQuery = Object.assign({}, userIsRequestor(user_id), isAccepted())

  return Promise.all([
    Friend.find(requesteeQuery).populate('requestor').exec(),
    Friend.find(requestorQuery).populate('requestee').exec()
  ])
  .then(([requestors, requestees]) => {
    return []
    .concat(requestors.map(f => f.requestor))
    .concat(requestees.map(f => f.requestee))
  })
  .then(results => ({ results }))
}))

app.get('/requestee', verifyToken, handler(req => {
  const user_id = req.auth._id
  const query = Object.assign({}, userIsRequestee(user_id), isPending())
  return Friend.find(query).populate('requestor').exec()
  .then(results => ({ results }))

}))

app.get('/requestor', verifyToken, handler(req => {
  const user_id = req.auth._id
  const query = Object.assign({}, userIsRequestor(user_id), isPending())
  return Friend.find(query).populate('requestee').exec()
  .then(results => ({ results }))
}))

app.post('/request/:_id', verifyToken, handler(req => {
  const requestor = req.auth._id
  const requestee = req.params._id
  if (requestor === requestee) throw new Error('Can not friend request yourself')
  if (!requestee) throw new Error('Must supply requestee')

  return Promise.all([
    User.findById({ _id: requestee }),
    Friend.findOne({ requestor, requestee }),
    Friend.findOne({ requestor: requestee, requestee: requestor })
  ])
  .then(([user, req1, req2]) => {
    if (!user) throw new Error(`Requestee with ID "${requestee}" not found`)
    if (req1 || req2) throw new Error(`Friendship established`)

    return new Friend({ requestor, requestee }).save()
    .then((f) => {
      return new Alert({ from_id: requestor, user_id: requestee, action_id: f._id, type: 'FRIEND_REQUEST' }).save()
    })
    .then((a) => {
      newAlert(requestor)
      newAlert(requestee)
      return f
    })
  })
}))

app.put('/request/:_id/accept', verifyToken, handler(req => {
  const _id = req.params._id
  const requestee = req.auth._id
  const $set = { acceptedAt: Date.now() }
  return Friend.findById({ _id })
  .then((request) => {
    if (!request) throw new Error(`Request with ID "${_id}" not found`)
    if (request.requestee.toString() !== requestee) throw new Error(`Only the requestee can verify the account`)
    return Friend.updateOne({ _id }, { $set })
    .then((result) => {
      newAlert(request.requestee.toString())
      newAlert(request.requestor.toString())
      return result
    })
  })
}))

app.put('/request/:_id/decline', verifyToken, handler(req => {
  const _id = req.params._id
  const requestee = req.auth._id
  const $set = { declinedAt: Date.now() }
  return Friend.findById({ _id })
  .then((request) => {
    if (!request) throw new Error(`Request with ID "${_id}" not found`)
    if (request.requestee.toString() !== requestee) throw new Error(`Only the requestee can verify the account`)
    return Friend.updateOne({ _id }, { $set })
    .then((result) => {
      newAlert(request.requestee.toString())
      newAlert(request.requestor.toString())
      return result
    })
  })
}))

function userIsRequestor (user_id) {
  return { requestor: user_id }
}

function userIsRequestee (user_id) {
  return { requestee: user_id }
}

function isAccepted () {
  return { acceptedAt: { $ne: null } }
}

function isDeclined () {
  return { declinedAt: { $ne: null } }
}

function isPending () {
  return { acceptedAt: null, declinedAt: null }
}

module.exports = app;
