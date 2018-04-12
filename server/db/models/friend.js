const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendSchema = new Schema({
  requestor: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  requestee: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  createdAt: { type: Date, default: Date.now },
  acceptedAt: { type: Date },
  declinedAt: { type: Date }
})

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;
