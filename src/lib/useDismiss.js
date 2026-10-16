import { useEffect } from 'react';

// Closes a popup when clicking outside `ref` or pressing Escape.
export default function useDismiss(ref, open, close) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current?.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', handler);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('pointerdown', handler);
      document.removeEventListener('keydown', handler);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
}
