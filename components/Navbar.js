import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" className="logo">Sur<span>Taal</span> 🎶</Link>
      <div className="links">
        <Link href="/teachers">Teachers</Link>
        <Link href="/bookings">Bookings</Link>
        <Link href="/attendance">Attendance</Link>
        <Link href="/dashboard">Payments</Link>
      </div>
    </nav>
  );
}
