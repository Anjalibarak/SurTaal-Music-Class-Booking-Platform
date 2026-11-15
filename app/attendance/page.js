import Link from 'next/link';
import { readDb } from '@/lib/db';
import AttendanceSheet from '@/components/AttendanceSheet';

export const dynamic = 'force-dynamic';

export default function Attendance({ searchParams }) {
  const db = readDb();
  const batchId = searchParams?.batch || db.batches[0].id;
  const date = searchParams?.date || new Date().toISOString().slice(0, 10);
  const batch = db.batches.find((b) => b.id === batchId);

  const students = db.bookings
    .filter((b) => b.batchId === batchId)
    .map((bk) => {
      const recs = db.attendance.filter((a) => a.bookingId === bk.id);
      const present = recs.filter((a) => a.status === 'present').length;
      const today = recs.find((a) => a.date === date)?.status;
      return {
        id: bk.id,
        name: bk.studentName,
        today,
        percent: recs.length ? Math.round((present / recs.length) * 100) : 0,
      };
    });

  return (
    <>
      <h1>Attendance</h1>
      <p className="sub">Batch aur date chuno, phir har student ko mark karo.</p>
      <form className="row" style={{ marginBottom: 18 }} method="GET">
        <select name="batch" defaultValue={batchId}>
          {db.batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} ({db.teachers.find((t) => t.id === b.teacherId)?.name})
            </option>
          ))}
        </select>
        <input type="date" name="date" defaultValue={date} />
        <button className="btn" type="submit">Load</button>
      </form>
      <h3>{batch.title} · {batch.days} · {batch.time}</h3>
      <AttendanceSheet key={batchId + date} batchId={batchId} date={date} students={students} />
    </>
  );
}
