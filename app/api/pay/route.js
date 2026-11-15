import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

// Demo payment: asli gateway (Razorpay/Stripe) yaha laga sakte ho
export async function POST(req) {
  const { paymentId, method } = await req.json();
  const db = readDb();
  const p = db.payments.find((x) => x.id === paymentId);
  if (!p) return NextResponse.json({ error: 'Payment nahi mila' }, { status: 404 });
  p.status = 'paid';
  p.method = method || 'UPI';
  p.paidAt = new Date().toISOString();
  writeDb(db);
  return NextResponse.json({ ok: true });
}
