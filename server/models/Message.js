const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
});

module.exports = model('Message', messageSchema);
