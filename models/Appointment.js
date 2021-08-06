const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
  // When we make a request and send data, its only going to except the below types etc
  text: {
    type: String,
    trim: true,
    required: [true, "Please add the clients Name"],
  },
  time: {
    type: String,
    required: [true, "Please add a Time"],
  },
  date: {
    type: Date,
    required: [true, "Please add a Date"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
