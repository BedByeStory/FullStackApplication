module.exports = function handler (...fns) {
  return function (req, res) {
    console.log('Request: ', req.url)
    return Promise.resolve()
    .then(() => fns.reduce((acc, fn) => fn(acc), req))
    .then(data => res.json(data))
    .catch(({ message: error }) => {
      console.log({ error })
      return res.json({ error })
    })
  }
}
