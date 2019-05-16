import Link from 'next/link';

const Header = () => (
  <header>
    <div>Reservations System Demo</div>
    <Link href="/addreservation"><a>Add Reservation</a></Link>
  </header>
);

export default Header;