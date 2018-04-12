const jwt = require('jsonwebtoken')
const { get } = require('lodash')
const cert = process.env.JWT_KEY

function parseToken (req) {
  const bearerToken = get(req, 'headers.authorization') || ''
  return bearerToken.split(' ')[1]
}

module.exports = {
  verifyToken: (req, res, next) => {
    const token = parseToken(req)
    jwt.verify(token, cert, function(err, auth) {
      if (err) return res.sendStatus(403, 'Forbidden')
      req.auth = auth
      next()
    });
  },
  verify: (req) => {
    const token = parseToken(req)
    return new Promise((res, rej) => {
      jwt.verify(token, cert, function(err, auth) {
        if (err) return rej(err)
        res(auth)
      });
    })
  },
  login: (user, cb) => {
    return new Promise((res, rej) => {
      jwt.sign(user, cert, { }, function(err, token) {
        if (err) return rej(err)
        res({ token })
      });
    })
  }
}
