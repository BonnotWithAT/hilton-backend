import ReservationList from '../components/ReservationList';
import CreateReservation from '../components/CreateReservation';

const IndexPage = props => (
  <div>
    <CreateReservation />
    <ReservationList />
  </div>
);

export default IndexPage;