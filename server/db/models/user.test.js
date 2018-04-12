const User = require('./user')
const DATE_TO_USE = new Date('2016');
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

const mockuser = {
  _id: 'user_id',
  username: 'username',
  avatar: 'image_url',
  createdAt: new Date().toISOString('1/1/2018'),
  active: false
}

describe('Users', () => {
  it('Should require the username', () => {
    return new User().validate()
    .then(() => {
      expect(jest.fn()()).not.toBeCalled()
    })
    .catch((err) => {
      expect(err.errors.username.message).toBe('Path `username` is required.');
    })
  })
  it('Should require the email', () => {
    return new User({ username: 'test' }).validate()
    .then(() => {
      expect(jest.fn()()).not.toBeCalled()
    })
    .catch((err) => {
      expect(err.errors.email.message).toBe('Path `email` is required.');
    })
  })
  it('Should require the password', () => {
    return new User({ username: 'test', email: 'test' }).validate()
    .then(() => {
      expect(jest.fn()()).not.toBeCalled()
    })
    .catch((err) => {
      expect(err.errors.password.message).toBe('Path `password` is required.');
    })
  })
  it('Should create a user', () => {
    const u = new User({
      email: 'rp@gmail.com',
      username: 'rph',
      password: '123'
    })



    expect(u.email).toBe('rp@gmail.com')
    expect(u.username).toBe('rph')
    expect(u.password).toBe('123')
    expect(u.createdAt).toBe(new Date())
    return u.validate().then((res) => {
      expect(res).toBeUndefined()
    })
  })
})

