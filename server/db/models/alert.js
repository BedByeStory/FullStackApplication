const mongoose = require('mongoose');
const { Schema } = mongoose;

const Alert = mongoose.model('Alert', {
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  from_id: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  createdAt: { type: Date, default: Date.now },
  action_id: { type: Schema.Types.ObjectId },
  type: { type: String },
  readAt: { type: Date },
})

module.exports = Alert
