const redis = require('redis');
const clientReady = new Promise((res) => {
  const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URI);
  client.on('connect', () => res(client));
  clientReady.then(() => console.log('clientReady', client));
})

module.exports = {
  get (key) {
    return clientReady.then(client =>
      promiseify(client.hgetall.bind(client, key)))
  },

  set (key, val) {
    return clientReady.then(client =>
      promiseify(client.hmset.bind(client, key, val)))
  },

  hset (...args) {
    return clientReady.then(client =>
      promiseify(client.hset.bind(client, ...args)))
  },

  scan (...args) {
    return clientReady.then(client =>
      promiseify(client.scan.bind(client, ...args)))
  },

  remove (key) {
    return clientReady.then(client =>
      promiseify(client.del.bind(client, key)))
  }
}

function promiseify (fn) {
  return new Promise((res, rej) =>
    fn((err, result) => {
      if (err) return rej(err)
      res(result)
    }))
}
