const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  to: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  createdAt: { type: Date, default: Date.now },
  content: { type: String }
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
