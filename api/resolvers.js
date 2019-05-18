const Reservation = require("./models/Reservation");

const resolvers = {
  Query: {
    getReservation: async (_, { id }) => {
      const reservation = await Reservation.findById(id);
      return reservation;
    },
    allReservations: async _ => {
      const reservations = await Reservation.find();
      return reservations;
    }
  },
  Mutation: {
    addReservation: async (
      _,
      { name, hotelName, arrivalDate, departureDate }
    ) => {
      const reservation = new Reservation({
        name,
        hotelName,
        arrivalDate,
        departureDate
      });
      await reservation.save();
      return reservation;
    }
  }
};

module.exports = resolvers;