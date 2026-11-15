import { NextResponse } from 'next/server';
import { readDb, writeDb, uid } from '@/lib/db';

export async function POST(req) {
  const { batchId, date, records } = await req.json();
  if (!batchId || !date || !records)
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  const db = readDb();
  db.attendance = db.attendance.filter((a) => !(a.batchId === batchId && a.date === date));
  for (const [bookingId, status] of Object.entries(records)) {
    db.attendance.push({ id: uid('a'), batchId, date, bookingId, status });
  }
  writeDb(db);
  return NextResponse.json({ ok: true });
}
