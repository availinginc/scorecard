import { useState } from "react";

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItem = (key: string, value: string) => {
    if (key && value) {
      localStorage?.setItem(key, value);
      setValue(value);
    }
  };

  const getItem = (key: string) => {
    const value = localStorage?.getItem(key);
    if (value) {
      setValue(value);
      return value;
    }
  };

  const removeItem = (key: string) => {
    if (key) {
      localStorage?.removeItem(key);
      setValue(null);
    }
  };

  return { value, setItem, getItem, removeItem };
};
