const Appointment = require("../models/Appointment");
// Now as this is connected to mongoose we can use mongoose methods using this const
// Mongoose methods return a promise so we need to use async awaitasync

// @desc  Get All Appointments
// @route GET /api/v1/appointments
// @access Public
exports.getAppointments = async (req, res, next) => {
  try {
    const appointment = await Appointment.find();
    return res.status(200).json({
      success: true,
      count: appointment.length,
      data: appointment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error (Get)",
    });
  }
};

// @desc  Add Appointment
// @route POST /api/v1/appointments
// @access Public
exports.addAppointments = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const appointment = await Appointment.create(req.body); // will only accept stuff thats in our model, Schema

    return res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        // client error, didnt send what they are supposed to
        success: false,
        error: messages,
      });
    } else {
      // standard 500 code error
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc  Delete All Appointments
// @route DELETE /api/v1/appointment
// @access Public
exports.deleteAppointments = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      // success false as this is an error
      return res.status(404).json({
        success: false,
        error: "No Appointment Found",
      });
    }
    // success true as this is the 200 response
    await appointment.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    // standard 500 code error
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
