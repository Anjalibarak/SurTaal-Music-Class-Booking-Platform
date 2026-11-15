import Link from 'next/link';
import { readDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Home() {
  const db = readDb();
  const instruments = [...new Set(db.teachers.map((t) => t.instrument))];
  return (
    <>
      <section className="hero">
        <h1>Apna favourite <span>instrument</span> seekho, expert teachers ke saath.</h1>
        <p className="sub">Teacher chuno, batch book karo, attendance aur payment sab ek jagah.</p>
        <Link href="/teachers" className="btn">Teachers dekhein →</Link>
      </section>
      <h2>Instruments</h2>
      <div className="grid">
        {instruments.map((i) => {
          const t = db.teachers.find((x) => x.instrument === i);
          return (
            <Link key={i} href={`/teachers?instrument=${i}`} className="card link">
              <div className="emoji">{t.emoji}</div>
              <h3 style={{ margin: '6px 0 0' }}>{i}</h3>
              <span className="label">{db.teachers.filter((x) => x.instrument === i).length} teacher(s)</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
