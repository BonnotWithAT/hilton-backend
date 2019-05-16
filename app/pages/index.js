import App from '../components/App';
import ReservationList from '../components/ReservationList';
import CreateReservation from '../components/CreateReservation';

export default () => (
  <App>
    <div>
      <p>Reservation API Front-end</p>
    </div>
    <CreateReservation />
    <ReservationList />
  </App>
)
