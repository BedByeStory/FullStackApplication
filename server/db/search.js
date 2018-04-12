module.exports = function (term) {
  return term && term.trim() && {
    $regex: `.*${term.trim()}.*`,
    $options: 'i'
  }
}
