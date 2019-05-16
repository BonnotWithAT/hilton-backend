const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hotelName: {
    type: String,
    required: true
  },
  arrivalDate: {
    type: Date,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
