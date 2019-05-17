const Query = {
  getReservation: async (_, {id}) => {
    const reservation = await Reservation.findById(id);
    return reservation;
  },
  allReservations: async (_) => {
    const reservations = await Reservation.find();
    return reservations;
  }
}