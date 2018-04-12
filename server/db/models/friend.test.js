const Friend = require('./friend')
const mongoose = require('mongoose')
const mockId = () => mongoose.Types.ObjectId();
const DATE_TO_USE = new Date('2016');
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

const mockFriend = {
  _id: 'friend_id',
  requestor: 'user_1_id',
  requestee: 'user_2_id',
  createdAt: new Date().toISOString('2/1/2018'),
  viewedAt: new Date().toISOString('2/2/2018'),
  acceptedAt: new Date().toISOString('2/3/2018'),
}

describe('Friends', () => {
  it('Should require the requestor', () => {
    return new Friend({ }).validate()
    .then(() => {
      return Promise.reject({ errors: { requestor: new Error('Should reject requestor') } })
    })
    .catch((err) => {
      expect(err.errors.requestor.message).toBe('Path `requestor` is required.');
    })
  })
  it('Should require a mongo ID for requestor', () => {
    return new Friend({ requestor: 'user_1' }).validate()
    .then(() => {
      return Promise.reject({ errors: { requestor: new Error('Should reject ObjectID') } })
    })
    .catch((err) => {
      expect(err.errors.requestor.message).toBe('Cast to ObjectID failed for value "user_1" at path "requestor"');
    })
  })
  it('Should require the requestee', () => {
    return new Friend({ requestor: mockId() }).validate()
    .then(() => {
      return Promise.reject({ errors: { requestee: new Error('Should reject requestee') } })
    })
    .catch((err) => {
      expect(err.errors.requestee.message).toBe('Path `requestee` is required.');
    })
  })
  it('Should require a mongo ID for requestee', () => {
    return new Friend({ requestor: mockId(), requestee: 'user_1' }).validate()
    .then(() => {
      return Promise.reject({ errors: { requestee: new Error('Should reject ObjectID') } })
    })
    .catch((err) => {
      expect(err.errors.requestee.message).toBe('Cast to ObjectID failed for value "user_1" at path "requestee"');
    })
  })
  it('Should open a friend request', () => {
    const requestor = mockId()
    const requestee = mockId()
    const f = new Friend({ requestor, requestee })
    expect(f.requestor).toBe(requestor)
    expect(f.requestee).toBe(requestee)
    expect(f.createdAt).toBe(new Date())
  })
  it('Should publish the request')
  it('Should find all open friend requests by user')
  it('Should find all open friend requests by user (requestor)')
  it('Should find all open friend requests by user (requestee)')
  it('Should find all active friends by user')
})
