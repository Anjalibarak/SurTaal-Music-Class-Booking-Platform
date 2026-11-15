'use client';
import { useState } from 'react';

export default function AttendanceSheet({ batchId, date, students }) {
  const [records, setRecords] = useState(
    Object.fromEntries(students.map((s) => [s.id, s.today || 'present']))
  );
  const [msg, setMsg] = useState(null);

  async function save() {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ batchId, date, records }),
    });
    setMsg(res.ok ? 'Attendance save ho gayi ✅' : 'Save nahi hui ❌');
  }

  return (
    <div className="card">
      <table>
        <thead><tr><th>Student</th><th>Overall %</th><th>Aaj ({date})</th></tr></thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.percent}%</td>
              <td>
                <div className="row">
                  {['present', 'absent'].map((st) => (
                    <button
                      key={st}
                      className={`btn ${records[s.id] === st ? '' : 'ghost'}`}
                      onClick={() => setRecords({ ...records, [s.id]: st })}
                    >
                      {st === 'present' ? 'Present' : 'Absent'}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {students.length === 0 && <p className="label">Is batch me abhi koi student nahi hai.</p>}
      {students.length > 0 && (
        <div className="row" style={{ marginTop: 14 }}>
          <button className="btn" onClick={save}>Save Attendance</button>
          {msg && <span className="msg">{msg}</span>}
        </div>
      )}
    </div>
  );
}
