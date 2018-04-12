module.exports = function ({
  socket,
  subs={},
  pubsub=require('../pubsub')
}) {
  socket.on('subscribe', ([topic]) => {
    console.log('sub', topic)
    subs[topic] = pubsub({ topic })
    subs[topic].subscribe((topic, msg) => {
      console.log('emit', topic)
      socket.emit(topic, [msg])
    })
  })

  socket.on('unsubscribe', ([topic]) => {
    console.log('unsub', topic)
    subs[topic] && subs[topic].unsubscribe()
  })

  socket.on('publish', ([topic, msg]) => {
    console.log('pub', topic)
    pubsub({ topic }).publish([msg])
  })

  socket.on('disconnect', () => {
    console.log('usub', Object.keys(subs))
  })
}
