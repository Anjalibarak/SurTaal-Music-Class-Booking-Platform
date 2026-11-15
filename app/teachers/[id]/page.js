import { notFound } from 'next/navigation';
import { readDb, inr } from '@/lib/db';
import BookForm from '@/components/BookForm';

export const dynamic = 'force-dynamic';

export default function TeacherProfile({ params }) {
  const db = readDb();
  const teacher = db.teachers.find((t) => t.id === params.id);
  if (!teacher) notFound();
  const batches = db.batches.filter((b) => b.teacherId === teacher.id);

  return (
    <>
      <div className="card row" style={{ gap: 20 }}>
        <div className="emoji" style={{ fontSize: 64 }}>{teacher.emoji}</div>
        <div>
          <h1>{teacher.name}</h1>
          <span className="tag">{teacher.instrument}</span>
          <span className="tag">⭐ {teacher.rating}</span>
          <span className="tag">{teacher.experience} yrs exp</span>
          <p>{teacher.bio}</p>
        </div>
      </div>
      <h2>Available Batches</h2>
      <div style={{ display: 'grid', gap: 14 }}>
        {batches.map((b) => {
          const taken = db.bookings.filter((x) => x.batchId === b.id).length;
          return (
            <div key={b.id} className="card">
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{b.title}</h3>
                  <span className="tag">{b.level}</span>
                  <span className="label">📅 {b.days} · ⏰ {b.time}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="stat">{inr(b.price)}<span className="label"> /month</span></div>
                  <div className="label">{b.seats - taken} / {b.seats} seats bachi hain</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}><BookForm batchId={b.id} disabled={taken >= b.seats} /></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
