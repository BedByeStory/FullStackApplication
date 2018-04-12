const Friend = require('../db/models/friend');

function isFriend (user_id, peer_id) {
  return Friend.find({
    $or: [{
      requestor: user_id,
      requestee: peer_id
    }, {
      requestor: peer_id,
      requestee: user_id
    }]
  })
  .then(([request]) => {
    if (!request) return {}
    return {
      request_id: request._id,
      isFriend: request.acceptedAt,
      isDeclined: request.declinedAt,
      isRequestee: (request.requestee.toString() === user_id) ? request.createdAt : null,
      isRequestor: (request.requestor.toString() === user_id) ? request.createdAt : null
    }
  })
}


function verifyFriend (req, res, next) {
  const peer_id = req.params.peer_id
  const user_id = req.auth._id

  isFriend(user_id, peer_id)
  .then(({ isFriend: peerIsFriend }) => {
    if (!peerIsFriend) return res.sendStatus(403, '"'+peer_id+'" is not a friend')
    next()
  })
  .catch((err) => {
    console.log(err)
    res.sendStatus(403, '"'+peer_id+'" is not a friend')
  })
}

isFriend.verifyFriend = verifyFriend

module.exports = isFriend
