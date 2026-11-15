import { NextResponse } from 'next/server';
import { readDb, writeDb, uid } from '@/lib/db';

export async function POST(req) {
  const { batchId, studentName, phone } = await req.json();
  if (!studentName?.trim() || !phone?.trim())
    return NextResponse.json({ error: 'Naam aur phone number zaroori hai' }, { status: 400 });

  const db = readDb();
  const batch = db.batches.find((b) => b.id === batchId);
  if (!batch) return NextResponse.json({ error: 'Batch nahi mila' }, { status: 404 });

  const taken = db.bookings.filter((b) => b.batchId === batchId).length;
  if (taken >= batch.seats) return NextResponse.json({ error: 'Batch full ho chuka hai' }, { status: 400 });

  const booking = { id: uid('bk'), batchId, studentName: studentName.trim(), phone: phone.trim(), createdAt: new Date().toISOString() };
  db.bookings.push(booking);
  db.payments.push({ id: uid('p'), bookingId: booking.id, amount: batch.price, status: 'pending', method: null, paidAt: null });
  writeDb(db);
  return NextResponse.json({ ok: true, booking });
}
