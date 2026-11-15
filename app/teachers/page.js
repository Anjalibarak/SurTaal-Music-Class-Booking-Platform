import Link from 'next/link';
import { readDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Teachers({ searchParams }) {
  const db = readDb();
  const current = searchParams?.instrument || 'All';
  const instruments = ['All', ...new Set(db.teachers.map((t) => t.instrument))];
  const list = current === 'All' ? db.teachers : db.teachers.filter((t) => t.instrument === current);

  return (
    <>
      <h1>Our Teachers</h1>
      <p className="sub">Apne instrument ke hisaab se teacher chuno.</p>
      <div className="filters">
        {instruments.map((i) => (
          <Link key={i} href={i === 'All' ? '/teachers' : `/teachers?instrument=${i}`} className={i === current ? 'on' : ''}>{i}</Link>
        ))}
      </div>
      <div className="grid">
        {list.map((t) => (
          <Link key={t.id} href={`/teachers/${t.id}`} className="card link">
            <div className="emoji">{t.emoji}</div>
            <h3 style={{ margin: '6px 0' }}>{t.name}</h3>
            <span className="tag">{t.instrument}</span>
            <span className="tag">⭐ {t.rating}</span>
            <p className="label">{t.experience} saal ka experience</p>
            <p style={{ fontSize: 14 }}>{t.bio}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
