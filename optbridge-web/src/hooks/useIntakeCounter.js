import { useEffect, useState } from 'react';

const COUNTER_KEY = 'optbridge-intake-counter';
const COUNTER_EVENT = 'optbridge-intake-counter-change';

function readCounter() {
  if (typeof window === 'undefined') {
    return 0;
  }

  const savedValue = Number(window.localStorage.getItem(COUNTER_KEY));
  return Number.isFinite(savedValue) ? savedValue : 0;
}

export function increaseIntakeCounter() {
  const nextValue = readCounter() + 1;
  window.localStorage.setItem(COUNTER_KEY, String(nextValue));
  window.dispatchEvent(new CustomEvent(COUNTER_EVENT, { detail: nextValue }));
  return nextValue;
}

export function useIntakeCounter() {
  const [count, setCount] = useState(readCounter);

  useEffect(() => {
    const syncCounter = (event) => {
      setCount(typeof event.detail === 'number' ? event.detail : readCounter());
    };

    window.addEventListener(COUNTER_EVENT, syncCounter);
    window.addEventListener('storage', syncCounter);

    return () => {
      window.removeEventListener(COUNTER_EVENT, syncCounter);
      window.removeEventListener('storage', syncCounter);
    };
  }, []);

  return count;
}

