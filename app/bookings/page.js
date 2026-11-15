import { readDb, inr } from '@/lib/db';
import PayButton from '@/components/PayButton';

export const dynamic = 'force-dynamic';

export default function Bookings() {
  const db = readDb();
  const rows = [...db.bookings].reverse().map((bk) => {
    const batch = db.batches.find((b) => b.id === bk.batchId);
    const teacher = db.teachers.find((t) => t.id === batch?.teacherId);
    const payment = db.payments.find((p) => p.bookingId === bk.id);
    return { bk, batch, teacher, payment };
  });

  return (
    <>
      <h1>Bookings</h1>
      <p className="sub">Saari batch bookings aur unki payment status.</p>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>Student</th><th>Batch</th><th>Teacher</th><th>Schedule</th><th>Amount</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map(({ bk, batch, teacher, payment }) => (
              <tr key={bk.id}>
                <td>{bk.studentName}<div className="label">{bk.phone}</div></td>
                <td>{batch?.title}</td>
                <td>{teacher?.name}</td>
                <td>{batch?.days}<div className="label">{batch?.time}</div></td>
                <td>{inr(payment?.amount ?? 0)}</td>
                <td><span className={`pill ${payment?.status}`}>{payment?.status}</span></td>
                <td>{payment?.status === 'pending' && <PayButton paymentId={payment.id} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="label">Abhi koi booking nahi hai.</p>}
      </div>
    </>
  );
}
