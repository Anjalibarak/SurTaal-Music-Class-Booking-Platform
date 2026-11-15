import { readDb, inr } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const db = readDb();
  const paid = db.payments.filter((p) => p.status === 'paid');
  const pending = db.payments.filter((p) => p.status === 'pending');
  const sum = (arr) => arr.reduce((s, p) => s + p.amount, 0);

  const byInstrument = {};
  for (const p of paid) {
    const bk = db.bookings.find((b) => b.id === p.bookingId);
    const batch = db.batches.find((b) => b.id === bk?.batchId);
    const inst = db.teachers.find((t) => t.id === batch?.teacherId)?.instrument || 'Other';
    byInstrument[inst] = (byInstrument[inst] || 0) + p.amount;
  }
  const max = Math.max(1, ...Object.values(byInstrument));

  const tx = [...db.payments].reverse().map((p) => {
    const bk = db.bookings.find((b) => b.id === p.bookingId);
    const batch = db.batches.find((b) => b.id === bk?.batchId);
    return { ...p, student: bk?.studentName, batch: batch?.title };
  });

  return (
    <>
      <h1>Payment Dashboard</h1>
      <p className="sub">Revenue, pending dues aur transactions ek nazar me.</p>
      <div className="grid">
        <div className="card"><div className="label">Total Collected</div><div className="stat" style={{ color: 'var(--ok)' }}>{inr(sum(paid))}</div></div>
        <div className="card"><div className="label">Pending</div><div className="stat" style={{ color: 'var(--bad)' }}>{inr(sum(pending))}</div></div>
        <div className="card"><div className="label">Total Bookings</div><div className="stat">{db.bookings.length}</div></div>
        <div className="card"><div className="label">Paid / Pending</div><div className="stat">{paid.length} / {pending.length}</div></div>
      </div>

      <h2>Revenue by Instrument</h2>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        {Object.entries(byInstrument).map(([k, v]) => (
          <div key={k} className="row" style={{ flexWrap: 'nowrap' }}>
            <div style={{ width: 90 }}>{k}</div>
            <div className="bartrack"><div className="bar" style={{ width: `${(v / max) * 100}%` }} /></div>
            <div style={{ width: 90, textAlign: 'right' }}>{inr(v)}</div>
          </div>
        ))}
        {Object.keys(byInstrument).length === 0 && <span className="label">Abhi koi paid payment nahi hai.</span>}
      </div>

      <h2>Transactions</h2>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead><tr><th>Student</th><th>Batch</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {tx.map((t) => (
              <tr key={t.id}>
                <td>{t.student}</td><td>{t.batch}</td><td>{inr(t.amount)}</td>
                <td>{t.method || '-'}</td>
                <td>{t.paidAt ? new Date(t.paidAt).toLocaleDateString('en-IN') : '-'}</td>
                <td><span className={`pill ${t.status}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
