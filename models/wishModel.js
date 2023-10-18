const mongoose = require("mongoose");

const wishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  wish: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  images: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const wishModel = mongoose.model("wish", wishSchema);

module.exports = wishModel;
