const express = require("express");
const router = express.Router();
const {
  getAppointments,
  addAppointments,
  deleteAppointments,
} = require("../controllers/appointments");

router.route("/").get(getAppointments).post(addAppointments);

router.route("/:id").delete(deleteAppointments);

module.exports = router;
