const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const UsersSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  avatar: String,
  bannerImg: String,
  active: Boolean
})

UsersSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((res, rej) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return rej(err);
        res(isMatch);
    });
  })
};

UsersSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
