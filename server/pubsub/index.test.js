const pubsub = require('./')

describe('PubSub', () => {

  it('Should be able create a room', () => {
    const topic = 'topic'
    const on = jest.fn()
    const createClient = jest.fn(() => ({ on }))
    const redis = { createClient }
    expect(typeof pubsub).toBe('function')
    expect(typeof pubsub({ redis, topic }).subscribe).toBe('function')
    expect(typeof pubsub({ redis, topic }).publish).toBe('function')
    expect(typeof pubsub({ redis, topic }).unsubscribe).toBe('function')
  })

})
