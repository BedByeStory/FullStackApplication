const { Types } = require('mongoose');
const { login, verifyToken } = require('../auth');
const pubsub = require('../pubsub');
const express = require('express');
const handler = require('../handler');
const User = require('../db/models/user');
const isFriend = require('../friends/isFriend');
const search = require('../db/search');
const app = express.Router();

function userUpdated (user_id) {
  pubsub({ topic: user_id + ':update' }).publish(['OK'])
}

app.get('/', handler((req) => {
  return User.find(req.query)
  .then((results) => ({ results }))
}))

app.get('/me', verifyToken, handler((req) => {
  const user_id = req.auth._id
  return User.findById({ _id: Types.ObjectId(user_id) })
  .then((result) => ({ result }))
}))

app.put('/me', verifyToken, handler((req) => {
  const user_id = req.auth._id
  const _id = Types.ObjectId(user_id)
  userUpdated(user_id)
  return User.update({ _id }, { $set: req.body })
}))

app.delete('/me', verifyToken, handler((req) => {
  const _id = Types.ObjectId(req.auth._id)
  return User.deleteOne({ _id })
}))

app.get('/login', handler(req => {
  const { email, password } = req.query
  const emailExp = new RegExp(`^${email}$`, 'i')
  return User.findOne({ email: emailExp })
  .then((user) => {
    console.log(user)
    if (!user) throw new Error('Not Authorized')
    return user.comparePassword(password)
    .then((isMatch) => {
      if (!isMatch) throw new Error('Not Authorized')
      return login({ _id: user._id })
    })
  })
}))

app.post('/signup', handler((req) => {
  const { username, email } = req.body
  return Promise.all([
    User.findOne({ username }),
    User.findOne({ email })
  ])
  .then(([u, e]) => {
    if (u) throw new Error('Username "'+username+'" already exists')
    if (e) throw new Error('Email "'+email+'" already exists')
    return new User(req.body).save()
  })
  .then((u) => login({ _id: u._id }))
}))

app.get('/search', verifyToken, handler(req => {
  const user_id = req.auth._id
  const { term } = req.query
  const query = search(term)
  if (!query) throw new Error('searchTerm required but not supplied')

  return User.find({
    $or: [
      { username: query },
      { email: query }
    ]
  })
  .then((results) => Promise.all(
    results
    .map(u => u.toJSON())
    .map((peer) =>
      isFriend(user_id, peer._id)
      .then((friend) => Object.assign({}, peer, friend)))
  ))
  .then((results) => ({ results }))
}))

app.get('/:id', verifyToken, handler((req) =>
  User.findById(req.params.id)
  .then((peer) => peer.toJSON())
  .then((peer) =>
    isFriend(req.auth._id, peer)
    .then((friend) => Object.assign({}, peer, friend)))
  .then((result) => ({ result }))))

module.exports = app;
