const Reservation = ({ reservation }) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  const arrivalDate = new Intl.DateTimeFormat('en-US', options).format(new Date(reservation.arrivalDate));
  const departureDate = new Intl.DateTimeFormat('en-US', options).format(new Date(reservation.departureDate));
  return (
    <li key={reservation.id}>
      <h4>Name: {reservation.name}</h4>
      <p>Hotel: {reservation.hotelName}</p>
      <p>Arrival Date: {arrivalDate}</p>
      <p>Departure Date: {departureDate}</p>
    </li>
  )
}

export default Reservation;