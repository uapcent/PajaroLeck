// Simple two-column hours table. rows: [['Mon – Fri', '09:00 – 20:00'], …]
export default function OpeningHours({ rows }) {
  return (
    <dl className="hours">
      {rows.map(([days, hours]) => (
        <div key={days} className="hours__row">
          <dt>{days}</dt>
          <dd>{hours}</dd>
        </div>
      ))}
    </dl>
  );
}
