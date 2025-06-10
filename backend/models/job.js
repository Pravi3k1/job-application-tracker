const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  position: { type: String, required: true },
  status: { type: String, required: true },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String },
  contactEmail: { type: String },
  link: { type: String }
});

module.exports = mongoose.model('Job', jobSchema);

