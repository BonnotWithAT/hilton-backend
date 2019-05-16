import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { GraphQLDateTime } from 'graphql-iso-date';
import Router from 'next/router';
import Error from './ErrorMessage';

const CREATE_RESERVATION = gql`
  mutation CREATE_RESERVATION(
    $name: String!
    $hotelName: String!
    $arrivalDate: GraphQLDateTime!
    $departureDate: GraphQLDateTime!
  ) {
    addReservation(
      name: $name
      hotelName: $hotelName
      arrivalDate: $arrivalDate
      departureDate: $departureDate
    ) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

class CreateReservation extends Component {
  state = {
    name: '',
    hotelName: '',
    arrivalDate: Date.now(),
    departureDate: Date.now()
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value});
  }

  render() {
    return (
      <Mutation mutation={CREATE_RESERVATION} variables={this.state}>
        {(addReservation, { loading, error }) => (
          <form
            onSubmit={async e => {
              e.preventDefault();
              const res = await addReservation();
              console.log(res);
              Router.push('/');
            }}
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
      </Mutation>
    )
  }
}

export default CreateReservation;
export { CREATE_RESERVATION };