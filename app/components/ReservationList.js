import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Reservation from './Reservation';

export const allReservationsQuery = gql`
  query allReservations {
    allReservations {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

export default function ReservationList() {
  return (
    <Query query={allReservationsQuery}>
      {({ data, loading, error }) => {
        if (error) return <Error error={error} />;
        if (loading) return <div>Loading...</div>
        const allReservations = data.allReservations;
        return (
          <section>
            <ul>
              {allReservations.map(reservation => (
                <Reservation key={reservation.id} reservation={reservation} />
              ))}
            </ul>
          </section>
        )
      }}
    </Query>
  )
}