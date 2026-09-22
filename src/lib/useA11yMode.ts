import { useCallback, useEffect, useState } from 'react';

const KEY = 'gp-a11y-mode';

/** Режим «Версия для слабовидящих»: увеличенный шрифт и высокий контраст. */
export function useA11yMode() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('vh-mode', enabled);
    try {
      localStorage.setItem(KEY, enabled ? '1' : '0');
    } catch {
      /* noop */
    }
    return () => document.documentElement.classList.remove('vh-mode');
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);
  return { enabled, toggle };
}
