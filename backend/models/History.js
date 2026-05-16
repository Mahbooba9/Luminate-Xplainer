const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  topic: {
    type: String,
    required: true
  },
  explanation: {
    type: Object, // We'll store the parsed JSON object here
    required: true
  },
  isBookmarked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const History = mongoose.model('History', historySchema);
module.exports = History;
