import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';

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
              {allReservations.map((reservation, index) => (
                <li key={reservation.id}>
                  <div>
                    {reservation.name} {reservation.hotelName}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      }}
    </Query>
  )
}