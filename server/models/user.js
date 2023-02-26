const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: String,
  name: String,
  email: String,
  show_email: {
    type: Boolean,
    default: false,
  },
  show_dob: {
    type: Boolean,
    default: false,
  },
  show_gender: {
    type: Boolean,
    default: false,
  },
  password: String,
  img_url: String,
  professional_title: String,
  years_of_experience: Number,
  dob_day: Number,
  dob_month: Number,
  dob_year: Number,
  gender: String,
  about: String,
  skills: [
    {
      cat: String,
      key: String,
    },
  ],
  rejected: {
    type: [String],
    default: [],
  },
  matches: {
    type: [String],
    default: [],
  },
  block: {
    type: [String],
    default: [],
  },
  pendingRequests: {
    type: [String],
    default: [],
  },
  github_verified: {
    type: Boolean,
    default: true,
  },
  github_username: {
    type: String,
  },
  profile_completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
