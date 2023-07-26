import * as React from 'react';

type StoredData<T> = {
  version: number;
  data: T;
};

function getFromLocalStorageOrDefault<T>(key: string, defaultValue: T, version = 0) {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const saved = JSON.parse(stored) as StoredData<T>;
      if (saved.version === version) {
        return saved.data;
      }
      return defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }
  return defaultValue;
}

export function usePersistedState<T>(
  key: string,
  initialvalue: T,
  { timeout = 500, version = 0 } = {},
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [data, setDate] = React.useState<T>(() => getFromLocalStorageOrDefault(key, initialvalue, version));
  const savingTimout = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    savingTimout.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify({ version, data }));
    }, timeout);
    return () => {
      if (savingTimout.current) {
        clearTimeout(savingTimout.current);
      }
    };
  }, [key, data, timeout, version]);

  return [data, setDate];
}
