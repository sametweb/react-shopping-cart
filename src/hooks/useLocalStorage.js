import { useState } from "react";

export const useLocalStorage = key => {
  const [value] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue) return storedValue;
    return [];
  });

  const setStoredValue = cart => {
    window.localStorage.setItem(key, JSON.stringify(cart));
  };

  return [value, setStoredValue];
};
