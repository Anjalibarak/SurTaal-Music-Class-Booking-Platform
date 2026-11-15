# SurTaal - Music Class Booking Platform (Next.js)

## Chalane ka tarika
1. VS Code me folder kholo
2. Terminal: `npm install`
3. `npm run dev`
4. Browser: http://localhost:3000

## Features
- Teacher profiles (/teachers, /teachers/[id])
- Batch booking (har teacher ke batches, seat limit ke saath)
- Attendance (/attendance) - batch + date chuno, present/absent mark karo
- Payment dashboard (/dashboard) - revenue, pending, instrument-wise chart, transactions
- Bookings (/bookings) - Pay Now button (demo payment)

## Data
`data/db.json` me save hota hai. Reset karna ho to file ko original seed data se replace karo.
Production me isko MongoDB/PostgreSQL (Prisma) se replace kar sakte ho.
