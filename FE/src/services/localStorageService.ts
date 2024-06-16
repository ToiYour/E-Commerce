export const setItemLocal = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemLocal = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key);
  if (!item) {
    return undefined;
  }
  return JSON.parse(item as string) as T;
};

export const removeItemLocal = (key: string): void => {
  localStorage.removeItem(key);
};
