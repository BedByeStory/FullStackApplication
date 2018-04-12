const sprocket = require('./')
const { EventEmitter } = require("events");

describe('Sprocket Connection', () => {

  it('Should create a socket', () => {
    const socket = { on: jest.fn() }
    const pubsub = {}
    sprocket({ socket, pubsub })
    expect(socket.on.mock.calls[0][0]).toBe('subscribe')
    expect(socket.on.mock.calls[1][0]).toBe('unsubscribe')
    expect(socket.on.mock.calls[2][0]).toBe('publish')
  })

  it('Should add a new subscription', () => {
    const socket = new EventEmitter()
    const room = { subscribe: jest.fn() }
    const pubsub = jest.fn(() => room)
    const topic = 'cats'
    const subs = {}
    sprocket({ socket, pubsub, subs })
    socket.emit('subscribe', [topic])
    expect(pubsub).toBeCalledWith({ topic  })
    expect(room.subscribe).toBeCalled()
  })

  it('Should publish to the subscription', () => {
    const socket = new EventEmitter()
    const room = { publish: jest.fn() }
    const pubsub = jest.fn(() => room)
    const topic = 'cats'
    const msg = 'hello'
    const subs = {}
    sprocket({ socket, pubsub, subs })
    socket.emit('publish', [topic, msg])
    expect(pubsub).toBeCalledWith({ topic })
    expect(room.publish).toBeCalledWith(['hello'])
  })

  it('Should emit message to the client', () => {
    const socket = new EventEmitter()
    const room = { subscribe: fn => fn(topic, msg) }
    const pubsub = jest.fn(() => room)
    const handler = jest.fn()
    const topic = 'cats'
    const msg = 'hello'
    const subs = {}
    sprocket({ socket, pubsub, subs })
    socket.on(topic, handler)
    socket.emit('subscribe', [topic])
    expect(handler).toBeCalledWith([msg])
  })

  it('Should be able to unsubscribe', () => {
    const socket = new EventEmitter()
    const subs = {
      cats: {
        unsubscribe: jest.fn()
      }
    }
    const pubsub = jest.fn()
    const topic = 'cats'
    sprocket({ socket, pubsub, subs })
    socket.emit('unsubscribe', [topic])
    expect(subs.cats.unsubscribe).toBeCalled()
  })

  it('Should only unsubscribe active subscriptions', () => {
    const socket = new EventEmitter()
    const pubsub = jest.fn()
    const topic = 'cats'
    const subs = {}
    sprocket({ socket, pubsub, subs })
    expect(() => socket.emit('unsubscribe', [topic])).not.toThrow()
  })
})
