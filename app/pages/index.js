import App from '../components/App';
import ReservationList from '../components/ReservationList';

export default () => (
  <App>
    <div>
      <p>Reservation API Front-end</p>
      <p>Please enter your information in the form below. And be nice about it.</p>
      <form>
        <label for="name">Name</label>
        <input type="text" name="name" />
      </form>
    </div>
    <ReservationList />
  </App>
)
