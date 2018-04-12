module.exports = function ({
  redis=require('redis'),
  topic
}) {
  const sub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URI)
  const pub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URI)

  sub.on('error', throwRedisException)
  pub.on('error', throwRedisException)

  function throwRedisException (err) {
    console.log(err)
    throw err
  }

  return {
    subscribe (cb) {
      console.log('sub', cb)
      sub.on('message', (topic) => console.log('message', topic))
      sub.on('message', cb)
      sub.subscribe(topic)
    },
    unsubscribe () {
      sub.unsubscribe(topic)
    },
    publish (val) {
      pub.publish(topic, val)
    }
  }
}
