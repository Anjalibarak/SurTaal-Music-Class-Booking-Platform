'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookForm({ batchId, disabled }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setMsg(null);
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ batchId, studentName: name, phone }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMsg({ err: true, text: data.error });
    router.push('/bookings');
    router.refresh();
  }

  if (disabled) return <button className="btn" disabled>Batch Full</button>;
  if (!open) return <button className="btn" onClick={() => setOpen(true)}>Book Batch</button>;

  return (
    <div>
      <div className="row">
        <input placeholder="Student ka naam" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button className="btn" onClick={submit} disabled={loading}>{loading ? 'Booking...' : 'Confirm'}</button>
      </div>
      {msg && <div className={`msg ${msg.err ? 'err' : 'good'}`}>{msg.text}</div>}
    </div>
  );
}
