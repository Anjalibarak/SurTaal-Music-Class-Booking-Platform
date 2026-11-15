import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'SurTaal | Music Class Booking',
  description: 'Instrument learning sessions book karein',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="wrap">{children}</main>
      </body>
    </html>
  );
}
