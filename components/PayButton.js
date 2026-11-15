'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PayButton({ paymentId }) {
  const router = useRouter();
  const [method, setMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);
    await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId, method }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="row">
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>UPI</option><option>Card</option><option>Cash</option>
      </select>
      <button className="btn" onClick={pay} disabled={loading}>{loading ? '...' : 'Pay Now'}</button>
    </div>
  );
}
