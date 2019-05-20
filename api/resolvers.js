const Reservation = require("./models/Reservation");

const resolvers = {
  Query: {
    getReservation: async (_, { id }, ctx) => {
      const reservation = await Reservation.findById(id);
      return reservation;
    },
    allReservations: async (_, { id }, ctx) => {
      const reservations = await Reservation.find();
      return reservations;
    }
  },
  Mutation: {
    addReservation: async (
      _,
      { name, hotelName, arrivalDate, departureDate },
      ctx
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
