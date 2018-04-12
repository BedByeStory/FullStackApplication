const Alert = require('./alert')
const mongoose = require('mongoose')
const mockId = () => mongoose.Types.ObjectId();

describe('Alerts', () => {
  it('Should be a schema', () =>
    expect(typeof Alert).toBe('function'))

  it('Should require a user_id', () => {
    return new Alert({ }).validate()
    .then(() => {
      return Promise.reject({ errors: { user_id: new Error('Should reject user_id') } })
    })
    .catch((err) => {
      expect(err.errors.user_id.message).toBe('Path `user_id` is required.');
    })
  })

  it('Should require a mongo ID for user_id', () => {
    return new Alert({ user_id: 'user_1' }).validate()
    .then(() => {
      return Promise.reject({ errors: { user_id: new Error('Should reject ObjectID') } })
    })
    .catch((err) => {
      expect(err.errors.user_id.message).toBe('Cast to ObjectID failed for value "user_1" at path "user_id"');
    })
  })

  it('Should require a from_id', () => {
    return new Alert({ user_id: mockId() }).validate()
    .then(() => {
      return Promise.reject({ errors: { from_id: new Error('Should reject from_id') } })
    })
    .catch((err) => {
      expect(err.errors.from_id.message).toBe('Path `from_id` is required.');
    })
  })

})
