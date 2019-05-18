import React, { Component } from 'react';

class Reservation extends Component
{
  render() {
    const { reservation } = this.props;
    return (
      <li key={reservation.id}>
        <h4>Name: {reservation.name}</h4>
        <p>Hotel: {reservation.hotelName}</p>
        <p>Arrival Date: {reservation.arrivalDate}</p>
        <p>Departure Date: {reservation.departureDate}</p>
      </li>
    )
  }
}

export default Reservation;