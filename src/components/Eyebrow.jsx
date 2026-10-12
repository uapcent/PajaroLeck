export default function Eyebrow({ children, light = false, center = false }) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow--light' : ''} ${center ? 'eyebrow--center' : ''}`}>
      <span className="eyebrow__dot" aria-hidden="true" />
      {children}
    </p>
  );
}
