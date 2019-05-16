import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import { allReservationsQuery } from './ReservationList';
import { GraphQLDateTime } from 'graphql-iso-date';

export default function CreateReservation() {
  return (
    <ApolloConsumer>
      {client => (
        <form
          onSubmit={event => handleCreateReservation(event, client)}
          >
          <Error error={error} />
          <fieldset disabled={loading}>
            <label htmlFor="name">
              Name 
              <input type="text" id="name" name="name" placeholder="Guest's Name" required value={this.state.name} onChange={this.handleChange} />
            </label>
            <label htmlFor="hotelName">
              Hotel Name 
              <input type="text" id="hotelName" name="hotelName" placeholder="Hotel Name" required value={this.state.hotelName} onChange={this.handleChange} />
            </label>
            <label htmlFor="arrivalDate">
              Arrival Date 
              <input type="text" id="arrivalDate" name="arrivalDate" placeholder="Arrival Date" required value={this.state.arrivalDate} onChange={this.handleChange} />
            </label>
            <label htmlFor="departureDate">
              Arrival Date 
              <input type="text" id="departureDate" name="departureDate" placeholder="Departure Date" required value={this.state.departureDate} onChange={this.handleChange} />
            </label>
            <button type="submit">Submit Reservation</button>
          </fieldset>
        </form>
      )}
    </ApolloConsumer>
  )
}

function handleCreateReservation (event, client) {
  event.preventDefault();
  const form = event.target;
  const formData = new window.FormData(form);
  const name =  formData.get('name');
  const hotelName = formData.get('hotelName');
  const arrivalDate = formData.get('arrivalDate');
  const departureDate = formData.get('departureDate');

  client.mutate({
    mutation: gql`
      mutation addReservation() {
        addReservation(
          name: $name!
          hotelName: $hotelName!
          arrivalDate: $arrivalDate!
          departureDate: $departureDate!
        ) {
          id
          name
          hotelName
          arrivalDate
          departureDate
        }
      }
    `,
    variables: {
      name,
      hotelName,
      arrivalDate,
      departureDate
    },
    update: (proxy, { data: { addReservation }}) => {
      const data = proxy.readQuery({
        query: allReservationsQuery
      })
      proxy.writeQuery({
        query: allReservationsQuery,
        data: {
          ...data,
          allReservations: [addReservation, ...data.allReservations]
        }
      })
    }
  })
}