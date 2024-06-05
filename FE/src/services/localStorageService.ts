export const setItemLocal = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemLocal = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (typeof item == "string") {
    return null;
  }

  return item ? (JSON.parse(item) as T) : null;
};

export const removeItemLocal = (key: string): void => {
  localStorage.removeItem(key);
};
