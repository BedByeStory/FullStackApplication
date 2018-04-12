function displayFriendText (peer) {
  if (peer.isFriend) return 'Friend since ' + new Date(peer.isFriend).toLocaleDateString()
  if (peer.isDeclined) return 'Request declined ' + new Date(peer.isDeclined).toLocaleDateString()
  if (peer.isRequestee) return 'Requested ' + new Date(peer.isRequestee).toLocaleDateString()
  if (peer.isRequestor) return 'Requested ' + new Date(peer.isRequestor).toLocaleDateString()
  return ''
}

module.exports = displayFriendText
